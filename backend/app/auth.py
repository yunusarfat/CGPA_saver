import os
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from .db import User, get_db

load_dotenv()
SECRET = os.getenv("JWT_SECRET", "dev-secret-change-me")
router = APIRouter()


class SignupReq(BaseModel):
    class_id: str
    name: str
    email: str
    password: str


class LoginReq(BaseModel):
    email: str
    password: str


def make_token(user: User) -> str:
    payload = {
        "sub": str(user.id),
        "exp": datetime.now(timezone.utc) + timedelta(days=2),
    }
    return jwt.encode(payload, SECRET, algorithm="HS256")


def user_json(u: User) -> dict:
    return {"id": u.id, "name": u.name, "class_id": u.class_id, "email": u.email}


def current_user(
    authorization: str = Header(None), db: Session = Depends(get_db)
) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(401, "Please log in first.")
    try:
        data = jwt.decode(authorization[7:], SECRET, algorithms=["HS256"])
        user = db.get(User, int(data["sub"]))
    except Exception:
        raise HTTPException(401, "Session expired. Please log in again.")
    if not user:
        raise HTTPException(401, "Please log in again.")
    return user


@router.post("/signup")
def signup(req: SignupReq, db: Session = Depends(get_db)):
    email = req.email.strip().lower()
    if not req.class_id.strip() or not req.name.strip():
        raise HTTPException(400, "Class ID and name are required.")
    if "@" not in email:
        raise HTTPException(400, "Enter a valid email.")
    if len(req.password) < 6:
        raise HTTPException(400, "Password must be at least 6 characters.")
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(409, "This email is already registered.")
    hashed = bcrypt.hashpw(req.password.encode(), bcrypt.gensalt()).decode()
    user = User(
        class_id=req.class_id.strip()[:40],
        name=req.name.strip()[:80],
        email=email,
        password_hash=hashed,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"token": make_token(user), "user": user_json(user)}


@router.post("/login")
def login(req: LoginReq, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email.strip().lower()).first()
    if not user or not bcrypt.checkpw(req.password.encode(), user.password_hash.encode()):
        raise HTTPException(401, "Wrong email or password.")
    return {"token": make_token(user), "user": user_json(user)}


@router.get("/me")
def me(user: User = Depends(current_user)):
    return user_json(user)
# import sqlite3
# from pathlib import Path

# DB_PATH = Path(__file__).resolve().parent.parent / "notes.db"


# def conn():
#     c = sqlite3.connect(DB_PATH)
#     c.row_factory = sqlite3.Row
#     return c


# def init():
#     with conn() as c:
#         c.execute(
#             "CREATE TABLE IF NOT EXISTS notes ("
#             "id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, course TEXT, "
#             "author TEXT, content TEXT, created TEXT DEFAULT CURRENT_TIMESTAMP)"
#         )




import os
from datetime import datetime
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker

load_dotenv()

url = os.getenv("DATABASE_URL", "sqlite:///./app.db")
if url.startswith("postgres://"):
    url = url.replace("postgres://", "postgresql+psycopg2://", 1)
elif url.startswith("postgresql://"):
    url = url.replace("postgresql://", "postgresql+psycopg2://", 1)

args = {"check_same_thread": False} if url.startswith("sqlite") else {}
engine = create_engine(url, connect_args=args, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False)
Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    class_id = Column(String(40), nullable=False)
    name = Column(String(80), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password_hash = Column(String(200), nullable=False)


class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True)
    title = Column(String(120), nullable=False)
    course = Column(String(40), default="")
    content = Column(Text, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created = Column(DateTime, default=datetime.utcnow)


def init_db():
    Base.metadata.create_all(engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
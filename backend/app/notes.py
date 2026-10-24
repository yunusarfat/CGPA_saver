# from fastapi import APIRouter, File, Form, HTTPException, UploadFile
# from .db import conn
# from .docs import extract_text

# router = APIRouter()


# @router.post("/notes")
# async def add_note(
#     title: str = Form(...),
#     course: str = Form(""),
#     author: str = Form("Anonymous"),
#     text: str = Form(""),
#     document: UploadFile | None = File(None),
# ):
#     content = text.strip()
#     if document is not None and document.filename:
#         data = await document.read()
#         if len(data) > 10 * 1024 * 1024:
#             raise HTTPException(413, "Document too large (max 10 MB).")
#         try:
#             content = f"{content}\n\n{extract_text(document.filename, data)}".strip()
#         except ValueError as e:
#             raise HTTPException(400, str(e))
#     if not content:
#         raise HTTPException(400, "Add some notes or a document.")
#     with conn() as c:
#         cur = c.execute(
#             "INSERT INTO notes (title, course, author, content) VALUES (?,?,?,?)",
#             (title.strip()[:120], course.strip()[:40],
#              author.strip()[:40] or "Anonymous", content[:20000]),
#         )
#     return {"id": cur.lastrowid}


# @router.get("/notes")
# def list_notes(q: str = ""):
#     like = f"%{q.strip()}%"
#     with conn() as c:
#         rows = c.execute(
#             "SELECT id, title, course, author, created, substr(content,1,160) AS snippet "
#             "FROM notes WHERE title LIKE ? OR course LIKE ? OR content LIKE ? "
#             "ORDER BY id DESC LIMIT 50",
#             (like, like, like),
#         ).fetchall()
#     return [dict(r) for r in rows]


# @router.get("/notes/{note_id}")
# def get_note(note_id: int):
#     with conn() as c:
#         row = c.execute("SELECT * FROM notes WHERE id = ?", (note_id,)).fetchone()
#     if not row:
#         raise HTTPException(404, "Note not found.")
#     return dict(row)








from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy import or_
from sqlalchemy.orm import Session

from .auth import current_user
from .db import Note, User, get_db
from .docs import extract_text

router = APIRouter()


@router.post("/notes")
async def add_note(
    title: str = Form(...),
    course: str = Form(""),
    text: str = Form(""),
    document: UploadFile | None = File(None),
    user: User = Depends(current_user),
    db: Session = Depends(get_db),
):
    content = text.strip()
    if document is not None and document.filename:
        data = await document.read()
        if len(data) > 10 * 1024 * 1024:
            raise HTTPException(413, "Document too large (max 10 MB).")
        try:
            content = f"{content}\n\n{extract_text(document.filename, data)}".strip()
        except ValueError as e:
            raise HTTPException(400, str(e))
    if not content:
        raise HTTPException(400, "Add some notes or a document.")
    note = Note(
        title=title.strip()[:120],
        course=course.strip()[:40],
        content=content[:20000],
        owner_id=user.id,
    )
    db.add(note)
    db.commit()
    db.refresh(note)
    return {"id": note.id}


@router.get("/notes")
def list_notes(q: str = "", db: Session = Depends(get_db)):
    like = f"%{q.strip()}%"
    rows = (
        db.query(Note, User)
        .join(User, User.id == Note.owner_id)
        .filter(or_(Note.title.ilike(like), Note.course.ilike(like), Note.content.ilike(like)))
        .order_by(Note.id.desc())
        .limit(50)
        .all()
    )
    return [
        {
            "id": n.id,
            "title": n.title,
            "course": n.course,
            "author": u.name,
            "owner_id": n.owner_id,
            "snippet": n.content[:160],
        }
        for n, u in rows
    ]


@router.get("/notes/{note_id}")
def get_note(note_id: int, db: Session = Depends(get_db)):
    note = db.get(Note, note_id)
    if not note:
        raise HTTPException(404, "Note not found.")
    owner = db.get(User, note.owner_id)
    return {
        "id": note.id,
        "title": note.title,
        "course": note.course,
        "content": note.content,
        "author": owner.name if owner else "Unknown",
        "owner_id": note.owner_id,
    }


@router.delete("/notes/{note_id}")
def delete_note(
    note_id: int,
    user: User = Depends(current_user),
    db: Session = Depends(get_db),
):
    note = db.get(Note, note_id)
    if not note:
        raise HTTPException(404, "Note not found.")
    if note.owner_id != user.id:
        raise HTTPException(403, "You can only delete your own notes.")
    db.delete(note)
    db.commit()
    return {"deleted": note_id}
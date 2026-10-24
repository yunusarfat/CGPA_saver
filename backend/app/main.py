import base64
import openai
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .db import init_db   
from .docs import extract_text
from .llm import generate, parse_json, parse_exam
from .notes import router as notes_router
from .prompts import build_prompt, build_exam_prompt
from .auth import router as auth_router 

app = FastAPI(title="IIUC Campus Copilot")

init_db()
app.include_router(auth_router)
app.include_router(notes_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten before deploying
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_IMAGE_BYTES = 5 * 1024 * 1024
MAX_DOC_BYTES = 10 * 1024 * 1024


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/study")
async def study(
    text: str = Form(""),
    language: str = Form("en"),
    count: int = Form(5),
    image: UploadFile | None = File(None),
    document: UploadFile | None = File(None),
):
    text = text.strip()
    count = max(3, min(count, 8))
    language = "bn" if language.strip().lower() in ("bn", "ban", "bangla") else "en"

    image_url = None
    if image is not None and image.filename:
        data = await image.read()
        if len(data) > MAX_IMAGE_BYTES:
            raise HTTPException(413, "Image too large (max 5 MB).")
        mime = image.content_type or "image/jpeg"
        image_url = f"data:{mime};base64,{base64.b64encode(data).decode()}"

    from_doc = False
    if document is not None and document.filename:
        data = await document.read()
        if len(data) > MAX_DOC_BYTES:
            raise HTTPException(413, "Document too large (max 10 MB).")
        try:
            doc_text = extract_text(document.filename, data).strip()
        except ValueError as e:
            raise HTTPException(400, str(e))
        if not doc_text:
            raise HTTPException(400, "No readable text found in that document.")
        text = f"{text}\n\n{doc_text}".strip()
        from_doc = True

    text = text[:8000]

    if not text and not image_url:
        raise HTTPException(400, "Add a photo, a document, or paste some text.")

    # Photos, documents and Bangla go to the hosted model; plain English text stays local
    use_remote = from_doc or language == "bn"
    prompt = build_prompt(text, language, count, has_image=image_url is not None)

    try:
        result = None
        for attempt in range(2):
            raw = generate(prompt, image_url, use_remote)
            print(f"RAW (attempt {attempt + 1}):", raw)
            try:
                result = parse_json(raw)
                break
            except (ValueError, KeyError) as e:
                print("PARSE ERROR:", repr(e))
        if result is None:
            raise HTTPException(502, "The model returned an unreadable answer. Please try again.")

        if text:
            norm = " ".join(text.split())
            verified = [
                qa for qa in result["questions"]
                if qa.get("evidence") and " ".join(qa["evidence"].split()) in norm
            ]
            if verified:
                result["questions"] = verified

        result["questions"] = [{"q": x["q"], "a": x["a"]} for x in result["questions"][:count]]
        result["source_text"] = text or "\n".join(
            result["summary"] + [f'{x["q"]} {x["a"]}' for x in result["questions"]]
        )
        return result

    except HTTPException:
        raise
    except openai.RateLimitError:
        raise HTTPException(429, "Model is busy. Please try again in a moment.")
    except openai.APIConnectionError:
        raise HTTPException(503, "Cannot reach the model server.")
    except openai.APIError as e:
        raise HTTPException(502, f"Model error: {e}")


class ExamReq(BaseModel):
    text: str
    language: str = "en"
    count: int = 5


@app.post("/exam")
def exam(req: ExamReq):
    text = req.text.strip()[:8000]
    if not text:
        raise HTTPException(400, "No notes to build an exam from.")
    count = max(3, min(req.count, 10))
    language = "bn" if req.language.strip().lower() in ("bn", "ban", "bangla") else "en"
    prompt = build_exam_prompt(text, language, count)
    try:
        for attempt in range(2):
            raw = generate(prompt, None, True)  # exam JSON goes to the hosted model
            print(f"EXAM RAW (attempt {attempt + 1}):", raw)
            try:
                result = parse_exam(raw)
                result["questions"] = result["questions"][:count]
                return result
            except ValueError as e:
                print("EXAM PARSE ERROR:", repr(e))
        raise HTTPException(502, "The model returned an unreadable exam. Please try again.")
    except HTTPException:
        raise
    except openai.RateLimitError:
        raise HTTPException(429, "Model is busy. Please try again in a moment.")
    except openai.APIConnectionError:
        raise HTTPException(503, "Cannot reach the model server.")
    except openai.APIError as e:
        raise HTTPException(502, f"Model error: {e}")
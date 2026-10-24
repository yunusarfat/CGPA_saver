import json
from openai import OpenAI
from .config import (TEXT_URL, TEXT_MODEL, TEXT_KEY,
                     REMOTE_URL, REMOTE_MODEL, REMOTE_KEY)
from .prompts import SYSTEM_PROMPT

text_client = OpenAI(base_url=TEXT_URL, api_key=TEXT_KEY, timeout=300)
remote_client = OpenAI(base_url=REMOTE_URL, api_key=REMOTE_KEY or "none", timeout=90)


def generate(prompt: str, image_data_url: str | None = None, use_remote: bool = False) -> str:
    remote = use_remote or image_data_url is not None
    client = remote_client if remote else text_client
    model = REMOTE_MODEL if remote else TEXT_MODEL

    if image_data_url:
        content = [
            {"type": "text", "text": prompt},
            {"type": "image_url", "image_url": {"url": image_data_url}},
        ]
    else:
        content = prompt

    res = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": content},
        ],
        max_tokens=4000,
        temperature=0.1,
    )
    return res.choices[0].message.content or ""


def parse_json(raw: str) -> dict:
    start, end = raw.find("{"), raw.rfind("}")
    if start == -1 or end == -1:
        raise ValueError("No JSON found in model output")
    data = json.loads(raw[start : end + 1])
    questions = [
    {"q": str(x["q"]), "a": str(x["a"]), "evidence": str(x.get("evidence", ""))}
    for x in data.get("questions", [])
    if isinstance(x, dict) and "q" in x and "a" in x
    ]
    if not questions:
        raise ValueError("No questions in model output")
    summary = data.get("summary", [])
    if isinstance(summary, str):
        summary = [summary]
    return {
        "title": str(data.get("title", "Study notes")),
        "summary": [str(s) for s in summary],
        "questions": questions,
    }
def parse_exam(raw: str) -> dict:
    start, end = raw.find("{"), raw.rfind("}")
    if start == -1 or end == -1:
        raise ValueError("No JSON found")
    data = json.loads(raw[start : end + 1])
    out = []
    for x in data.get("questions", []):
        try:
            opts, ans = x["options"], int(x["answer"])
            if isinstance(opts, list) and len(opts) >= 2 and 0 <= ans < len(opts):
                out.append({
                    "q": str(x["q"]),
                    "options": [str(o) for o in opts],
                    "answer": ans,
                    "explanation": str(x.get("explanation", "")),
                })
        except (KeyError, TypeError, ValueError):
            continue
    if not out:
        raise ValueError("No valid questions")
    return {"title": str(data.get("title", "Exam")), "questions": out}
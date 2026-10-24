SYSTEM_PROMPT = (
    "You are a study assistant for university students. "
    "You turn lecture notes into a short summary and practice questions. "
    "Use only the content of the notes. Never invent facts."
    "Rules: use ONLY facts stated in the notes, do not add outside knowledge. "
"Each answer must be correct according to the notes. "
"Keep JSON keys in English exactly as shown; only the values are in the chosen language. "
"Do not add any text before or after the JSON."
)


def build_prompt(text: str, language: str, count: int, has_image: bool) -> str:
    lang = "Bangla (বাংলা)" if language == "bn" else "English"
    source = "the attached photo of notes or slides" if has_image else "the notes below"
    notes = f"\n\nNOTES:\n{text}" if text else ""
    return (
        f"Read {source}.{notes}\n\n"
        f"Write the summary and questions in {lang}.\n"
        "Return ONLY valid JSON, no markdown, in exactly this shape:\n"
        '{"title": "short topic title", '
'"summary": ["point 1", "point 2", "point 3"], '
'"questions": [{"q": "question", "a": "short answer", '
'"evidence": "exact words copied from the notes that prove the answer"}]}\n'
        f"Give 3 to 5 summary points and exactly {count} questions."
    )

def build_exam_prompt(text: str, language: str, count: int) -> str:
    lang = "Bangla (বাংলা)" if language == "bn" else "English"
    return (
        f"NOTES:\n{text}\n\n"
        f"Write a multiple-choice exam in {lang} using ONLY facts in the notes.\n"
        "Return ONLY valid JSON, no markdown, in exactly this shape:\n"
        '{"title": "exam title", "questions": [{"q": "question", '
        '"options": ["option 1", "option 2", "option 3", "option 4"], '
        '"answer": 0, "explanation": "one sentence from the notes"}]}\n'
        "Exactly 4 options per question. 'answer' is the index (0 to 3) of the correct option. "
        f"Exactly {count} questions. Keep JSON keys in English."
    )
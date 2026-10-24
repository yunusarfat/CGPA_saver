# 🎓 IIUC Campus Copilot

**A study helper built on open-source AI.** Turn messy notes into clean summaries, flip-card questions and timed exams, then share them with the whole IIUC community.

Built solo for **Hacktoberfest Hack Day Chittagong** (24 October 2026, IIUC).

| | |
|---|---|
| 🌐 **Live app** | `https://cgpa-saver.vercel.app` |


## Overview

Good exam preparation material at IIUC lives in the wrong places: top students' notes sit on phones and in Facebook groups, and most students never see them. Even when a student does get a friend's notes or past questions, turning a long PDF or a photo of handwriting into something to practice from takes hours, so most students end up just re-reading. IIUC Campus Copilot fixes this. Students upload notes as a photo, PDF, DOCX or pasted text, and the app uses open-weight AI models to produce a summary, flip-card practice questions and a timed multiple-choice exam. Students can also share notes in a searchable library, so a friend's notes are one click away from becoming a practice test.

## Features

- **🧠 Study Helper:** a short summary plus flip-card practice questions, from a photo, PDF, DOCX or pasted text.
- **📝 Exam Mode:** a timed multiple-choice exam built from the same notes. It is scored automatically and each answer comes with an explanation.
- **📚 Notes Library:** students register (class ID, name, email), share notes, and search other students' notes. Anyone can read a note and take an exam on it with the **"Quiz me on this"** button. Only the person who uploaded a note can delete it.
- **✅ Evidence-checked questions:** every quiz answer must include evidence copied from the notes. The app checks that evidence against the source text and drops any question it cannot verify, which reduces wrong answers.

## Models and AI

### Open-weight models used in the product

| Model | Where it runs | What it does in the app |
|---|---|---|
| **Gemma 3 (1B)** | Locally through [Ollama](https://ollama.com) | Summaries of English text notes |
| **Qwen (27B)** (`<EXACT_MODEL_ID>`) | Hosted inference provider: [Groq](https://groq.com) | Reads photos and long documents, handles Bangla, and writes the exams |

The model that does the core work (summaries, questions and exams) is always an open-weight model. Photos and long documents are routed to the hosted Qwen model because the small local model cannot read images.

### Proprietary models used in the product

None.

### AI coding assistants used during development

I used **Claude** as a coding assistant, mainly for the UI styling and for help with debugging. `<Describe which parts you wrote or substantially changed yourself, for example: the API design, the evidence-checking logic, the auth flow and the prompts.>`

## Tech stack

| Layer | Technology |
|---|---|
| Front end | React, Tailwind CSS (Vite) |
| Back end | FastAPI (Python) |
| Database | Neon Postgres with SQLAlchemy |
| Auth | JWT with hashed passwords |
| File parsing | pypdf, python-docx |
| AI runtime | Ollama (local), Groq (hosted inference) |

All languages, frameworks, libraries and databases used are open source.

## Templates and starter kits

- `<Vite React template (create-vite), used unmodified for the first commit>`

No other templates or pre-built project code were used. All project-specific code was written during the competition period.

## How it works

1. The student adds notes as a photo, PDF, DOCX or pasted text.
2. Photos are resized in the browser before upload to keep requests fast.
3. The backend extracts the text (pypdf and python-docx for documents) or sends the photo to the vision-capable model.
4. The model returns structured JSON: a title, summary points and questions.
5. For exams, each question must include evidence quoted from the notes. The backend checks the evidence against the source text, drops questions it cannot verify, and retries once if too few questions remain.
6. The front end shows the summary and flip cards, or runs a timed exam with scoring and explanations.

## Setup and run locally

### Requirements

- Node.js 18+
- Python 3.10+
- [Ollama](https://ollama.com) with the Gemma model: `ollama pull gemma3:1b`
- A free [Groq](https://console.groq.com) API key
- A Postgres database (a free [Neon](https://neon.tech) project works)

### 1. Clone

```bash
git clone <GITHUB_URL>
cd <REPO_FOLDER>
```

### 2. Back end

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate    macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env     # then fill in your values
uvicorn main:app --reload --port 8000
```

Environment variables (`backend/.env`). Never commit this file:

```
DATABASE_URL=<your Postgres connection string>
GROQ_API_KEY=<your Groq key>
JWT_SECRET=<a long random string>
```

> `<Check these names against your real .env.example and adjust.>`

### 3. Front end

```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:8000" > .env
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Challenges

- **Reliable structured output from small models**, especially for Bangla. I solved this with evidence checks that drop unverifiable questions, plus one automatic retry.
- **Finding a vision-capable host for photos.** The small local model cannot read images, so photos and long documents are routed to a hosted open-weight model.

## What's next

- Reliable Bangla output
- Answer verification for photo notes
- Past-question search by course
- Moderation for the shared library

## Notes

- No real student data is used. All notes in the demo are sample content.
- The notes library is a demo: please do not upload personal or private information.
- Everything was built solo during the competition period, and AI-assisted coding was done with Claude.

## Licence

Released under the [MIT Licence](LICENSE).

## Hacktoberfest

This repository uses the `hacktoberfest` topic. Contributions are welcome, so please follow the usual contribution etiquette and open an issue before large changes.

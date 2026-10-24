import os
from dotenv import load_dotenv

load_dotenv()

TEXT_URL = os.getenv("TEXT_URL", "http://localhost:11434/v1")
TEXT_MODEL = os.getenv("TEXT_MODEL", "gemma3:1b")
TEXT_KEY = os.getenv("TEXT_KEY", "ollama")

REMOTE_URL = os.getenv("REMOTE_URL", "https://api.groq.com/openai/v1")
REMOTE_MODEL = os.getenv("REMOTE_MODEL", "qwen/qwen3.8-27b")
REMOTE_KEY = os.getenv("REMOTE_KEY", "")
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
    SERPER_API_KEY: str = os.getenv("SERPER_API_KEY")
    UPLOAD_DIRECTORY: str = os.getenv("UPLOAD_DIRECTORY", "uploads/")

settings = Settings()

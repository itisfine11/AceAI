import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    OPENAI_API_KEY: str = os.getenv("NEXT_PUBLIC_OPENAI_API_KEY")
    SERPER_API_KEY: str = os.getenv("SERPER_API_KEY")
    PINECONE_API_KEY: str = os.getenv("NEXT_PUBLIC_PINECONE_API_KEY")
    PINECONE_ENVIRONMENT: str = os.getenv("NEXT_PUBLIC_PINECONE_ENVIRONMENT")
    UPLOAD_DIRECTORY: str = os.getenv("UPLOAD_DIRECTORY", "uploads/")

settings = Settings()
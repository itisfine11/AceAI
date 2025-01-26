from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import document, interaction, rag, web_search

app = FastAPI()

origins = [
    "http://localhost:3000/",  # Adjust this if your Next.js app runs on a different port
    "https://ace-ai-ashen.vercel.app/",
    "*",  # Replace with your actual deployed Next.js app URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Allows specified origins
    allow_credentials=True,           # Allows cookies and credentials
    allow_methods=["*"],              # Allows all HTTP methods
    allow_headers=["*"],              # Allows all headers
)

# Define a root endpoint
@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI on Vercel!"}

app.include_router(document.router, prefix="/api/documents", tags=["Documents"])
app.include_router(interaction.router, prefix="/api/interaction", tags=["Interaction"])
app.include_router(rag.router, prefix="/api/rag", tags=["RAG"])
app.include_router(web_search.router, prefix="/api/web-search", tags=["Web Search"])

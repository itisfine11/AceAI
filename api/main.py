from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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


# AceAI

AceAI is a full-stack AI-powered application built with a **Next.js frontend** and a **FastAPI backend**. It provides features like document processing, AI-driven chat, quiz generation, note-taking, and web search.

---

## Features

- **Document Upload**: Upload documents (e.g., PDFs, text files) for AI processing.
- **AI-Powered Chat**: Chat with context derived from uploaded documents.
- **Quiz and Notes Generation**: Generate quizzes and notes from document content.
- **Web Search Agent**: Perform web searches with AI-generated responses.
- **RAG (Retrieval Augmented Generation)**: Use AI to generate responses with context retrieval.

---

## Project Structure

```
project-root/
├── app/                    # FastAPI backend
│   ├── core/               # Configurations and dependencies
│   ├── routers/            # API routes
│   ├── services/           # Business logic
│   ├── main.py             # FastAPI entry point
│   ├── requirements.txt    # Backend dependencies
├── app/                  # Next.js frontend routing
├── public/                 # Public assets (images, icons, etc.)
├── components/             # Reusable UI components
├── styles/                 # CSS for styling
├── next.config.js          # Next.js configuration
├── package.json            # Frontend dependencies and scripts
├── .env                    # Environment variables
└── README.md               # Documentation
```

---

## Getting Started

### Backend (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd api
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The backend will run at `http://127.0.0.1:8000`.

---

### Frontend (Next.js)

1. Install frontend dependencies:
   ```bash
   npm install
   ```

2. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:3000`.

---

## Environment Variables

### Backend `.env`
Create a `.env` file in the `app/` directory with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key
SERPAPI_API_KEY=your_serpapi_api_key
UPLOAD_DIRECTORY=uploads/
```

### Frontend `.env`
Create a `.env` file in the root directory with:

```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000/api
```

---

## Deployment

### Vercel (Frontend and Backend)

1. **Frontend**: Deploy the Next.js app using the Vercel CLI:
   ```bash
   vercel --prod
   ```

2. **Backend**: Configure `vercel.json` in the `app/` directory:
   ```json
   {
     "builds": [
       {
         "src": "main.py",
         "use": "@vercel/python"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "main.py"
       }
     ]
   }
   ```

   Deploy the FastAPI backend:
   ```bash
   vercel --prod
   ```

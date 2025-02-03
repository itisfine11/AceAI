from fastapi import APIRouter, HTTPException
from services.pinecone_service import query_index
from langchain.chains import RetrievalQA
from langchain_community.llms import OpenAI
from core.config import settings

router = APIRouter()

@router.post("/query")
async def query_rag(
    query: str,
    index_name: str
):
    """
    Query the RAG pipeline for a specific index (course).
    """
    try:
        # Query the index
        documents = query_index(index_name, query)
        
        # Initialize LLM and RetrievalQA
        llm = OpenAI(api_key=settings.OPENAI_API_KEY)
        qa_chain = RetrievalQA(llm=llm, retriever=documents)
        
        # Generate response
        response = qa_chain.run(query)
        
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

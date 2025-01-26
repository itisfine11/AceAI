from fastapi import APIRouter, HTTPException
from services.rag_service import get_rag_chain

router = APIRouter()

@router.post("/rag")
async def rag_query(query: str):
    try:
        chain = get_rag_chain()
        response = chain.run(query)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

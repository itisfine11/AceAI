from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from api.services.web_search_agent import get_web_search_agent

router = APIRouter()

@router.post("/web-search")
async def web_search(query: str):
    try:
        agent = get_web_search_agent()
        response = agent.run(query)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from api.services.interaction_service import generate_response

router = APIRouter()

@router.post("/interact")
async def interact(query: str, mode: str, document: list):
    try:
        async def response_generator():
            async for token in generate_response(query, mode, document):
                yield token
        return StreamingResponse(response_generator(), media_type="text/event-stream")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

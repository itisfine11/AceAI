from fastapi import APIRouter, UploadFile, File, HTTPException
import os
from api.services.document_service import process_document
from api.core.config import settings

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(settings.UPLOAD_DIRECTORY, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())

        document = process_document(file_path)
        return {"message": "File uploaded and processed successfully.", "document": document}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

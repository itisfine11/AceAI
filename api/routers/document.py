from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from services.pinecone_service import store_in_index
from services.document_service import process_document

router = APIRouter()

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    index_name: str = Form(...),
):
    """
    Upload a document and store it in the specified Pinecone index.
    """
    try:
        # Save file temporarily
        file_path = f"temp/{file.filename}"
        with open(file_path, "wb") as f:
            f.write(await file.read())
        
        # Process the document
        documents = process_document(file_path)
        
        # Store in the specified Pinecone index
        store_in_index(index_name, documents)
        
        return {"message": f"Document stored in index: {index_name}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

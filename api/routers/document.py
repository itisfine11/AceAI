# routers/document.py
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from services.pinecone_service import store_in_index
from services.document_service import process_document
import os

router = APIRouter()

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    index_name: str = Form(...),
):
    """
    Upload a document and store its embeddings in the specified Pinecone index.
    """
    try:
        # Ensure the temporary directory exists
        temp_dir = "temp"
        os.makedirs(temp_dir, exist_ok=True)

        # Save the uploaded file temporarily
        file_path = os.path.join(temp_dir, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())
        
        # Process the document (load and split into chunks)
        documents = process_document(file_path)
        print(f"Processed {len(documents)} document chunks")
        # Store the processed document chunks in the specified Pinecone index
        store_in_index(index_name, documents)
        
        return {"message": f"Document stored in index: {index_name}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

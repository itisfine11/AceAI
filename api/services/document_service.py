import os
from fastapi import HTTPException
from langchain_unstructured import UnstructuredLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_docling import DoclingLoader

def process_document(file_path: str):
    # Optional: Check if the file exists and has a .docx extension
    if not os.path.exists(file_path):
        raise HTTPException(status_code=400, detail="File not found")
    
    try:
        loader = DoclingLoader(file_path)
        # loader = UnstructuredLoader(file_path)
        document = loader.load()
        print(f"Loaded document: {document}")
    except Exception as e:
        # Log the error details if necessary
        raise HTTPException(status_code=500, detail=f"Error loading document: {e}")

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    docs = text_splitter.create_documents(document)
    print(f"Split document into {len(docs)} chunks")
    return docs

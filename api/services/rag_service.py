from langchain.chains import RetrievalQA
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from api.core.dependencies import get_openai_client

def get_rag_chain(pinecone_client):
    llm = get_openai_client()
    embeddings = OpenAIEmbeddings()
    vector_store = Pinecone(index=pinecone_client, embedding=embeddings)
    retriever = vector_store.as_retriever()

    qa_chain = RetrievalQA(llm=llm, retriever=retriever)
    return qa_chain

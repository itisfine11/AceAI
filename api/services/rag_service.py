from langchain.chains import RetrievalQA
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import Pinecone
from core.dependencies import get_openai_client

def get_rag_chain(pinecone_client):
    llm = get_openai_client()
    embeddings = OpenAIEmbeddings()
    vector_store = Pinecone(index=pinecone_client, embedding=embeddings)
    retriever = vector_store.as_retriever()

    qa_chain = RetrievalQA(llm=llm, retriever=retriever)
    return qa_chain

import os
from langchain.llms import OpenAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate

async def generate_response(query: str, mode: str, document: list):
    llm = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    if mode == "chat":
        prompt_template = "You are a helpful assistant. Answer the following question based on the provided context:\n\n{context}\n\nQuestion: {question}"
    elif mode == "quiz":
        prompt_template = "Generate a quiz based on the following content:\n\n{context}"
    elif mode == "notes":
        prompt_template = "Take detailed notes on the following content:\n\n{context}"
    else:
        raise ValueError("Invalid mode specified.")

    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])

    chain = load_qa_chain(llm, chain_type="stuff", prompt=prompt)

    context = " ".join([doc.page_content for doc in document])

    async for token in chain.stream({"context": context, "question": query}):
        yield token

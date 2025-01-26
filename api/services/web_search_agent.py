from langchain.agents import initialize_agent, Tool
from langchain_community.llms import OpenAI
from langchain_community.utilities import GoogleSerperAPIWrapper
from core.config import settings

def get_web_search_agent():
    llm = OpenAI(api_key=settings.OPENAI_API_KEY)
    search = GoogleSerperAPIWrapper(serper_api_key=settings.SERPER_API_KEY)

    tools = [Tool(name="Search", func=search.run, description="Search the web for information.")]

    agent = initialize_agent(tools=tools, llm=llm, agent="zero-shot-react-description", verbose=True)
    return agent

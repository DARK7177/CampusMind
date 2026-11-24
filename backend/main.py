
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from chatbot import chatbot


app = FastAPI(
    title="CampusMind API",
    description="Hybrid NLP College Enquiry Chatbot",
    version="2.0.0"
)


app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://campusmind.bhupesh.website",
        "https://campusmind.pages.dev"
    ],

    allow_origin_regex=(
        r"https://[a-z0-9-]+"
        r"\.campusmind\.pages\.dev"
    ),

    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)


class ChatRequest(BaseModel):

    message: str = Field(
        min_length=1,
        max_length=2000
    )


@app.get("/")
def home():

    return {
        "app": "CampusMind",
        "status": "running",
        "version": "2.0.0",
        "engine": "Hybrid NLP",
        "intents": len(chatbot.intents),
        "patterns": len(chatbot.patterns)
    }


@app.get("/health")
def health():

    return {"status": "ok"}


@app.post("/chat")
def chat(request: ChatRequest):

    return chatbot.get_response(
        request.message
    )

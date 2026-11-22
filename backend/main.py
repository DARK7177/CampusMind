
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from chatbot import chatbot

app = FastAPI(
    title="CampusMind RAG + Gemini API",
    version="3.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://campusmind.bhupesh.website",
        "https://campusmind.pages.dev",
    ],
    allow_origin_regex=r"https://[a-z0-9-]+\.campusmind\.pages\.dev",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)


@app.get("/")
def home():
    return {
        "app": "CampusMind",
        "status": "running",
        "engine": "RAG + Gemini"
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/chat")
def chat(request: ChatRequest):
    return chatbot.get_response(request.message)

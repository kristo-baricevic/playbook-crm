from fastapi import FastAPI
from agent import handle_message

app = FastAPI()

@app.post("/chat")
def chat(payload: dict):
    return handle_message(payload["message"])

from fastapi import FastAPI

import firebase
from routers import chatroom, talkroom
from fastapi.middleware.cors import CORSMiddleware

firebase.init()

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(talkroom.router)
app.include_router(chatroom.router)

@app.get("/health")
async def health():
    return {"message": "ok"}
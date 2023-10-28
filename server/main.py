from fastapi import FastAPI

from routers import chatroom, talkroom, send_select
from fastapi.middleware.cors import CORSMiddleware

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
app.include_router(send_select.router)


@app.get("/health")
async def health():
    return {"message": "ok"}
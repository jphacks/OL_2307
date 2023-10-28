from fastapi import FastAPI

from routers import chatroom, talkroom


app = FastAPI()
app.include_router(talkroom.router)
app.include_router(chatroom.router)


@app.get("/health")
async def health():
    return {"message": "ok"}
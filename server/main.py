from fastapi import FastAPI

from routers import chatroom, talkroom, send_select


app = FastAPI()
app.include_router(talkroom.router)
app.include_router(chatroom.router)
app.include_router(send_select.router)


@app.get("/health")
async def health():
    return {"message": "ok"}
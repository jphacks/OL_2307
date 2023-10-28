from fastapi import FastAPI

from routers import message, chatroom


app = FastAPI()
app.include_router(message.router)
app.include_router(chatroom.router)

@app.get("/health")
async def health():
    return {"message": "ok"}
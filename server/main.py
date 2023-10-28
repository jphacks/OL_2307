from fastapi import FastAPI

from routers import home,talk,card

app = FastAPI()
app.include_router(home.router)
app.include_router(talk.router)
app.include_router(card.router)


@app.get("/health")
async def health():
    return {"message": "ok"}
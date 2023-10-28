import os
import firebase_admin
from firebase_admin import credentials
from fastapi import FastAPI

from routers import home,talk,card

os.environ["FIREBASE_AUTH_EMULATOR_HOST"] = "127.0.0.1:9099"
cred = credentials.Certificate("jphacks2023-firebase-adminsdk-p2xu8-2c3de38463.json")
firebase_admin.initialize_app(cred)

app = FastAPI()
app.include_router(home.router)
app.include_router(talk.router)
app.include_router(card.router)


@app.get("/health")
async def health():
    return {"message": "ok"}
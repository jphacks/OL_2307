from fastapi import APIRouter

from models.db import get_db

router = APIRouter()

@router.get("/chatrooms")
async def get_chatrooms():
    return {"message":"OK"}
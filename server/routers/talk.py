from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from datetime import date


from server.models.db import get_db
import server.schemas.talk as talk_schemas
import server.cruds.talk as talk_crud


router = APIRouter()

# トーク部分の画面

#headerの取得
@router.get('/header')
def example(custom_header: Optional[str] = Header(None)):
    return f"{custom_header}"

# friend情報(uid,display_name,icon_path,message,create_at)を取得する get
@router.get("/")
async def list_friends(db: AsyncSession = Depends(get_db)):
    return await talk_crud.get_tasks_with_done(db)


# 更新されたmessageを取得する get
@router.get("/")
async def get_latest_message(talk_date: date,):
    pass
"""
# messageが既読されたかどうか
@router.get("/")
async def get_read():
    pass
"""

# messageを送信する(messageの更新) message, post
@router.post("/")
async def update_message(talk_body: talk_schemas.TalkCreate, db: AsyncSession = Depends(get_db)):
    return await talk_crud.create_talk(db, talk_body)

# messageの削除 delete
@router.delete("/")
async def delete_message(talk_date: date, db: AsyncSession = Depends(get_db)):
    talk = await talk_crud.get_talk(db, talk_date=talk_date)
    return await talk_crud.delete_talk(db, original=talk)

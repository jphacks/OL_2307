from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

import schemas.home as home_schema

router = APIRouter()

# home部分の画面

#headerの取得
@router.get('/header')
def example(custom_header: Optional[str] = Header(None)):
    return f"{custom_header}"

# friend情報(uid,display_name,icon_path,message)を取得する get
@router.get("/homes", response_model=List[home_schema.HomeBase])
async def list_friends(db: AsyncSession = Depends(get_db)):
    return await home_crud.get_friend(db)

# messageが更新されたuserとそのuser,messageを取得する get
@router.get("/latest_message", response_model=List[home_schema.HomeBase])
async def get_latest_message(db: AsyncSession = Depends(get_db)):
    return await home_crud.get_message(db)

# messageが既読されたかどうか
@router.put("/read", response_model=home_schema.Home)
async def get_read(db: AsyncSession = Depends(get_db)):
    return await home_crud.get_read(db)



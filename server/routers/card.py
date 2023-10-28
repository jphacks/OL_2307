from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional


router = APIRouter()

# カード送信の画面

#headerの取得
@router.get('/header')
def example(custom_header: Optional[str] = Header(None)):
    return f"{custom_header}"


# 送信先の選択
# 送信先、画像情報を送信する message,image_path,card_color,card_type,card_title  post
@router.post("/")
async def send_card():
    pass

# ランダムで送信する友達の数を送信 post
@router.post("/")
async def send_rand():
    pass

# ランダムで送信するuserの送信 post
@router.post("/")
async def rand_user():
    pass


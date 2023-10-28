from typing import List, Tuple, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result
import shemas.home as home_shemas
import models.user as user_model
import models.friend as friend_model
import models.message as message_model

from datetime import date

# friendの取得 (uid, display_name, icon_path, message
async def get_friends(db: AsyncSession) -> List[Tuple[str,str,str,str]]:
  result: Result = await(
    db.execute(
      select(
        user_model.User.uid,
        user_model.User.display_name,
        user_model.User.icon_path,
        message_model.Message.message,
      ).outerjoin(user_model.User).outerjoin(message_model.Message)
    )
  )
  return result.all()

# messageが更新されたuserとそのuser,messageを取得する
# async def get_latest_massage(db: AsyncSession) -> List[Tuple]
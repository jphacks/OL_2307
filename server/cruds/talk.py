from sqlalchemy.ext.asyncio import AsyncSession

import models.user as user_model
import models.message as message_model
import schemas.talk as talk_schema
from datetime import date
import ast
from typing import List, Tuple, Optional

from sqlalchemy import select
from sqlalchemy.engine import Result

async def get_friend_info(db: AsyncSession) -> List[Tuple[str, str, str]]:
    result: Result = await (
        db.execute(
            select(
                user_model.User.uid,
                user_model.User.display_name,
                user_model.User.icon_path,
            ).outerjoin(user_model.User)
        )
    )
    return result.all()

async def get_talk(db: AsyncSession) -> List[Tuple[str, str, date]]:
    result: Result = await (
        db.execute(
            select(
                ).outerjoin(message_model.Message).outerjoin(task_model.Waiting).outerjoin(task_model.Working)
        )
    )
    return result.all()

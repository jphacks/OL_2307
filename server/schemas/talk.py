from typing import Optional
from datetime import date

from pydantic import BaseModel, Field

class TalkBase(BaseModel):
    uid: Optional[str]
    display_name: Optional[str]
    icon_path: Optional[str]
    message: Optional[str]
    createAt: Optional[date] = Field(default_factory=date.today)

class TalkCreate(TalkBase):
    message: Optional[str]

    class Config:
        orm_mode = True
from typing import Optional

from pydantic import BaseModel, Field
from datetime import date

class HomeBase(BaseModel):
    uid: Optional[str]
    display_name: Optional[str]
    icon_path: Optional[str]
    message: Optional[str]
    #create_at: Optional[date] = Field(default_factory=date.today)

class HomeCreate(HomeBase):
    class Config:
        orm_mode = True

class Home(HomeBase):
    read: bool = Field(False, description="既読フラグ")

    class Config:
        orm_mode = True
    


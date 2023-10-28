from typing import Optional
from datetime import date

from pydantic import BaseModel, Field

class cardBase(BaseModel):
    message: Optional[str]
    image_path: Optional[str]
    card_color: Optional[str]
    card_type: int
    card_title: Optional[str]

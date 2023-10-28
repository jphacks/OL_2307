from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship

from db import Base
from models.user import User

class Card(Base  ):
    __tablename__ = "cards"

    uid =  Column(String)
    to_user_id = Column(String, ForeignKey('users.uid'))
    from_user_id = Column(String, ForeignKey('users.uid'))
    message = Column(String)
    image_path = Column 
    card_color = Column(String)
    card_type = Column(Integer)
    card_title = Column(String)

    card = relationship("Card", foreign_keys= ["Card.to_user_id", "Card.from_user_id"], back_populates="users")
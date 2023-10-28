from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship

from models.db import Base
import models.friend
import models.message
import models.card

class User(Base):
    __tablename__ = "users"
    uid =  Column(String, primary_key=True, unique=True)
    display_name = Column(String)
    icon_path = Column(String)

    friend = relationship("Friend", foreign_keys= "[Friend.to_user_id, Friend.from_user_id]", back_populates="users")
    message = relationship("Message", foreign_keys= "[Message.to_user_id, Message.from_user_id]", back_populates="users")
    card = relationship("Card", foreign_keys= "[Card.to_user_id, Card.from_user_id]", back_populates="users")


    

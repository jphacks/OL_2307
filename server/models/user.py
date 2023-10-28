from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship

from models.db import Base

class User(Base):
    __tablename__ = "users"
    uid =  Column(String, primary_key=True, unique=True)
    display_name = Column(String)
    icon_path = Column(String)

    friends = relationship("Friend", primaryjoin="or_(User.uid == Friend.to_user_id, User.uid == Friend.from_user_id)", back_populates="users")
    messages = relationship("Message", primaryjoin="or_(User.uid == Message.to_user_id, User.uid == Message.from_user_id)", back_populates="users")
    cards = relationship("Card", primaryjoin="or_(User.uid == Card.to_user_id, User.uid == Card.from_user_id)", back_populates="users")

    

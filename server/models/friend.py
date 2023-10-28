from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship

from models.db import Base
from models.user import User

class Friend(Base):
    __tablename__ = "friends"
    to_user_id = Column(String, ForeignKey("users.uid"), primary_key=True)
    from_user_id = Column(String, ForeignKey("users.uid"), primary_key=True)
    
    users = relationship("User", foreign_keys = ["Friend.to_user_id", "Friend.from_user_id"], back_populates="friends")

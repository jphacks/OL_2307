from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship

from db import Base
from user import User

class Friend(Base):
    __tablename__ = "friends"
    to_user_id = Column(String)
    from_user_id = Column(String)
    
    user = relationship("User", Foreign_Key = "[Friend.to_user_id, Friend.from_user_id]", back_populates="friends")

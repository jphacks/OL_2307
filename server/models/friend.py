from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship

from models.db import Base
import models.user

class Friend(Base):
    __tablename__ = "friends"
    to_user_id = Column(String, ForeignKey("users.uid"))
    from_user_id = Column(String), ForeignKey("users.uid")
    
    user = relationship("User", Foreign_Key = "[Friend.to_user_id, Friend.from_user_id]", back_populates="friends")

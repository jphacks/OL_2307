from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship

from models.db import Base
from models.user import User

class Friend(Base):
    __tablename__ = "friends"
    to_user_id = Column(String, primary_key=True)
    from_user_id = Column(String, primary_key=True)
    
    #users = relationship("User", back_populates="friends")

from sqlalchemy import Column, String, ForeignKey, DATETIME
from sqlalchemy.orm import relationship

from models.db import Base
from models.user import User

class Message(Base):
    __tablename__ = "messages"

    to_user_id = Column(String)
    from_user_id = Column(String)

    uid =  Column(String)
    message = Column(String)
    create_at = (DATETIME)

    message = relationship("Message", foreign_keys= "[Message.to_user_id, Message.from_user_id]", back_populates="users")
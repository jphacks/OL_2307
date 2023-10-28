from sqlalchemy import Column, String, ForeignKey, DATETIME
from sqlalchemy.orm import relationship

from models.db import Base
from models.user import User

class Message(Base):
    __tablename__ = "messages"

    to_user_id = Column(String, ForeignKey("users.uid"))
    from_user_id = Column(String, ForeignKey("users.uid"))

    uid =  Column(String, primary_key=True)
    message = Column(String, primary_key=True)
    create_at = Column(DATETIME, primary_key=True)

    message = relationship("Message", foreign_keys= ["Message.to_user_id", "Message.from_user_id"], back_populates="users")
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship

from models.db import Base
from models.user import User

class Card(Base):
    __tablename__ = "cards"

    uid =  Column(String)
    to_user_id = Column(String)
    from_user_id = Column(String)
    message = Column(String)
    image_path = Column(String)
    card_color = Column(String)
    card_type = Column(Integer)
    card_title = Column(String)

    #users = relationship("User", back_populates="cards")
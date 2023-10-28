from sqlalchemy import Column, String, select

from models.db import Base, session

class User(Base):
    __tablename__ = "users"
    uid =  Column(String, primary_key=True, unique=True)
    display_name = Column(String)
    icon_path = Column(String)

    def get_user(uid):
        return session.execute(
            select(User).where(User.uid==uid)
        ).first()
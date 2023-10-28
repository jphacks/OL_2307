from sqlalchemy import Column, String, select, DATETIME

from models.db import Base, session

class Friend(Base):
    __tablename__ = "friends"
    to_user_id = Column(String, primary_key=True)
    from_user_id = Column(String, primary_key=True)
    last_talk = Column(DATETIME)
    
    def get_my_friends(to_user_id):
        return session.execute(
            select(Friend.from_user_id).where(Friend.to_user_id==to_user_id).order_by(Friend.last_talk.desc())
        ).all()

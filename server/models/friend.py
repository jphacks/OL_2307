from sqlalchemy import Column, String, select, DATETIME, insert

from models.db import Base, session

class Friend(Base):
    __tablename__ = "friends"
    to_user_id = Column(String, primary_key=True)
    from_user_id = Column(String, primary_key=True)
    last_talk = Column(DATETIME)

    def __init__(self, to_user_id, from_user_id):
        self.to_user_id=to_user_id
        self.from_user_id=from_user_id
        self.last_talk = None

    def insert(self):
        session.add(self)
        session.commit()


    def get_my_friends(to_user_id):
        return session.execute(
            select(Friend.from_user_id).where(Friend.to_user_id==to_user_id).order_by(Friend.last_talk.desc())
        ).all()

    def post_new_friend(me, friend):
        session.add()
        session.commit()
        
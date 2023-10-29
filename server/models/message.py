import datetime
from sqlalchemy import Column, String, DATETIME, Text, select
from models.db import Base, session, engine

import uuid


class Message(Base):
    __tablename__ = "messages"
    uid = Column(String(255), primary_key=True)
    to_user_id = Column(String(255))
    from_user_id = Column(String(255))
    message_type = Column(String(255)) # sentence, image, card
    message = Column(Text)
    # sentence: 文字列
    # image: 画像のパス
    # card: {color: "", type: "", title: "", message: ""}
    create_at = Column(DATETIME)

    def __init__(self, to_user_id, from_user_id, message_type, message):
        self.uid = uuid.uuid4()
        self.to_user_id = to_user_id
        self.from_user_id = from_user_id
        self.message_type = message_type
        self.message = message
        self.create_at = datetime.datetime.utcnow()

    def insert(self):
        session.add(self)
        session.commit()

    def get_latest_message(me, friend):
        return session.execute(
            select(Message).where((Message.to_user_id == me and Message.from_user_id == friend)or(Message.to_user_id == friend and Message.from_user_id == me)).order_by(Message.create_at.desc())
        ).first()

    def get_message_list(me, friend):
        return session.execute(
            select(Message).where((Message.to_user_id == me and Message.from_user_id == friend)or(Message.to_user_id == friend and Message.from_user_id == me)).order_by(Message.create_at)
        ).all()

Base.metadata.create_all(engine)

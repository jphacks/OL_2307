from sqlalchemy import Column, String, DATETIME, select

from models.db import Base, session


class Message(Base):
    __tablename__ = "messages"
    uid = Column(String, primary_key=True)
    to_user_id = Column(String)
    from_user_id = Column(String)
    message_type = Column(String) # sentence, image, card
    message = Column(String)
    create_at = Column(DATETIME)

    def get_latest_message(me, friend):
        return session.execute(
            select(Message).where((Message.to_user_id == me or Message.from_user_id == me)and(Message.to_user_id == friend or Message.from_user_id == friend)).order_by(Message.create_at.desc())
        ).first()
    
    def get_message_list(me, friend):
        return session.execute(
            select(Message).where((Message.to_user_id == me or Message.from_user_id == me)and(Message.to_user_id == friend or Message.from_user_id == friend)).order_by(Message.create_at.desc())
        ).all()
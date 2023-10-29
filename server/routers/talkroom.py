from fastapi import APIRouter, Header, HTTPException

from pydantic import BaseModel
import firebase
from models.friend import Friend
from models.user import User
from models.message import Message
from models.db import session

router = APIRouter()

@router.get("/messages/{friend_uid}")
async def get_message(friend_uid: str, authorization: str = Header(None)):
    # 私は誰か
    if authorization is None:
        raise HTTPException(status_code=401)
    try:
        uid = firebase.get_user_uid(authorization)
    except:
        raise HTTPException(status_code=401)

    message_list = Message.get_message_list(uid, friend_uid)

    response = []
    for message in message_list:
        print(message)
        response.append(
            {
                "fromUserId": message[0].from_user_id,
                "message": message[0].message,
                "createdAt": message[0].create_at,
            }
        )

    return response

class MessageBody(BaseModel):
    recive_user: str
    message_type: str
    message: str

@router.post("/messages")
async def post_messages(message_body: MessageBody, authorization: str = Header(None)):
    if authorization is None:
        raise HTTPException(status_code=401)
    try:
        uid = firebase.get_user_uid(authorization)
    except:
        raise HTTPException(status_code=401)

    new_message = Message(
        to_user_id= uid,
        from_user_id= message_body.recive_user,
        message_type= message_body.message_type,
        message= message_body.message,
    )
    new_message.insert()

    return {"message", "created"}


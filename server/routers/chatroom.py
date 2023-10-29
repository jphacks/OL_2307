from fastapi import APIRouter, Header, HTTPException
import sqlalchemy

import firebase
from models.friend import Friend
from models.user import User
from models.message import Message

router = APIRouter()

@router.get("/chatrooms")
async def get_chatrooms(authorization: str = Header(None)):
    # 私は誰か
    if authorization is None:
        raise HTTPException(status_code=401)
    try:
        uid = firebase.get_user_uid(authorization)
    except:
        raise HTTPException(status_code=401)

    # 友達のリストが欲しい
    friend_list = Friend.get_my_friends(uid)
    # 友達の表示名とアイコンと直近のメッセージ
    response = []
    for friend in friend_list:
        friend_info=User.get_user(friend[0])
        if friend_info is None: HTTPException("400")
        latest_message=Message.get_latest_message(uid, friend[0])
        if latest_message is None:
            latest_message = Message("", "", "", "")
            latest_message.create_at = None
        else:
            latest_message = latest_message[0]

        response.append(
            {
                "friendId": friend_info[0].uid,
                "friendName": friend_info[0].display_name,
                "friendIconPath": friend_info[0].icon_path,
                "messageType": latest_message.message_type,
                "message": latest_message.message,
                "createdAt": latest_message.create_at,
            }
        )

    return response

@router.post("/chatrooms/{friend_uid}")
async def post_chatrooms(friend_uid: str, authorization: str = Header()):
    # 私は誰か
    if authorization is None:
        raise HTTPException(status_code=401)
    try:
        uid = firebase.get_user_uid(authorization)
    except:
        raise HTTPException(status_code=401)

    new_friend=Friend(
        to_user_id = uid,
        from_user_id = friend_uid,
    )
    try:
        new_friend.insert()
    except sqlalchemy.exc.IntegrityError:
        return HTTPException(400)

    return {"message":"created"}
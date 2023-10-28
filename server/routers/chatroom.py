from fastapi import APIRouter, Header, HTTPException

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
        friend_info=User.get_user(friend)
        latest_message=Message.get_latest_message(uid, friend)

        response.append(
            {
                "friendId": friend_info.uid,
                "friendName": friend_info.display_name,
                "friendIconPath": friend_info.icon_path,
                "messageType": latest_message.message_type,
                "message": latest_message.message,
                "createdAt": latest_message.create_at,
            }
        )

    return response

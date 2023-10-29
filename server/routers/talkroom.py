import shutil
import uuid
from fastapi import APIRouter, Header, HTTPException, UploadFile
from fastapi.responses import FileResponse

from pydantic import BaseModel
import firebase
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
        response.append(
            {
                "fromUserId": message[0].from_user_id,
                "message_type": message[0].message_type,
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
        from_user_id = message_body.recive_user,
        message_type = message_body.message_type,
        message= message_body.message,
    )
    new_message.insert()

    return {"message", "created"}

@router.post("/images")
async def post_images(upload_file: UploadFile):
    type = upload_file.filename.split(".")[-1]
    file_name = f"{uuid.uuid4()}.{type}"
    path = f"/src/server/image/{file_name}"
    with open(path, "wb+") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    return {"filename": file_name}

@router.get("/image/{file_name}")
async def get_image(file_name: str):
    type = file_name.split(".")[-1]
    return FileResponse(path=f"/src/server/image/{file_name}", media_type=f"image/{type}")
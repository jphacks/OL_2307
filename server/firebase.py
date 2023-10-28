import firebase_admin
import os
from firebase_admin import credentials, auth

from models.user import User

# firebase用の環境変数を設定
os.environ["FIREBASE_AUTH_EMULATOR_HOST"] = "127.0.0.1:9099"

cred = credentials.Certificate("/src/server/jphacks2023-firebase-adminsdk-p2xu8-bfdf4713b0.json")
firebase_admin.initialize_app(cred)

def get_user_uid(auth_header: str) -> str:
    """authヘッダーからUIDを返却

    Args:
        auth_header (str): HTTPリクエストのauthヘッダー

    Returns:
        str: ユーザーのUID 存在しない場合はNone
    """
    auth_info = auth_header.split()
    if len(auth_info) != 2:
        raise ValueError("The syntax of the Auth header is incorrect")

    if auth_info[0] != "Bearer":
        raise ValueError("The specified authentication method is not available")

    decoded_token = auth.verify_id_token(auth_info[1])
    uid = decoded_token['uid']
    
    # ユーザーが作成済みでなければ作成
    db_user = User.get_user(uid)
    if db_user is None:
        fb_user = auth.get_user(uid)
        new_db_user = User(uid, fb_user.displayName, fb_user.photoURL)
        new_db_user.insert()
        
    return uid
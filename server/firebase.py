import firebase_admin
import os
from firebase_admin import credentials, auth

# firebase用の環境変数を設定
os.environ["FIREBASE_AUTH_EMULATOR_HOST"] = "127.0.0.1:9099"


cred = credentials.Certificate("jphacks2023-firebase-adminsdk-p2xu8-2c3de38463.json")
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

    return uid
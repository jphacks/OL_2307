"use client"

import { useEffect } from 'react';
import { initializeApp } from '@firebase/app';
import { useAuth } from "@/app/login/useAuth";
import {
  getAuth,
  GoogleAuthProvider
} from '@firebase/auth';

import { useRouter } from "next/navigation";
import { atom, useRecoilState } from "recoil";

export const sessionState = atom({
  key: "user",
  default: {
    token: '',
    uid: '',
    name: '',
    iconParh: ''
  },
});

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const auth = getAuth(initializeApp(firebaseConfig));

const Page = () => {
  const router = useRouter()
  const [userData, setUserData] = useRecoilState(sessionState);
  const { state, dispatch, credential, error } = useAuth(auth);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      dispatch({ type: 'login', payload: { token } });
    }
  }, [dispatch]);
  useEffect(() => {
    if (credential) {
      const token = GoogleAuthProvider.credentialFromResult(credential)?.idToken;
      if(token) {
        console.log(token);
        setUserData({
            token: token,
            uid: credential.user.uid,
            name: credential.user.displayName ?? '',
            iconParh: credential.user.photoURL ?? ''
        });
        token && sessionStorage.setItem('token', token);
      }
    } else {
      sessionStorage.removeItem('token');
    }
  }, [credential]);
  useEffect(() => {
    if (userData.token != '') {
      console.log(userData);
      router.push("/");
    }
  }, [userData]);
  const handleLogin = () => dispatch({ type: 'login' });
  const handleLogout = () => dispatch({ type: 'logout' });
  return (
    <div>
      <button onClick={handleLogin}>ログイン</button>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Page;
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

export const auth = getAuth(initializeApp(firebaseConfig));

const Login = () => {
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
      auth?.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
        if(idToken) {
          setUserData({
              token: idToken,
              uid: credential.user.uid,
              name: credential.user.displayName ?? '',
              iconParh: credential.user.photoURL ?? ''
          });
          idToken && sessionStorage.setItem('token', idToken);
        }
      }).catch(function(error) {
        // Handle error
      });      
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
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">ゆる友</h1>
          <h2>~最近調子どう？~</h2>
          <div className='h-12'></div>
          <button className="btn btn-primary" onClick={handleLogin}>Googleではじめる</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
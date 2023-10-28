"use client"

import { ProtectRoute } from '@/components/ProtectRoute'
import Navi from "@/components/Navi";
import { useState } from 'react';
import TalkTile from '@/components/TalkTile';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const res = [
    {
      "friendId": "a",
      "friendName": "aaaaa",
      "friendIconPath": "https://tinyurl.com/yklh4rmz",
      "message": "aaaaa",
      "createdAt": "2023-01-01 00:00:00"
    },
    {
      "friendId": "aa",
      "friendName": "aaaaa",
      "friendIconPath": "https://tinyurl.com/yklh4rmz",
      "message": "aaaaa",
      "createdAt": "2023-01-01 00:00:00"
    },
    {
      "friendId": "aaa",
      "friendName": "aaaaa",
      "friendIconPath": "https://tinyurl.com/yklh4rmz",
      "message": "aaaaa",
      "createdAt": "2023-01-01 00:00:00"
    },
    {
      "friendId": "aaaa",
      "friendName": "aaaaa",
      "friendIconPath": "https://tinyurl.com/yklh4rmz",
      "message": "aaaaa",
      "createdAt": "2023-01-01 00:00:00"
    },
    {
      "friendId": "aaaaa",
      "friendName": "aaaaa",
      "friendIconPath": "https://tinyurl.com/yklh4rmz",
      "message": "aaaaa",
      "createdAt": "2023-01-01 00:00:00"
    },
    {
      "friendId": "aaaaaa",
      "friendName": "aaaaa",
      "friendIconPath": "https://tinyurl.com/yklh4rmz",
      "message": "aaaaa",
      "createdAt": "2023-01-01 00:00:00"
    },
    {
      "friendId": "aaaaaaa",
      "friendName": "aaaaa",
      "friendIconPath": "https://tinyurl.com/yklh4rmz",
      "message": "aaaaa",
      "createdAt": "2023-01-01 00:00:00"
    }
  ];

  const talks = res.map((talk) =>
    <div className='my-4 border-b-2 border-neutral border-opacity-80' key={talk.friendId}>
      <TalkTile {...talk} />
    </div>
  );

  return (
    <ProtectRoute>
      <div>
        <div className="fixed top-0 w-full shadow-md">
          <div className="container mx-auto py-4 text-center z-50">
            <h1 className="text-2xl font-bold">Talk</h1>
          </div>
        </div>

        <div className="mt-16 p-4">
        

        {(isLoading)
          ? <div className='m-24 text-center'>
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          : talks}

        </div>
        <Navi />
      </div>
    </ProtectRoute>
  )
}

"use client"

import { ProtectRoute } from '@/components/ProtectRoute'
import Navi from "@/components/Navi";
import { useEffect, useState } from 'react';
import TalkTile from '@/components/TalkTile';
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { sessionState } from './login/page';

interface friend {
  friendId: string;
  friendName: string;
  friendIconPath: string;
  message: string;
  createdAt: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const session = useRecoilValue(sessionState);

  const [friends, setFriends] = useState<friend[]>([]);


  useEffect(() => {
    if(session.token){
      axios.get(process.env.NEXT_PUBLIC_BACKEND + '/chatrooms', {
        headers: { Authorization: `Bearer ${session.token}` }
      }).then((res => {
        setFriends(res.data);
        console.log(res.data);
        setIsLoading(false);
      }));
    }
  },[session])

  const talks = friends.map((talk) =>
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

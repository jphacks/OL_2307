"use client";

import Navi from '@/components/Navi'
import { QRCodeCanvas } from "qrcode.react";
import { ProtectRoute } from '@/components/ProtectRoute'
import { useState } from 'react';
import { sessionState } from '../login/page';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

export default function page() {
	const session = useRecoilValue(sessionState);
	const [state, setState] = useState(0);
	const [friendId, setFriendId] = useState('6qssPGYLkZSIEiPFsf0qWeONCwr1');
	const [isSending, setIsSending] = useState(false);

	return (
		<ProtectRoute>
			<div>
				<div className="fixed top-0 w-full shadow-md">
					<div className="container mx-auto py-4 text-center z-50">
						<h1 className="text-2xl font-bold">友だち追加</h1>
					</div>
				</div>

				<div className="mt-16 p-4">
					<div className='flex justify-center'>
						<div className='m-4'>
							<button className="btn btn-primary" onClick={(e) => {
								if(state === 0){
									setState(1);
								}else if(state === 1){
									setState(0);
								}
							}}>QRコードを作成する</button>
						</div>
						<div className='m-4'>
							<button className="btn btn-secondary" >QRコードを読み取る</button>
						</div>
					</div>
					<div className='m-8 flex justify-center'>
						{
							// ref: https://zenn.dev/hayato94087/articles/fdb9fb357a22c3#props
							state === 1 &&<QRCodeCanvas
							value={'aaaaa'}
							size={256}
							includeMargin={false}
							/>
						}
					</div>

					<div className='m-8 flex justify-center'>
						{
						friendId && <button className="btn btn-secondary" onClick={() => {
							if(session.token && !isSending){
								setIsSending(true);
								console.log(session.token);
								axios.post(`${process.env.NEXT_PUBLIC_BACKEND }/chatrooms/${friendId}`, {}, {
								  headers: {
										Authorization: `Bearer ${session.token}`
									},
								}).then((res) => {
									setIsSending(false);
								});
							  }
						}}>{ (isSending)
									? <span className="loading loading-spinner loading-md"></span>
									: '友だち追加' }</button>
					}
					</div>
					
				</div>
				<Navi />
			</div>
		</ProtectRoute>
	)
}

'use client'
import { ProtectRoute } from "@/components/ProtectRoute";
import { useEffect, useState } from "react";
import { atom, useRecoilValue } from "recoil";
import { sessionState } from "../login/page";
import Navi from "@/components/Navi";

export const talkFriend = atom({
	key: "talkFriend",
	default: {
		friendId: '',
		friendName: '',
		friendIconPath: ''
	}
});

export default function page() {

	const session = useRecoilValue(sessionState);
	const friend = useRecoilValue(talkFriend);

	const [message, setMessage] = useState('');

	const [isLoading, setIsLoading] = useState(false);


	useEffect(() => {
		console.log(friend);
	}, [])


	const res = [
		{
			"fromUserId": session.uid,
			"message": "aaaadaasfsafsa",
			"createAt": "2023-01-01 00:01:01"
		},
		{
			"fromUserId": "id002",
			"message": "aaaadaasfsafsa",
			"createAt": "2023-01-01 00:02:02"
		},
		{
			"fromUserId": session.uid,
			"message": "aaaadaasfsafsa",
			"createAt": "2023-01-01 00:03:03"
		},
		{
			"fromUserId": "id002",
			"message": "aaaadaasfsafsa",
			"createAt": "2023-01-01 00:04:04"
		},
		{
			"fromUserId": session.uid,
			"message": "aaaadaasfsafsa",
			"createAt": "2023-01-01 00:05:05"
		},
		{
			"fromUserId": "id002",
			"message": "aaaadaasfsafsa",
			"createAt": "2023-01-01 00:06:06"
		},
	];

	const getTimeString = (datetime: string) => {
		const time = datetime.split(' ')[1];
		const num = time.split(':');
		return `${num[0]}:${num[1]}`
	}

	// メッセージを送信
	const postMessage = () => {
		console.log(`send ${message}.`);
		setMessage('');
	}

	const chats = res.map((chat) =>
		(chat.fromUserId == session.uid)
			? <div className="chat chat-end" key={Math.random()}>
				<div className="chat-image avatar">
				</div>
				<div className="chat-bubble">{chat.message}</div>
				<div className="chat-footer opacity-50 mr-2">
					{getTimeString(chat.createAt)}
				</div>
			</div>
			: <div className="chat chat-start" key={Math.random()}>
				<div className="chat-image avatar">
					<div className="w-10 rounded-full ring ring-neutral ring-offset-base-100">
						<img src={friend.friendIconPath} />
					</div>
				</div>
				<div className="chat-bubble">{chat.message}</div>
				<div className="chat-footer opacity-50 ml-2">
					{getTimeString(chat.createAt)}
				</div>
			</div>
	);

	return (
		<ProtectRoute>
			<div className="flex flex-col h-screen">
				<div className="fixed top-0 w-full shadow-md">
					<div className="container mx-auto py-4 text-center z-50">
						<h1 className="text-2xl font-bold">Talk</h1>
					</div>
				</div>

				<div className="mt-16 p-4 overflow-y-auto">
					{chats}
				</div>

				<div className="mt-auto p-4">
					<div className="flex mb-14">
						<input
							placeholder="メッセージ"
							className="input input-bordered input-md w-full max-w-xs"
							value={message}
							onChange={(event) => setMessage(event.target.value)}
						/>
						<button className="ml-2 btn btn-primary" onClick={postMessage}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
							<path
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14L21 3m0 0l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1L21 3"
							></path>
							</svg>
						</button>
					</div>
				</div>

				<Navi />
			</div>
		</ProtectRoute>

	);
}

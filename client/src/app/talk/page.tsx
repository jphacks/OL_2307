'use client'
import { ProtectRoute } from "@/components/ProtectRoute";
import { useEffect, useState } from "react";
import { atom, useRecoilValue } from "recoil";
import { sessionState } from "../login/page";
import Navi from "@/components/Navi";
import axios from "axios";
import Centence from "./centence";
import Card from "./card";

export const talkFriend = atom({
	key: "talkFriend",
	default: {
		friendId: '',
		friendName: '',
		friendIconPath: ''
	}
});

interface message {
	fromUserId: string;
	message: string;
	createAt: string;
	message_type: string;
}

export default function page() {

	const session = useRecoilValue(sessionState);
	const friend = useRecoilValue(talkFriend);

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<message[]>([])

	const [isLoading, setIsLoading] = useState(false);
	const [isSending, setIsSending] = useState(false);


	useEffect(() => {
		console.log(friend);
	}, [])

	const getTimeString = (datetime: string) => {
		return datetime;
		if (datetime === '') return datetime;
		const time = datetime.split('T')[1];
		const num = time.split(':');
		return `${num[0]}:${num[1]}`
	}

	// メッセージの取得
	useEffect(() => {
		if (session.token && !isLoading) {
			setIsLoading(true);
			axios.get(`${process.env.NEXT_PUBLIC_BACKEND }/messages/${friend.friendId}`, {
				headers: { Authorization: `Bearer ${session.token}` }
			}).then((res => {
				console.log('fech message.');
				setMessages(res.data);
				console.log(res.data);
				setIsLoading(false);
			}));
		}
	}, [])


	// メッセージを送信
	const postMessage = () => {
		if (session.token && !isSending && friend.friendId) {
			setIsSending(true);
			axios.post(`${process.env.NEXT_PUBLIC_BACKEND }/messages`, {
				recive_user: friend.friendId,
				message_type: "sentence",
				message: message
			}, {
				headers: {
					Authorization: `Bearer ${session.token}`
				},
			}).then((res) => {

				// 再取得
				if (session.token && !isLoading) {
					setIsLoading(true);
					axios.get(`${process.env.NEXT_PUBLIC_BACKEND }/messages/${friend.friendId}`, {
						headers: { Authorization: `Bearer ${session.token}` }
					}).then((res => {
						console.log('fech message.');
						setMessages(res.data);
						console.log(res.data);
						setIsLoading(false);
					}));
				}

				setIsSending(false);
			});
		}
		setMessage('');
	}

	useEffect(() => {
		console.log(messages);
	}, [messages])

	const chats = messages.map((chat) =>
		(chat.message_type === 'sentence')
			? <Centence {...chat} key={Math.random()} />
			: <Card {...chat} key={Math.random()} />
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
							{
								(isSending)
									? <span className="loading loading-spinner loading-md"></span>
									: <svg
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
							}

						</button>
					</div>
				</div>

				<Navi />
			</div>
		</ProtectRoute>

	);
}

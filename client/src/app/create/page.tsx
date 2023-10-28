"use client"

import { ProtectRoute } from "@/components/ProtectRoute";
import { useEffect, useRef, useState } from "react";
import Navi from "@/components/Navi";


interface friend {
	friendId: string;
	friendName: string;
	friendIconPath: string;
	message: string;
	createdAt: string;
}

export default function page() {

	const [profileImage, setProfileImage] = useState<null | string>(null);
	const [inEdit, setInEdit] = useState(true);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [nTarget, setNTarget] = useState(0);
	const [friends, setFriend] = useState<friend[]>([]);
	const [targets, setTargets] = useState<friend[]>([]);

	const res = [{
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
		"friendId": "aaaa",
		"friendName": "aaaaa",
		"friendIconPath": "https://tinyurl.com/yklh4rmz",
		"message": "aaaaa",
		"createdAt": "2023-01-01 00:00:00"
	}];

	useEffect(() => {
		// TODO: fetch
		setFriend(res);
	}, []);

	// friendListの中から無作為に n 人選んで targets に入れる
	const randomSelect = () => {
		setTargets([]);
		const n = Math.min(nTarget, friends.length);
		// let i = 0;
		// console.log(n);
		// while (targets.length < n && i < 100) {
		// 	const index = Math.floor(Math.random() * friends.length);
	
		// 	// すでに選択されていないかチェック
		// 	let isContain = false;

		// 	for (let i = 0; i < targets.length; i++) {
		// 		const elem = targets[i];
		// 		if (elem.friendId == friends[index].friendId){
		// 			isContain = true;
		// 			break;
		// 		}
		// 	}
	
		// 	if (!isContain) {
		// 		setTargets(prevTargets => [...prevTargets, friends[index]]);
		// 	}
	
		// }

		// TODO: ↑なぜか動かないのでとりあえず上からn個とって来てる
		for (let i = 0; i < n; i++) {
			const element = friends[i];
			setTargets(prevTargets => [...prevTargets, friends[i]]);
		}
		console.log(targets);

	};

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};


	const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		// React.ChangeEvent<HTMLInputElement>よりファイルを取得
		const fileObject = e.target.files[0];
		// オブジェクトURLを生成し、useState()を更新
		setProfileImage(window.URL.createObjectURL(fileObject));
	};


	const targetJSX = targets.map((elem) => {
		return (
			<div className="flex my-8" key={elem.friendId}>
				<div className="avatar mr-4 z-0">
					<div className=" m-2 w-10 h-10 rounded-full ring ring-accent ring-offset-base-100 ring-offset-1">
						<img src={ elem.friendIconPath} />
					</div>
				</div>
				<div className="">
					<p className="font-bold text-lg">{elem.friendName} </p>
					<p className="text-right">{ '最終会話日: ' + elem.createdAt.split(' ')[0].replaceAll('-', '/')}</p>
				</div>
			</div>
		);
	});


	return (
		<ProtectRoute>
			<div>
				<div className="fixed top-0 w-full shadow-md">
					<div className="container mx-auto py-4 text-center z-50">
						<h1 className="text-2xl font-bold">Make Card</h1>
					</div>
				</div>

				<div className="mt-16 p-4">

					{
						(inEdit)
							? <div>
								<h1 className="m-2 text-lg text-center">きっかけのカードを作ろう！</h1>

								{/* hidden file input element */}
								{/* <button onClick={handleButtonClick}>ファイルを選択</button> */}
								<input className="hidden" type="file" accept="image/*" ref={fileInputRef} onChange={onFileInputChange} />


								{/* card preview */}
								<div className="my-4 card card-compact border-2 border-neutral shadow-xl">
										{
											(profileImage)
												? <figure>
													<img src={profileImage} alt="images" />
												</figure>
												: <div className="h-32 flex justify-center items-center">Image</div>
										}
									<div className="card-body">
										<h2 className="card-title">
											<input type="text" placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs" />
										</h2>
										<textarea placeholder="Bio" className="textarea textarea-bordered textarea-sm w-full max-w-xs" />
									</div>
								</div>
								<div className="flex justify-center m-8 text-center">
									<button className="mx-1 btn btn-accent" onClick={handleButtonClick}>画像の設定</button>
									<button className="mx-1 btn btn-primary" onClick={() => {
										setInEdit(false);
									}}>送信先の選択</button>
								</div>
							</div>
							: <div>
								<h1 className="m-2 text-lg text-center">送る相手を選択します．</h1>
								<div className="flex">
									<input type="number" placeholder="送信人数"
										className="input input-bordered input-md w-full max-w-xs" 
										onChange={(event) => setNTarget( parseInt(event.target.value))} />
									<button className="ml-2 btn btn-primary" onClick={randomSelect}>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4m-4 4a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4">
											</path>
											</svg>
									</button>
								</div>
								{ targetJSX }
								<div className="mt-12 flex justify-center">
									<button className="m-2 btn btn-neutral" onClick={() => {
										setInEdit(true);
									}}>戻る</button>
									{
										(targets.length)
										? <button className="m-2 btn btn-accent">送信</button>
										: <button className="m-2 btn" disabled={true}>送信</button>
									}
									
								</div>
							</div>
					}

				</div>

				<Navi />
			</div>
		</ProtectRoute>
	);

};
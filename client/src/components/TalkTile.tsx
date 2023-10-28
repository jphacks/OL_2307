import { talkFriend } from "@/app/talk/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RecoilState, useRecoilState } from "recoil";

interface props {
	friendId: string;
	friendName: string;
	friendIconPath: string;
	message: string;
	createdAt: string;
}

export default function TalkTile(props: props) {

	const router = useRouter();

	const [friend, setFriend] = useRecoilState(talkFriend);

	const getTimeString = () => {
		return props.createdAt.split(' ')[1];
	}

	return (
		<Link href={ "/talk?friendId=" + props.friendId} onClick={ (event) =>  {
			event.preventDefault();
			setFriend({
				friendId: props.friendId,
				friendName: props.friendName,
				friendIconPath: props.friendIconPath
			});
			router.push('/talk');
		}}>
		<div className="flex" >
			<div className="avatar mr-4 z-0">
				<div className=" m-2 w-16 h-16 rounded-full ring ring-neutral ring-offset-base-100">
					<img src={props.friendIconPath} />
				</div>
			</div>
			<div className="">
				<p className="font-bold text-lg">{props.friendName} </p>
				<p className="">{props.message}</p>
				<p className="text-right">{getTimeString()}</p>
			</div>
		</div>
		</Link>
		
	);
}


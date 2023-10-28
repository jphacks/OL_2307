'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { atom, useRecoilState } from "recoil";

export const tabState = atom({
	key: "tabState",
	default: 1
});

export default function Navi() {

	const [state, setState] = useRecoilState(tabState);
	const router = useRouter();

	return (	
		<div className="btm-nav">
			<button className={'text-info' + ((state==0)? ' active':'')} onClick={() => {
				setState(0);
				router.push('/create');
			}}>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 20h4L18.5 9.5a2.828 2.828 0 1 0-4-4L4 16v4m9.5-13.5l4 4M16 19h6m-3-3v6"></path></svg>
			</button>
			<button className={'text-info' + ((state==1)? ' active':'')} onClick={() => {
				setState(1);
				router.push('/');
			}}>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9h8m-8 4h6m4-9a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12z"></path></svg>
			</button>
			<button className={'text-info' + ((state==2)? ' active':'')} onClick={() => {
				setState(2);
				router.push('/addfriend');
			}}>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M3 21v-2a4 4 0 0 1 4-4h4c.96 0 1.84.338 2.53.901M16 3.13a4 4 0 0 1 0 7.75M16 19h6m-3-3v6"></path></svg>
			</button>
		</div>
	);
}



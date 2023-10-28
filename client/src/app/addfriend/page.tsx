"use client";

import Navi from '@/components/Navi'
import { QRCodeCanvas } from "qrcode.react";
import { ProtectRoute } from '@/components/ProtectRoute'
import Link from 'next/link'
import { useState } from 'react';

export default function page() {

	const [state, setState] = useState(0);

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
							<Link className="btn btn-primary" href={''} onClick={(e) => {
								e.preventDefault();
								if(state === 0){
									setState(1);
								}else if(state === 1){
									setState(0);
								}
							}}>QRコードを作成する</Link>
						</div>
						<div className='m-4'>
							<Link className="btn btn-secondary" href={''}>QRコードを読み取る</Link>
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
				</div>
				<Navi />
			</div>
		</ProtectRoute>
	)
}

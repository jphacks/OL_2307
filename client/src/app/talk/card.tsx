'user client'
import { useRecoilValue } from "recoil";
import { sessionState } from "../login/page";


interface message {
	fromUserId: string;
	message: string;
	createAt: string;
	message_type: string;
}

const getTimeString = (datetime: string) => {
	if (!datetime) return '';
	const time = datetime.split('T')[1];
	const num = time.split(':');
	return `${num[0]}:${num[1]}`
}

const Card = (props: message) => {

	const session = useRecoilValue(sessionState);
	const card = JSON.parse(props.message);

	return (
		<div className={'chat chat-' + (session.uid==props.fromUserId)
			? 'start'
			: 'end'} key={Math.random()}>
			<div className="my-4 card card-compact border-2 border-neutral shadow-xl">
				<figure><img src={card.img} alt="images" /></figure>
				<div className="card-body">
					<h2 className="card-title">{ card.title }</h2>
					{ card.body }
				</div>
			</div>
		</div>
	);
}

export default Card;
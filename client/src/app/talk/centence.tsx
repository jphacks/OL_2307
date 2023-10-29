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

const Centence = (props: message) => {

	const session = useRecoilValue(sessionState);
	
    return (
		<div className={'chat chat-' + (session.uid==props.fromUserId)
			? 'start'
			: 'end'} key={Math.random()}>
			<div className="chat-image avatar">
			</div>
			<div className="chat-bubble">{props.message}</div>
			<div className="chat-footer opacity-50 mr-2">
				{getTimeString(props.createAt)}
			</div>
		</div>
	);
}

export default Centence;
import moment from "moment";
import { FC } from "react";
import styles from "../styles/Message.module.css";
import { combine } from "../utils/style";
import extractUrls from  "extract-urls";
import { Scanner } from "../utils/Scanner";
import Link from "next/link";

export interface IMessage {
	textContent: string;
	timestamp?: number;
	type: MessageType;
    warning?: boolean
}

export enum MessageType {
	USER,
	BOT,
}

const Message: FC<IMessage> = ({ textContent, timestamp, type, warning }) => {
    const urls = extractUrls(textContent, true)

    const tokens = !!urls && !!urls.length ? new Scanner(textContent, true , urls).scan(): [textContent];

	return (
		<div className={combine(styles.message, type === MessageType.USER && styles.user, warning && styles.warning)}>
			<p className={styles.text}>{tokens.map(t => {
                return !!urls && !!urls.length && urls.includes(t) ? <Link  href={t}><a className={styles.link} target={'_blank'}>{t}</a></Link> : t
            })}</p>
			<p className={styles.timestamp}>
				{!!timestamp && moment(timestamp).format("hh:mm")}
			</p>
		</div>
	);
};

export default Message;

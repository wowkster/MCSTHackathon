import type { GetServerSideProps, NextPage } from "next";
import styles from "../styles/Home.module.css";
import { IoMdSend } from "react-icons/io";
import { FC, useEffect, useRef, useState } from "react";
import Message, { IMessage, MessageType } from "../components/Message";
import { combine } from "../utils/style";
import Loader from "../components/Loader";
import axios from "axios";
import Layout from "../components/Layout";
import cuid from "cuid";

const DEFAULT_TEXT = `Hi! I'm Olive, your mental health assistant. Type your messages below, and I'll try to help.`;

const Home: NextPage<{ clientId: string }> = ({ clientId }) => {
	const [messages, setMessages] = useState<IMessage[]>([
		{
			textContent: DEFAULT_TEXT,
			timestamp: Date.now(),
			type: MessageType.BOT,
		},
	]);
	const [textContent, setTextContent] = useState("");
	const [loading, setLoading] = useState(false);
	const messagesBox = useRef<HTMLDivElement>(null);

	useEffect(() => {
		speakMessage(DEFAULT_TEXT);
	}, []);

	const scrollToBottom = () => {
		setTimeout(() => {
			if (messagesBox.current === null) return;
			messagesBox.current.scrollTo({
				top: messagesBox.current.scrollHeight,
				behavior: "smooth",
			});
		}, 100);
	};

	const speakMessage = (text: string) => {
		// // new SpeechSynthesisUtterance object
		// let utter = new SpeechSynthesisUtterance();
		// utter.lang = "en-GB";
		// utter.text = text;
		// utter.volume = 1;
		// utter.rate = 1.25;
		// utter.pitch = 1;
		// utter.voice = window.speechSynthesis.getVoices()[8];
		// // speak
		// window.speechSynthesis.speak(utter);
	};

	const handleSubmit = () => {
		if (textContent === "") return;
		messages.push({
			textContent: textContent,
			timestamp: Date.now(),
			type: MessageType.USER,
		});
		setMessages([...messages]);
		scrollToBottom();
		handleRequest(textContent);

		setLoading(true);
		setTextContent("");
	};

	const handleRequest = async (text: string) => {
		// Request a response from the backend api
		const res = await axios.post("/api/prompt", {
			message: text,
			clientId: clientId,
		});

		setLoading(false);
		setMessages([
			...messages,
			{
				textContent: res.data.response,
				timestamp: Date.now(),
				type: MessageType.BOT,
			},
		]);

		speakMessage(res.data.response);

		scrollToBottom();
	};

	return (
		<Layout>
			<div className={styles.messages} ref={messagesBox}>
				{messages.map((m, i) => (
					<Message key={i} {...m} />
				))}
				{loading && <Loader />}
			</div>
			<div className={styles.textBox}>
				<input
					type="text"
					name="messageInput"
					id="messageInput"
					className={styles.textInput}
					placeholder="Type your message here"
					autoFocus
					value={textContent}
					onChange={(e) => setTextContent(e.target.value)}
                    onKeyDown={(e) => {
                        console.log(e)
                        if (e.code === 'Enter') {
                            e.preventDefault();
                            handleSubmit();
                          }

					}}
					disabled={loading}
				></input>
				<div
					className={combine(
						styles.sendBtn,
						loading || (textContent === "" && styles.disabled)
					)}
					onClick={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					<IoMdSend size={32} />
				</div>
			</div>
		</Layout>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			clientId: cuid(),
		},
	};
};

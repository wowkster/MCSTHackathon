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

const Home: NextPage = () => {
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
	const textInput = useRef<HTMLInputElement>(null);
	const [dialogue, setDialogue] = useState("");

	const scrollToBottom = () => {
		setTimeout(() => {
			if (messagesBox.current === null) return;
			messagesBox.current.scrollTo({
				top: messagesBox.current.scrollHeight,
				behavior: "smooth",
			});
		}, 100);
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
		textInput.current?.focus();
		setTimeout(() => {
			textInput.current?.focus();
		}, 100);
	};

	const handleRequest = async (text: string) => {
		// Request a response from the backend api
		const res = await axios.post("/api/prompt", {
			message: text,
			clientDialogue: dialogue,
		});

		const { response, dialogue: newDialogue, warning } = res.data;

		setLoading(false);
		setMessages([
			...messages,
			{
				textContent: response,
				timestamp: Date.now(),
				type: MessageType.BOT,
                warning
			},
		]);
		setDialogue(newDialogue);

		scrollToBottom();
		textInput.current?.focus();
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
						if (e.key === "Enter") {
							e.preventDefault();
							handleSubmit();
						}
					}}
					disabled={loading}
					ref={textInput}
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

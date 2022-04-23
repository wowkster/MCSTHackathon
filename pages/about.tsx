import type { NextPage } from "next";
import styles from "../styles/About.module.css";
import Layout from "../components/Layout";
import Message, { IMessage, MessageType } from "../components/Message";

const messages: IMessage[] = [
	{
		textContent: `Mentalhealth.io is a chatbot aimed to help those in need of help for
    any issue they may have. The chatbot is built using the OpenAI API and
    full stack to provide a helpful and accurate interactive user
    experience.`,
		type: MessageType.BOT,
	},
	{
		textContent: `We are three high school juniors who are passionate about problem
    solving and programming. We set out to create a resource for people
    suffering from mental health issues, as it has become such a prominent
    problem in today's society.`,
		type: MessageType.USER,
	},
];

const About: NextPage = () => {
	return (
		<Layout>
			<div className={styles.messages}>
				{messages.map((m, i) => (
					<Message key={i} {...m} />
				))}
			</div>
		</Layout>
	);
};

export default About;

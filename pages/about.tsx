import type { NextPage } from "next";
import styles from "../styles/About.module.css";
import Layout from "../components/Layout";
import Message, { IMessage, MessageType } from "../components/Message";

const messages: IMessage[] = [
	{
		textContent: `Mentalhealth.io is a chatbot aimed to help those in need of help for
    any issue they may have. The chatbot is built using the OpenAI GPT-3 API and
    full stack to provide a helpful and accurate interactive user
    experience. This bot is trained throughout the entire internet as its knowledge base.`,
		type: MessageType.BOT,
	},
	{
		textContent: `We are three high school juniors who are passionate about problem
    solving and programming. We saw a problem in our schools access to mental health resources. When we opened our mental health resource catalog, all we were greeted
	with was links to domains with more links. Did you know it takes a person less than a second to
	form an opinion on a site. Being confronted with this list of links is not something that a student who is struggling with 
	their own mental health 	 `,
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

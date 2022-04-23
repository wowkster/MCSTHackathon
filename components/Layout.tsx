import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Layout.module.css";
import { FC, FunctionComponent, useState } from "react";

type Props = {
	children: React.ReactNode;
};

const Layout: FunctionComponent<Props> = ({ children }) => {
	const [coord, setCoord] = useState({ x: 0, y: 0 });
	const handleMouseMove = (e: any) => {
		setCoord({ x: e.screenX, y: e.screenY });
	};

	const offset =
		typeof window === "undefined" ? 0 : (coord.x / window.innerWidth) * 20;

	return (
		<div
			className={styles.container}
			onMouseMove={handleMouseMove}
			style={{
				backgroundImage: `linear-gradient(120deg, #7ea1e3 ${
					20 + offset
				}%, #f653b5 ${150 - offset}%)`,
			}}
		>
			<Head>
				<title>mindfulhealth.io</title>
				<meta name="description" content="Mental Health AI chat bot" />
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
			</Head>

			<div className={styles.contentWrap}>
				<nav className={styles.nav}>
					<div className={styles.logo}>
						<Link href={"/"} passHref>
							<h2>mindfulhealth.io</h2>
						</Link>
					</div>
					<div className={styles.navLinks}>
						<Link href={"/about"} passHref>
							<h3>About</h3>
						</Link>
					</div>
				</nav>

				<main className={styles.main}>{children}</main>
			</div>

			<footer className={styles.footer}>
				&copy;2022 Adrian Wowk, JJ Wyetzner, and Siddharth Paul
			</footer>
		</div>
	);
};

export default Layout;

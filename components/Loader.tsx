import React, { FC } from "react";

import styles from "../styles/Loader.module.css";

const Loader: FC<{}> = ({}) => {
	return (
		<div className={styles.loader}>
			<div className={styles.spinner}>
				<div className={styles.bounce1}></div>
				<div className={styles.bounce2}></div>
				<div className={styles.bounce3}></div>
			</div>
		</div>
	);
};

export default Loader;

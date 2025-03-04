import { FC } from "react";
import styles from "./DotsLoader.module.scss";

const DotsLoader: FC<{}> = () => {
    return (
        <div className={styles.dotsLoaderContainer}>
            <p className={styles.dot} />
            <p className={styles.dot} />
            <p className={styles.dot} />
        </div>
    );
};

export default DotsLoader;

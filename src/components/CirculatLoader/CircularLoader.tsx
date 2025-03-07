import { FC } from "react";
import styles from "./CircularLoader.module.scss";

interface iCircularLoaderProps {
    text?: string;
}

const CircularLoader: FC<iCircularLoaderProps> = ({ text }) => {
    return (
        <div className={styles.loaderContainer}>
            <p className={styles.loader} />
            {text ? <p className={styles.loadingText}>{text}</p> : ""}
        </div>
    );
};

export default CircularLoader;

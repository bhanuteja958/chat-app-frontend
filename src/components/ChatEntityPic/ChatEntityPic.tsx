import { FC } from "react";
import styles from "./ChatEntityPic.module.scss";
import Image from "next/image";
import Person from "../SVG/Person";

interface ChatEntityPicProps {
    userPic: string;
    isOnline: boolean;
    size?: number;
}

const ChatEntityPic: FC<ChatEntityPicProps> = ({ userPic, isOnline, size }) => {
    return (
        <div
            className={`${styles.entityPicContainer} ${isOnline ? styles.online : ""}`}
            style={{
                width: `${size || 50}px`,
                height: `${size || 50}px`,
            }}
        >
            {userPic ? (
                <Image
                    src={userPic}
                    alt="User profile picture"
                    style={{
                        width: `${size || 50}px`,
                        height: `${size || 50}px`,
                    }}
                />
            ) : (
                <div className={styles.entityPlaceholderPic}>
                    <Person styles={styles.personIcon} />
                </div>
            )}
        </div>
    );
};

export default ChatEntityPic;

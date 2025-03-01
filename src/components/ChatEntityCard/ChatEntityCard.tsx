import { FC } from "react";
import styles from "./ChatEntityCard.module.scss";
import Image from "next/image";
import Person from "../SVG/Person";

interface iChatEntityCardProps {
    name: string;
    unseenMessageCount?: number;
    latestMessage?: string;
    lastSeenTime?: string;
    userPic: string;
    isOnline: boolean;
}

const ChatEntityCard: FC<iChatEntityCardProps> = ({
    name,
    unseenMessageCount,
    latestMessage,
    lastSeenTime,
    userPic,
    isOnline,
}) => {
    return (
        <div className={styles.chatEntityCardContainer}>
            <div className={styles.entityPicContainer}>
                {userPic ? (
                    <Image src={userPic} alt="User profile picture" />
                ) : (
                    <div className={styles.entityPlaceholderPic}>
                        <Person styles={styles.personIcon} />
                    </div>
                )}

                {isOnline ? <p className={styles.onlineIndicator} /> : ""}
            </div>

            <div className={styles.entityChatInfo}>
                <div className={styles.chatInfoLeft}>
                    <p className={styles.entityName}>{name}</p>
                    <p className={styles.latestChatMessageWithEntity}>
                        {latestMessage || "No Message Sent"}
                    </p>
                </div>
                <div className={styles.chatInfoRight}>
                    {lastSeenTime ? (
                        <p className={styles.lastSeenTime}>6:09 PM</p>
                    ) : (
                        ""
                    )}
                    {unseenMessageCount ? (
                        <p className={styles.unseenMessageCount}>
                            <span>2</span>
                        </p>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatEntityCard;

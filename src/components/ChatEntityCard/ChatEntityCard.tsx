import { FC } from "react";
import styles from "./ChatEntityCard.module.scss";
import ChatEntityPic from "../ChatEntityPic/ChatEntityPic";

interface iChatEntityCardProps {
    name: string;
    unseenMessageCount?: number;
    latestMessage?: string;
    lastSeenTime?: string;
    userPic: string;
    isOnline: boolean;
    cardClickHandler: () => void;
}

const ChatEntityCard: FC<iChatEntityCardProps> = ({
    name,
    unseenMessageCount,
    latestMessage,
    lastSeenTime,
    userPic,
    isOnline,
    cardClickHandler,
}) => {
    return (
        <div
            className={styles.chatEntityCardContainer}
            onClick={() => {
                cardClickHandler();
            }}
        >
            <ChatEntityPic userPic={userPic} isOnline={isOnline} size={65} />
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

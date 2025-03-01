import { FC } from "react";
import styles from "./ConversationInterface.module.scss";
import Image from "next/image";
import Person from "../SVG/Person";
import KebabMenu from "../KebabMenu/KebabMenu";
import Send from "../SVG/Send";

interface iConversationInterfaceProps {
    userPic: string;
    name: string;
    onlineStatus: string;
    lastSeenTime?: string;
}

const dropDownList: iDropdownItem[] = [];

const messages = [
    {
        content: "Hi bro how are you?",
        isUser: true,
        id: 1,
    },
    {
        content: "I'm fine wbu?",
        isUser: false,
        id: 2,
    },
    {
        content: "Hi bro how are you?",
        isUser: true,
        id: 1,
    },
    {
        content: "I'm fine wbu?",
        isUser: false,
        id: 2,
    },
    {
        content: "Hi bro how are you?",
        isUser: true,
        id: 1,
    },
    {
        content: "I'm fine wbu?",
        isUser: false,
        id: 2,
    },
    {
        content: "Hi bro how are you?",
        isUser: true,
        id: 1,
    },
    {
        content: "I'm fine wbu?",
        isUser: false,
        id: 2,
    },
];

const ConversationInterface: FC<iConversationInterfaceProps> = ({
    userPic,
    name,
    onlineStatus,
    lastSeenTime,
}) => {
    return (
        <section className={styles.conversationInterfaceContainer}>
            <div className={styles.conversationInterfaceHeader}>
                <div className={styles.chatEntity}>
                    <div className={styles.entityPicContainer}>
                        {userPic ? (
                            <Image src={userPic} alt="User profile picture" />
                        ) : (
                            <div className={styles.entityPlaceholderPic}>
                                <Person styles={styles.personIcon} />
                            </div>
                        )}
                    </div>
                    <div className={styles.chatEntityInfo}>
                        <p className={styles.entityName}>{name}</p>
                        <p className={styles.onlineStatus}>
                            {onlineStatus
                                ? "Active Now"
                                : `Last seen ${lastSeenTime}`}
                        </p>
                    </div>
                </div>
                <KebabMenu dropdownItems={dropDownList} />
            </div>
            <div className={styles.messagesBlock}>
                {messages.map((message) => {
                    return (
                        <div
                            className={`${styles.messageOuterContainer} ${message.isUser ? styles.userMessageContainer : styles.friendMessageContainer}`}
                        >
                            <div className={styles.messageInnerContainer}>
                                <p className={styles.userName}>
                                    {message.isUser ? "You" : "Friend"}
                                </p>
                                <p
                                    className={`${styles.message} ${message.isUser ? styles.userMessage : styles.friendMessage}`}
                                >
                                    {message.content}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.conversationInterfaceFooter}>
                <div className={styles.messageInputContainer}>
                    <textarea className={styles.messageInput} rows={1} />
                    <button type="button" className={styles.sendButton}>
                        <Send styles={styles.sendIcon} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ConversationInterface;

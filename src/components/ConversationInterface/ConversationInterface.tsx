import { FC, useEffect } from "react";
import styles from "./ConversationInterface.module.scss";
import KebabMenu from "../KebabMenu/KebabMenu";
import Send from "../SVG/Send";
import Friends from "../SVG/Friends";
import ChatEntityPic from "../ChatEntityPic/ChatEntityPic";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { CHAT_MESSAGE_FOR_DISPLAY } from "../../types/socket";

interface iConversationInterfaceProps {
    selectedFriend: iFriendDetails | null;
    showEntityListDrawer?: () => void;
}

const dropDownList: iDropdownItem[] = [];

const ConversationInterface: FC<iConversationInterfaceProps> = ({
    selectedFriend,
    showEntityListDrawer,
}) => {
    const chats: any = useSelector((state: RootState) => state.chats.chats);

    useEffect(() => {
        console.log(chats);
    }, [chats]);
    return (
        <section className={styles.conversationInterfaceContainer}>
            <div className={styles.conversationInterfaceHeader}>
                <div className={styles.chatEntity}>
                    <ChatEntityPic
                        userPic={selectedFriend?.profilePic}
                        isOnline={true}
                        size={60}
                    />
                    {selectedFriend ? (
                        <div className={styles.chatEntityInfo}>
                            <p className={styles.entityName}>
                                {selectedFriend?.fullName}
                            </p>
                            <p className={styles.onlineStatus}>
                                {true ? "Active Now" : `Last seen 6:30PM`}
                            </p>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                {selectedFriend ? (
                    <div className={styles.controls}>
                        <div
                            className={styles.friendIconContainer}
                            onClick={showEntityListDrawer}
                        >
                            <Friends styles={styles.friendsIcon} />
                        </div>
                        <KebabMenu dropdownItems={dropDownList} />
                    </div>
                ) : (
                    ""
                )}
            </div>
            <div className={styles.messagesBlock}>
                {selectedFriend && chats[selectedFriend.userId]?.length > 0 ? (
                    Object.entries(chats[selectedFriend.userId]).map(
                        ([date, messages]: [
                            string,
                            Array<CHAT_MESSAGE_FOR_DISPLAY>,
                        ]) => {
                            return (
                                <>
                                    <p className={styles.messagesDate}>
                                        {date}
                                    </p>
                                    {messages.map((message) => {
                                        const { isUser, content, sentTime } =
                                            message;
                                        return (
                                            <div
                                                className={`${styles.messageOuterContainer} ${isUser ? styles.userMessageContainer : styles.friendMessageContainer}`}
                                                key={content}
                                            >
                                                <div
                                                    className={
                                                        styles.messageInnerContainer
                                                    }
                                                >
                                                    <p
                                                        className={
                                                            styles.userName
                                                        }
                                                    >
                                                        {isUser
                                                            ? "You"
                                                            : "Friend"}
                                                    </p>
                                                    <p
                                                        className={`${styles.message} ${isUser ? styles.userMessage : styles.friendMessage}`}
                                                    >
                                                        {content}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            );
                        },
                    )
                ) : (
                    <p className={styles.noMessagesText}>
                        No conversation yet. Send a message
                    </p>
                )}
            </div>
            <div className={styles.conversationInterfaceFooter}>
                <div className={styles.messageInputContainer}>
                    <textarea
                        className={styles.messageInput}
                        rows={1}
                        disabled={!selectedFriend}
                    />
                    <button
                        type="button"
                        className={styles.sendButton}
                        disabled={!selectedFriend}
                    >
                        <Send styles={styles.sendIcon} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ConversationInterface;

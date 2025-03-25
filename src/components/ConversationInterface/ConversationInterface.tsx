import {
    ChangeEvent,
    FC,
    KeyboardEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import styles from "./ConversationInterface.module.scss";
import KebabMenu from "../KebabMenu/KebabMenu";
import Send from "../SVG/Send";
import Friends from "../SVG/Friends";
import ChatEntityPic from "../ChatEntityPic/ChatEntityPic";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { CHAT_MESSAGE_FOR_DISPLAY } from "../../types/socket";
import { SOCKET_MESSAGE_TYPES } from "../../common/constants";
import { formatDate } from "../../common/helper";

interface iConversationInterfaceProps {
    selectedFriend: iFriendDetails | null;
    showEntityListDrawer?: () => void;
    sendSocketMessage: (x: string, y: any) => void;
}

const dropDownList: iDropdownItem[] = [];

const ConversationInterface: FC<iConversationInterfaceProps> = ({
    selectedFriend,
    showEntityListDrawer,
    sendSocketMessage,
}) => {
    const userDetails: any = useSelector(
        (state: RootState) => state.user.userDetails,
    );
    const chats: any = useSelector((state: RootState) => state.chats.chats);
    const chatsAddedAction: any = useSelector(
        (state: RootState) => state.chats.chatsAddedAction,
    );
    const fullyLoadedChats = useSelector(
        (state: RootState) => state.chats.fullyLoadedChats,
    );
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const messageBlockRef = useRef<HTMLDivElement>(null);
    const topIndicatorRef = useRef<HTMLParagraphElement>(null);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [scrolledToTop, setScrolledToTop] = useState<boolean>(false);
    const [canLoadChatHistory, setCanLoadChatHistory] =
        useState<boolean>(false);

    const handleMessageInputChange = (
        event: ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const { value } = event.target;
        setInputMessage(value);
    };

    const sendMessage = () => {
        if (inputMessage.length > 0) {
            const data = {
                fromId: userDetails.userId,
                toId: selectedFriend.userId,
                content: inputMessage,
            };
            sendSocketMessage(SOCKET_MESSAGE_TYPES.messageToFriend, data);
            setInputMessage("");
        }
    };

    const insertNewLineInInputMessage = () => {
        const messageInput = textAreaRef.current;
        if (messageInput) {
            const { selectionStart, selectionEnd } = messageInput;
            setInputMessage((prevInputMessage: string) => {
                const updatedMessageText =
                    prevInputMessage.slice(0, selectionStart) +
                    "\n" +
                    prevInputMessage.slice(selectionEnd);
                return updatedMessageText;
            });
        }
    };

    const handleMessageInputShortcuts = (
        event: KeyboardEvent<HTMLTextAreaElement>,
    ) => {
        const downKey = event.key.toLowerCase();

        if (
            event.shiftKey &&
            downKey === "enter" &&
            !event.ctrlKey &&
            !event.altKey &&
            !event.metaKey
        ) {
            event.preventDefault();
            insertNewLineInInputMessage();
        }

        if (
            downKey === "enter" &&
            !event.shiftKey &&
            !event.ctrlKey &&
            !event.altKey &&
            !event.metaKey
        ) {
            event.preventDefault();
            sendMessage();
        }
    };

    const loadMoreChatHistory = () => {
        console.log();
        if (
            selectedFriend &&
            !fullyLoadedChats.includes(selectedFriend.userId)
        ) {
            const data = {
                friendId: selectedFriend.userId,
            };
            sendSocketMessage(SOCKET_MESSAGE_TYPES.loadHistoricalChat, data);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setScrolledToTop(true);
                } else {
                    setScrolledToTop(false);
                }
            },
            {
                root: messageBlockRef.current,
                threshold: 1.0,
            },
        );

        if (topIndicatorRef.current) {
            observer.observe(topIndicatorRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (messageBlockRef.current && chatsAddedAction === "append") {
            messageBlockRef.current.scrollTop =
                messageBlockRef.current.scrollHeight;
            setCanLoadChatHistory(true);
        }
    }, [selectedFriend]);

    useEffect(() => {
        if (scrolledToTop && canLoadChatHistory) {
            loadMoreChatHistory();
        }
    }, [scrolledToTop]);

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
            <div className={styles.messagesBlock} ref={messageBlockRef}>
                <p id="topIndicator" ref={topIndicatorRef} />
                {selectedFriend &&
                chats[selectedFriend.userId] &&
                Object.entries(chats[selectedFriend.userId]).length > 0 ? (
                    Object.entries(chats[selectedFriend.userId])
                        .sort(([date1, value1], [date2, value2]) => {
                            let a = new Date(date1);
                            let b = new Date(date2);
                            return a.getTime() - b.getTime();
                        })
                        .map(
                            ([date, messages]: [
                                string,
                                Array<CHAT_MESSAGE_FOR_DISPLAY>,
                            ]) => {
                                let groupMessages: boolean = false;
                                let prevDisplayedMessageUserId: number | null =
                                    null;
                                return (
                                    <div
                                        key={date}
                                        className={styles.messagesOnADate}
                                    >
                                        <p className={styles.messagesDate}>
                                            {formatDate(
                                                new Date(date),
                                                "dd mmm yyyy",
                                            )}
                                        </p>
                                        {messages.map((message) => {
                                            const {
                                                isUser,
                                                content,
                                                messageId,
                                                sentTime,
                                            } = message;
                                            const currentDisplayingMessageUserId =
                                                isUser
                                                    ? userDetails.userId
                                                    : selectedFriend.userId;
                                            if (!prevDisplayedMessageUserId) {
                                                prevDisplayedMessageUserId =
                                                    currentDisplayingMessageUserId;
                                            } else {
                                                if (
                                                    prevDisplayedMessageUserId ===
                                                    currentDisplayingMessageUserId
                                                ) {
                                                    groupMessages = true;
                                                } else {
                                                    groupMessages = false;
                                                    prevDisplayedMessageUserId =
                                                        currentDisplayingMessageUserId;
                                                }
                                            }
                                            return (
                                                <div
                                                    className={`${styles.messageOuterContainer} ${isUser ? styles.userMessageContainer : styles.friendMessageContainer} ${groupMessages ? styles.groupMessage : styles.singleMessage}`}
                                                    key={messageId}
                                                >
                                                    <div
                                                        className={
                                                            styles.messageInnerContainer
                                                        }
                                                    >
                                                        {!groupMessages ? (
                                                            <p
                                                                className={
                                                                    styles.userName
                                                                }
                                                            >
                                                                {isUser
                                                                    ? "You"
                                                                    : selectedFriend.fullName}
                                                            </p>
                                                        ) : (
                                                            ""
                                                        )}
                                                        <p
                                                            className={`${styles.message} ${isUser ? styles.userMessage : styles.friendMessage}`}
                                                        >
                                                            <span
                                                                className={
                                                                    styles.messageText
                                                                }
                                                            >
                                                                {content}
                                                            </span>
                                                            <span
                                                                className={
                                                                    styles.messageTime
                                                                }
                                                            >
                                                                {sentTime}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
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
                        onChange={handleMessageInputChange}
                        value={inputMessage}
                        onKeyDown={handleMessageInputShortcuts}
                        placeholder="Message"
                        ref={textAreaRef}
                    />
                    <button
                        type="button"
                        className={styles.sendButton}
                        disabled={!selectedFriend}
                        onClick={() => {
                            sendMessage();
                        }}
                    >
                        <Send styles={styles.sendIcon} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ConversationInterface;

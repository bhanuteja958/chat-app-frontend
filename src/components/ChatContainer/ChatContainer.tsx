"use client";
import { FC, useEffect, useState } from "react";
import ConversationInterface from "../ConversationInterface/ConversationInterface";
import styles from "./ChatContainer.module.scss";
import Portal from "../Portal/Portal";
import ChatEntityList from "../ChatEntityList/ChatEntityList";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import useSocket from "../../hooks/useSocket";
import { UI_STATUS } from "../../common/constants";

const ChatContainer: FC<{}> = () => {
    const [showEntityListDrawer, setShowEntityListDrawer] =
        useState<boolean>(true);
    const [currentChatFriend, setCurrentChatFriend] =
        useState<iFriendDetails | null>(null);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const { initiateSocketConnection, sendUIStatus, sendSocketMessage } =
        useSocket();

    useEffect(() => {
        if (isLoggedIn) {
            initiateSocketConnection();
        }
    }, [isLoggedIn]);

    return (
        <div className={styles.chatContainer}>
            <ConversationInterface
                selectedFriend={currentChatFriend}
                showEntityListDrawer={() => {
                    setShowEntityListDrawer(true);
                }}
                sendSocketMessage={sendSocketMessage}
            />
            {showEntityListDrawer ? (
                <Portal>
                    <div className={styles.chatEntityListDrawer}>
                        <ChatEntityList
                            closeChatEntityList={() => {
                                setShowEntityListDrawer(false);
                                if (currentChatFriend) {
                                    sendUIStatus({
                                        status: UI_STATUS.openedFriendChat,
                                        friendId: currentChatFriend.userId,
                                    });
                                }
                            }}
                            selectFriendForChat={(friend: iFriendDetails) => {
                                setCurrentChatFriend(friend);
                                setShowEntityListDrawer(false);
                                sendUIStatus({
                                    status: UI_STATUS.openedFriendChat,
                                    friendId: friend.userId,
                                });
                            }}
                            sendUIStatus={sendUIStatus}
                        />
                    </div>
                </Portal>
            ) : (
                ""
            )}
        </div>
    );
};

export default ChatContainer;

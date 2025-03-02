"use client";
import { FC, useState } from "react";
import ConversationInterface from "../ConversationInterface/ConversationInterface";
import styles from "./ChatContainer.module.scss";
import Portal from "../Portal/Portal";
import ChatEntityList from "../ChatEntityList/ChatEntityList";

const ChatContainer: FC<{}> = () => {
    const [showEntityListDrawer, setShowEntityListDrawer] =
        useState<boolean>(true);

    const toggleEntityListDrawer = (value: boolean) => {
        setShowEntityListDrawer(value);
    };
    return (
        <div className={styles.chatContainer}>
            <ConversationInterface
                name="Alex"
                onlineStatus="true"
                userPic={null}
                showEntityListDrawer={() => {
                    setShowEntityListDrawer(true);
                }}
            />
            <Portal>
                {showEntityListDrawer ? (
                    <div className={styles.chatEntityListDrawer}>
                        <ChatEntityList
                            closeChatEntityList={() => {
                                setShowEntityListDrawer(false);
                            }}
                        />
                    </div>
                ) : (
                    ""
                )}
            </Portal>
        </div>
    );
};

export default ChatContainer;

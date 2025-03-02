"use client";
import { FC } from "react";
import ChatEntityCard from "../ChatEntityCard/ChatEntityCard";
import styles from "./ChatEntityList.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import { debounce } from "../../common/helper";
import KebabMenu from "../KebabMenu/KebabMenu";
import Close from "../SVG/Close";

const dropDownList: iDropdownItem[] = [
    {
        name: "Users",
        link: "/chat/users",
    },
    {
        name: "Groups",
        link: "/chat/groups",
    },
    {
        name: "Settings",
        link: "/profile",
    },
];

interface iChatEntityListProps {
    closeChatEntityList?: () => void;
}

const ChatEntityList: FC<iChatEntityListProps> = ({ closeChatEntityList }) => {
    const filterEntities = (value: string) => {
        // yet to code functionality
    };

    return (
        <section className={styles.chatEntityListContainer}>
            <div className={styles.chatEntityListHeader}>
                <div className={styles.chatEntityListHeaderLeft}>
                    <div
                        className={styles.closeIconContainer}
                        onClick={closeChatEntityList}
                    >
                        <Close styles={styles.closeIcon} />
                    </div>
                    <SearchInput
                        processSearchValue={debounce(filterEntities, 500)}
                    />
                </div>

                <KebabMenu dropdownItems={dropDownList} />
            </div>
            <div className={styles.chatEntityList}>
                <ChatEntityCard
                    name="alex"
                    unseenMessageCount={2}
                    userPic={null}
                    isOnline={true}
                    lastSeenTime="6:30 PM"
                    latestMessage="Hello World"
                />
                <ChatEntityCard
                    name="alex"
                    unseenMessageCount={2}
                    userPic={null}
                    isOnline={true}
                    lastSeenTime="6:30 PM"
                    latestMessage="Hello World"
                />
                <ChatEntityCard
                    name="alex"
                    unseenMessageCount={2}
                    userPic={null}
                    isOnline={true}
                    lastSeenTime="6:30 PM"
                    latestMessage="Hello World"
                />
                <ChatEntityCard
                    name="alex"
                    unseenMessageCount={2}
                    userPic={null}
                    isOnline={true}
                    lastSeenTime="6:30 PM"
                    latestMessage="Hello World"
                />
                <ChatEntityCard
                    name="alex"
                    unseenMessageCount={2}
                    userPic={null}
                    isOnline={true}
                    lastSeenTime="6:30 PM"
                    latestMessage="Hello World"
                />
                <ChatEntityCard
                    name="alex"
                    unseenMessageCount={2}
                    userPic={null}
                    isOnline={true}
                    lastSeenTime="6:30 PM"
                    latestMessage="Hello World"
                />
                <ChatEntityCard
                    name="alex"
                    unseenMessageCount={2}
                    userPic={null}
                    isOnline={true}
                    lastSeenTime="6:30 PM"
                    latestMessage="Hello World"
                />
                <ChatEntityCard
                    name="alex"
                    unseenMessageCount={2}
                    userPic={null}
                    isOnline={true}
                    lastSeenTime="6:30 PM"
                    latestMessage="Hello World"
                />
                <ChatEntityCard
                    name="alex"
                    unseenMessageCount={2}
                    userPic={null}
                    isOnline={true}
                    lastSeenTime="6:30 PM"
                    latestMessage="Hello World"
                />
            </div>
        </section>
    );
};

export default ChatEntityList;

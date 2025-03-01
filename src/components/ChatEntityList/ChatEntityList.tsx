"use client";
import { FC } from "react";
import ChatEntityCard from "../ChatEntityCard/ChatEntityCard";
import styles from "./ChatEntityList.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import { debounce } from "../../common/helper";
import KebabMenu from "../KebabMenu/KebabMenu";

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

const ChatEntityList: FC<{}> = () => {
    const filterEntities = (value: string) => {
        // yet to code functionality
    };

    return (
        <section className={styles.chatEntityListContainer}>
            <div className={styles.chatEntityListHeader}>
                <SearchInput
                    processSearchValue={debounce(filterEntities, 500)}
                />
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
            </div>
        </section>
    );
};

export default ChatEntityList;

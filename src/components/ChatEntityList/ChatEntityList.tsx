"use client";
import { FC, useMemo, useState } from "react";
import ChatEntityCard from "../ChatEntityCard/ChatEntityCard";
import styles from "./ChatEntityList.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import { debounce } from "../../common/helper";
import KebabMenu from "../KebabMenu/KebabMenu";
import Close from "../SVG/Close";
import AddFriendModal from "../AddFriendModal/AddFriendModal";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../state/slices/userSlice";
import { AppDispatch, RootState } from "../../state/store";
import { useRouter } from "next/navigation";

interface iChatEntityListProps {
    closeChatEntityList?: () => void;
}

const ChatEntityList: FC<iChatEntityListProps> = ({ closeChatEntityList }) => {
    const [showAddFriendModal, setShowAddFriendModal] =
        useState<boolean>(false);
    const dispatch: AppDispatch = useDispatch();
    const isLoggedIn: boolean = useSelector(
        (state: RootState) => state.user.isLoggedIn,
    );
    const router = useRouter();
    const dropDownList: iDropdownItem[] = useMemo(
        () => [
            {
                name: "Users",
                link: "/chat/users",
            },
            {
                name: "Add Friend",
                handler: () => {
                    setShowAddFriendModal(true);
                },
            },
            {
                name: "Settings",
                link: "/profile",
            },
            {
                name: "Logout",
                handler: async () => {
                    await dispatch(logoutUser());
                    if (!isLoggedIn) {
                        router.replace("/login");
                    }
                },
            },
        ],
        [],
    );

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
            {showAddFriendModal ? (
                <AddFriendModal
                    closeHandler={() => {
                        setShowAddFriendModal(false);
                    }}
                />
            ) : (
                ""
            )}
        </section>
    );
};

export default ChatEntityList;

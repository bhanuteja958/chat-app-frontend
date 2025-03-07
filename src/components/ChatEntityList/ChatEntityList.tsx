"use client";
import { FC, useEffect, useMemo, useState } from "react";
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
import { getAllFriends } from "../../state/slices/friendsSlice";
import CircularLoader from "../CirculatLoader/CircularLoader";

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
    const friendsList: Array<any> = useSelector(
        (state: RootState) => state.friends.friendsList,
    );
    const friendsLoading: boolean = useSelector(
        (state: RootState) => state.friends.friendsLoading,
    );

    const router = useRouter();

    const dropDownList: iDropdownItem[] = useMemo(
        () => [
            // {
            //     name: "Users",
            //     link: "/chat/users",
            // },
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
                    console.log(isLoggedIn);
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

    useEffect(() => {
        if (isLoggedIn && friendsList.length === 0) {
            dispatch(getAllFriends());
        }
    }, [isLoggedIn]);

    return (
        <section className={styles.chatEntityListContainer}>
            {friendsLoading ? (
                <div className={styles.loader}>
                    <CircularLoader text="Loading Friends" />
                </div>
            ) : (
                <>
                    <div className={styles.chatEntityListHeader}>
                        <div className={styles.chatEntityListHeaderLeft}>
                            <div
                                className={styles.closeIconContainer}
                                onClick={closeChatEntityList}
                            >
                                <Close styles={styles.closeIcon} />
                            </div>
                            <SearchInput
                                processSearchValue={debounce(
                                    filterEntities,
                                    500,
                                )}
                            />
                        </div>
                        <KebabMenu dropdownItems={dropDownList} />
                    </div>
                    <div className={styles.chatEntityList}>
                        {friendsList.length === 0 ? (
                            <p className={styles.noFriendsText}>
                                No friends yet. Add now
                            </p>
                        ) : (
                            friendsList.map((friend) => {
                                const { fullName, profilePic } = friend;
                                return (
                                    <ChatEntityCard
                                        name={fullName}
                                        userPic={profilePic}
                                        isOnline={true}
                                        key={friend.userId}
                                    />
                                );
                            })
                        )}
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
                </>
            )}
        </section>
    );
};

export default ChatEntityList;

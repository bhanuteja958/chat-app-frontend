import { FC } from "react";
import styles from "./AddFriendModal.module.scss";
import ModalConatainer from "../ModalContainer/ModalContainer";
import Portal from "../Portal/Portal";
import SearchInput from "../SearchInput/SearchInput";
import { debounce } from "../../common/helper";
import ChatEntityPic from "../ChatEntityPic/ChatEntityPic";

const users = [
    {
        name: "Alex",
        email: "alex@gmail.com",
    },
    {
        name: "Barton",
        email: "barton@gmail.com",
    },
    {
        name: "Raul",
        email: "raul@gmail.com",
    },
    {
        name: "Omar",
        email: "omar@gmail.com",
    },
    {
        name: "Omar",
        email: "omar@gmail.com",
    },
    {
        name: "Omar",
        email: "omar@gmail.com",
    },
];

interface iAddFriendModalProps {
    closeHandler: () => void;
}

const AddFriendModal: FC<iAddFriendModalProps> = ({ closeHandler }) => {
    const fetchUsersBySearchValue = debounce(() => {
        // yet to write the logic
    }, 500);

    return (
        <Portal>
            <ModalConatainer title="Add a Friend" closeHandler={closeHandler}>
                <div className={styles.addFriendContainer}>
                    <div className={styles.addFriendHeader}>
                        <SearchInput
                            processSearchValue={fetchUsersBySearchValue}
                        />
                    </div>
                    <div className={styles.usersList}>
                        {users.map((user) => {
                            return (
                                <div
                                    className={styles.userCardContainer}
                                    key={user.email}
                                >
                                    <div className={styles.userDetails}>
                                        <ChatEntityPic
                                            userPic={null}
                                            isOnline={false}
                                            size={50}
                                        />
                                        <div className={styles.userInfo}>
                                            <p className={styles.userName}>
                                                {user.name}
                                            </p>
                                            <p className={styles.userEmail}>
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className={styles.addButton}
                                    >
                                        + Add
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </ModalConatainer>
        </Portal>
    );
};

export default AddFriendModal;

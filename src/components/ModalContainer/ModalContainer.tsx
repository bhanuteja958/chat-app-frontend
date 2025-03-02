import { FC, ReactNode } from "react";
import styles from "./ModalContainer.module.scss";
import Close from "../SVG/Close";

interface iModalContainerProps {
    title: string;
    closeHandler: () => void;
    children: ReactNode;
}

const ModalConatainer: FC<iModalContainerProps> = ({
    title,
    children,
    closeHandler,
}) => {
    return (
        <div className={styles.modalOuterContainer}>
            <div className={styles.modalInnerContainer}>
                <div className={styles.modalHeader}>
                    <p className={styles.modalTitle}>{title}</p>
                    <div
                        className={styles.closeIconContainer}
                        onClick={closeHandler}
                    >
                        <Close styles={styles.closeIcon} />
                    </div>
                </div>
                <div className={styles.modalBody}>{children}</div>
            </div>
        </div>
    );
};

export default ModalConatainer;

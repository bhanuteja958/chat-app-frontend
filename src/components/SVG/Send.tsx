import { FC } from "react";

const Send: FC<iSVGProps> = ({ styles }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
            className={styles}
        >
            <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
        </svg>
    );
};

export default Send;

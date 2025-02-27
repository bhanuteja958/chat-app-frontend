import React, { FC } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";

interface iHeaderProps {
    isLoginPage?: boolean;
}

const Header: FC<iHeaderProps> = ({ isLoginPage }) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <Link href="/" className={styles.logo}>
                    YouTalk
                </Link>
            </div>
            <nav className={styles.headerRight}>
                {!isLoginPage ? (
                    <Link href={"/login"} className={styles.headerButton}>
                        Login
                    </Link>
                ) : (
                    ""
                )}
            </nav>
        </header>
    );
};

export default Header;

"use client";
import React, { FC } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

interface iHeaderProps {
    isLoginPage?: boolean;
}

const Header: FC<iHeaderProps> = ({ isLoginPage }) => {
    const isLoggedIn: boolean = useSelector(
        (state: RootState) => state.user.isLoggedIn,
    );
    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <Link href="/" className={styles.logo}>
                    YouTalk
                </Link>
            </div>
            <nav className={styles.headerRight}>
                <>
                    {!isLoginPage && !isLoggedIn ? (
                        <Link href={"/login"} className={styles.headerButton}>
                            Login
                        </Link>
                    ) : (
                        ""
                    )}
                </>
            </nav>
        </header>
    );
};

export default Header;

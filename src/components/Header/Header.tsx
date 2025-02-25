import React from "react";
import styles from "./Header.module.scss";
import Link from "next/link";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <p className={styles.logo}>YouTalk</p>
            </div>
            <nav className={styles.headerRight}>
                <Link href={"/"} className={styles.headerButton}>
                    Login
                </Link>
            </nav>
        </header>
    );
};

export default Header;

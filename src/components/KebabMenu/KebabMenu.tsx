"use client";
import { FC, MouseEvent, useEffect, useState } from "react";
import styles from "./KebabMenu.module.scss";
import VerticalDots from "../SVG/VerticalDots";
import Link from "next/link";

interface iKebabMenuProps {
    dropdownItems: iDropdownItem[];
}

const KebabMenu: FC<iKebabMenuProps> = ({ dropdownItems }) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const closeDropDown = () => {
        setShowDropdown(false);
    };

    useEffect(() => {
        window.addEventListener("click", closeDropDown);

        return () => {
            window.removeEventListener("click", closeDropDown);
        };
    }, []);
    return (
        <div className={styles.kebabMenuContainer}>
            <p
                className={styles.kebabIconContainer}
                onClick={(event: MouseEvent<HTMLElement>) => {
                    event.stopPropagation();
                    setShowDropdown((prevValue) => !prevValue);
                }}
            >
                <VerticalDots styles={styles.kebabIcon} />
            </p>
            {showDropdown ? (
                <ul className={styles.kebabDropdown}>
                    {dropdownItems.map((item: iDropdownItem) => {
                        if (item.link) {
                            return (
                                <li
                                    className={styles.kebabDropdownItem}
                                    key={`${item.name}-kebab`}
                                >
                                    <Link
                                        href={item.link}
                                        className={styles.kebabDropdownLink}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        }

                        if (item.handler) {
                            return (
                                <li
                                    className={styles.kebabDropdownItem}
                                    onClick={item.handler}
                                >
                                    {item.name}
                                </li>
                            );
                        }
                    })}
                </ul>
            ) : (
                ""
            )}
        </div>
    );
};

export default KebabMenu;

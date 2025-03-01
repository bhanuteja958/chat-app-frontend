"use client";
import { ChangeEvent, FC, useState } from "react";
import styles from "./SearchInput.module.scss";
import Search from "../SVG/Search";
import { debounce } from "../../common/helper";

interface SearchInputProps {
    processSearchValue: (x: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ processSearchValue }) => {
    const [searchValue, setSearchValue] = useState<string>("");

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchValue(value);
        processSearchValue(value);
    };

    return (
        <div className={styles.searchInputContainer}>
            <Search styles={styles.searchIcon} />
            <input
                name="search"
                type="text"
                value={searchValue}
                onChange={changeHandler}
                placeholder="Search for people"
                className={styles.searchInput}
            />
        </div>
    );
};

export default SearchInput;

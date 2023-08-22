import React, { useState } from 'react';
import styles from '../styles/search.module.css';
import {useRouter} from "next/router";
import {Box} from "@mui/material";

const SearchField = ({defaultValue = ''}) => {
    const [searchQuery, setSearchQuery] = useState(defaultValue);
    const router = useRouter()

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        router.push(`/searchResult?q=${searchQuery}`)
    };

    return (
        <div className={`${styles.searchcontainer} ${styles.centered}`}>
            <Box sx={{display: 'flex'}}>
                <input
                    type="text"
                    placeholder="検索したいカテゴリを入力"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={styles.searchinput}
                />
                <button type="submit" className={styles.searchbutton} onClick={handleSearchSubmit}>検索</button>
            </Box>
        </div>
    );
}

export default SearchField;


import React, {useEffect, useState} from 'react';
import SearchField from '../components/search.js'; 
import styles from '../styles/search.module.css';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {Box, Typography} from "@mui/material";
import Link from "next/link";

const QuestionSearch = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/category`)
            .then((r) => r.json())
            .then((d) => setCategories(d))
    }, [setCategories])
    const CategoryList = () =>
        <Box sx={{m: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {categories.map((c, i) =>
                <Box key={i} sx={{width: '45%', m: 1}}>
                    <Link href={`/searchResult?c=${c.id}`}>
                        <Typography variant={"h4"}>{c.name}</Typography>
                    </Link>
                </Box>
            )}
        </Box>
    return (
        <Box sx={{backgroundColor: "#F6EEEE", color: "#2B2C34", p: 2}}>
            <Box
                sx={{maxWidth: 800, minWidth: 300, m: "auto", border: "1px #D1D1E9 solid", backgroundColor: "#FFFFFE"}}>
                <Box sx={{m: 2, textAlign: 'center'}}>
                    <h1>キーワード検索</h1>
                    <div className={styles.searchcontainer}>
                        <SearchField/>
                    </div>
                    <h1 className={styles.categori}>カテゴリ</h1>
                    <div className={styles.list}>
                        <CategoryList/>
                    </div>
                </Box>
            </Box>
        </Box>
    );
}

export default QuestionSearch;


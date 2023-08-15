import React from 'react';
import SearchField from '../components/question_search.js'; 
import styles from '../styles/QuestionSearch.module.css';

const QuestionSearch = () => {
    return (
        <div className={styles.container}>
	    <h1 className={styles.searchHeading}>キーワード検索</h1>
            <div className={styles.searchcontainer}>
                <SearchField />
            </div>
            <h1 className={styles.categori}>カテゴリ</h1>
            <div className={styles.list}>
                <div className={styles.left_list}>
                    <p>・K-pop</p>
                    <p>・J-pop</p>
                    <p>・洋楽</p>
                    <p>・料理</p>
                    <p>・ニュース</p>
                </div>
                <div className={styles.right_list}>
                    <p>・スポット</p>
                    <p>・神社</p>
                    <p>・ダンス</p>
                    <p>・アイドルグループ</p>
                    <p>・釣り</p>
                </div>
            </div>
        </div>
    );
}

export default QuestionSearch;


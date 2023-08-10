import React, { useState } from 'react';
import styles from '../styles/QuestionSearch.module.css';

const QuestionSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // 検索処理を実行するロジックを追加
    };

    return (
        <div className={styles.searchcontainer}>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="検索したいカテゴリを入力"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={styles.searchinput} 
                />
                <button type="submit" className={styles.searchbutton}>検索</button>
            </form>
        </div>
    );
}

export default QuestionSearch;


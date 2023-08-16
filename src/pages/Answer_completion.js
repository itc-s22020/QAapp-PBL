import React from 'react';
import styles from '../styles/Answer_completion.module.css'; 
import Link from 'next/link'

const Answer = () => {
    return (
            
        <div className={styles.center_content}>
            <h1 className={styles.centerText}>回答を投稿しました</h1>
	    <Link href="/index">
            <button className={styles.center_button}>質問ページに戻る</button> 
	    </Link>
        </div>
    );
}
export default Answer; 

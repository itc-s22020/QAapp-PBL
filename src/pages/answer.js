import React from 'react';
import styles from '../styles/answer.module.css';
import Link from 'next/link'
import {useRouter} from "next/router";

const Answer = () => {
    const router = useRouter()
    if (!router.isReady) {
        return
    }
    const {q_id} = router.query
    if (!q_id) {
        router.push('/')
        return
    }
    return (

        <div className={styles.center_content}>
            <h1 className={styles.centerText}>回答を投稿しました</h1>
	    <Link href={`/question/${q_id}`}>
            <button className={styles.center_button}>質問ページに戻る</button>
	    </Link>
        </div>
    );
}
export default Answer; 

import React from 'react';
import styles from '../styles/profileanswer.module.css'; 

const AnswerProfile = () => {
  return (
    <div className={styles.box1}>
      <h2 className={styles.h2}>最近の回答</h2>
      <hr className={styles.horizontalLine} />	  
    <div className={styles.botam}>	  
      <button className={`${styles.button} ${styles.button01}`}>全ての投稿を見る</button>
    </div>
    </div>
  );
};

export default AnswerProfile;


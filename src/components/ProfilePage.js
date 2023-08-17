import React from 'react';
import styles from '../styles/profilepage.module.css';

const ProfilePage = () => {
  const name = "中山で〜〜す！" 
  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_content}>
	<div className={styles.hanako01}>
	<div className={styles.iconContainer}>
	     <div className={styles.catches01}>
	     <div className={styles.icon}></div>
	     </div>
	</div>  
        <h2>{name}</h2>
	</div>  
        <div className={styles.catches}><h2>プロフィール</h2></div>
	<div className={styles.hanako}> 
	<p>性別: 男性</p>
        <p>年齢: 44歳</p>
        <p>登録日: 2023/08/14</p>
	</div>  
      </div>
    </div>
  );
};

export default ProfilePage;


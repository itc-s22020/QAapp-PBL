import Link from 'next/link';
import styles from '../styles/signUp.module.css'

export default function signUp() {
  return (
    <div className={styles.container}>
      <h1>新規登録ページ</h1>
	<div className={styles.content}>
          <p>メールアドレス</p>
          <p>プロフィール名</p>
          <p>パスワード</p>
          <p>パスワード確認</p>
        </div>
    </div>
  );
}

import Link from 'next/link';
import styles from '../styles/login.module.css';
import { useState } from 'react';


export default function Login(){
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedPassword, setSelectedPassword] = useState('');

  const handleEmailChange = (e) => {
    setSelectedEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setSelectedPassword(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>ログイン</h1>
        <div className={styles.content}>
          <p>メールアドレス</p>
          <input
            className={styles.input1}
            type="e-mail"
            aria-label=".form-control-lg example"
            value={selectedEmail}
            onChange={handleEmailChange}
            required
          />
          <p>パスワード</p>
          <input
            className={styles.input2}
            type="password"
            aria-label=".form-control-lg example"
            value={selectedPassword}
            onChange={handlePasswordChange}
            required
          />
	</div>
        <div className={styles.footer}>
          <Link href="/login">
            <button
              type="submit"
              id="button"
              className={styles.blueButton}
              disabled={!selectedEmail || !selectedPassword}
            >
            ログイン
            </button>
          </Link>
	  <Link href="/signup">
	    <div className={styles.p}>
	      <p>新規の方はこちら→</p>
	    </div>
	  </Link>
        </div>
    </div>
  )
}


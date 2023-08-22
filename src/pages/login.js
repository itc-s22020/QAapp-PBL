import Link from 'next/link';
import styles from '../styles/login.module.css';
import { useState } from 'react';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {useRouter} from "next/router";


export default function Login({setUser}){
  const router = useRouter()
  const {redirect = '/'} = router.query
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedPassword, setSelectedPassword] = useState('');
  const [error, setError] = useState('')

  const handleEmailChange = (e) => {
    setSelectedEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setSelectedPassword(e.target.value);
  };

  const handleLogin = () => {
    const data = {
      user_id: selectedEmail,
      password: selectedPassword
    }
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/login`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
        .then((r) => {
          if (r.status === 200) {
            return r.json()
          } else {
            r.json().then((d) => setError(d.message))
          }
        }).then((d) => {
          if (!d) return
          setUser(selectedEmail)
          router.push(redirect)
    })
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>ログイン</h1>
        <div className={styles.content}>
          <p className={styles.error}>{error}</p>
          <p>ユーザーID</p>
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
          <button
              type="submit"
              id="button"
              className={styles.blueButton}
              disabled={!selectedEmail || !selectedPassword}
              onClick={handleLogin}
          >
            ログイン
          </button>
	  <Link href="/signup">
	    <div className={styles.p}>
	      <p>新規の方はこちら→</p>
	    </div>
	  </Link>
        </div>
    </div>
  )
}
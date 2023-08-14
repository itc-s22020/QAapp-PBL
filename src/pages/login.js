import styles from '../styles/login.module.css'
export default function login(){
  return(
    <div>
      <h1>ログイン</h1>
      <p>メールアドレス</p>
	<input
	  className="form-control form-control-lg"
	  type="text" 
	  aria-label=".form-control-lg example"
	  required
	/>
      <p>パスワード</p>
	<input
	  className="form-control form-control-lg"
	  type="text" 
	  aria-label=".form-control-lg example"
	  required
	/>
      <button className={styles.button}>ログイン</button>
    </div>
  );
}

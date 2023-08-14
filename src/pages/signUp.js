import Link from 'next/link';
import styles from '../styles/signUp.module.css'
import { useState } from 'react';

export default function signUp() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>新規登録ページ</h1>
	<div className={styles.content}>
          <p>メールアドレス</p>
	  <input
	    className={styles.input1}
	    type="text"
	    aria-label=".form-control-lg example"
	    required
	  />
          <p>プロフィール名</p>
	  <input
	    className={styles.input2}
	    type="text" 
	    aria-label=".form-control-lg example"
	    required
	  />
          <p>パスワード</p>
	  <input
	    className={styles.input3}
	    type="text"
	    aria-label=".form-control-lg example"
	    required
	  />
          <p>パスワード確認</p>
	  <input
	    className={styles.input4}
	    type="text"
	    aria-label=".form-control-lg example"
	    required
	  />
	  <p>性別</p>
	  <div className="form-check form-check-inline">
            <input
	      className="form-check-input"
	      type="radio"
	      name="inlineRadioOptions"
	      id="inlineRadio1"
	      value="option1"
	    />
            <label
	      className="form-check-label"
	      for="inlineRadio1">男性
	    </label>
	  </div>

	  <div className="form-check form-check-inline">
            <input
	    className="form-check-input"
	    type="radio"
	    name="inlineRadioOptions"
	    id="inlineRadio2" 
	    value="option2"
	  />
            <label
	    className="form-check-label"
	    for="inlineRadio2">女性
	    </label>
          </div>
	  <div className="form-check form-check-inline">
            <input 
	      className="form-check-input"
	      type="radio"
	      name="inlineRadioOptions"
	      id="inlineRadio2"
	      value="option2"
	    />
            <label
	      className="form-check-label"
	      for="inlineRadio2">無回答
	    </label>
	  </div>
	  <p>生年月日</p>
	  <form>
	    <label>
	      <select value={selectedOption} onChange={handleOptionChange}>
	        <option value="option1">選択肢1</option>
	        <option value="option2">選択肢2</option>
	      </select>
	      <select value={selectedOption} onChange={handleOptionChange}>
                <option value="option1">選択肢3</option>
                <option value="option2">選択肢4</option>
              </select>
              <select value={selectedOption} onChange={handleOptionChange}>
                <option value="option1">選択肢5</option>
                <option value="option2">選択肢6</option>
              </select>
	    </label>
	  </form>
	</div>
	<div className={styles.footer}>
          <Link href="/login">
            <button className={styles.button}>ログイン</button>
          </Link>
        </div>
    </div>
  );
}

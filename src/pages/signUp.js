import Link from 'next/link';
import styles from '../styles/signUp.module.css'
import { useState } from 'react';
import axios from "axios"

export default function signUp() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedPassword, setSelectedPassword] = useState('');
  const [selectedPasswordconfirmation, setSelectedPasswordconfirmation] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

/*  fetch(`${API_HOST}/api/user/check`, {credentials: 'include'})
    .then((r) => r.json())
    .then((d) => {
        console.log(`${d.user}としてログインしています`)
    })*/

  const StartYear = 1970;
  const endYear = 2023;

  const months = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月' ,'11月' ,'12月'
  ];
  
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  const years = Array.from({ length: endYear - StartYear + 1 }, (_, index) => StartYear + index);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleEmailChange = (e) => {
    setSelectedEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setSelectedPassword(e.target.value);
  };

  const handlePasswordconfirmationChange = (e) => {
    setSelectedPasswordconfirmation(e.target.value);
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (selectedPassword !== selectedPasswordconfirmation){
	    return
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>新規登録</h1>
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
          <p>プロフィール名</p>
	  <input
	    className={styles.input2}
	    type="name" 
	    aria-label=".form-control-lg example"
	    value={selectedName}
	    onChange={handleNameChange}
	    required
	  />
          <p>パスワード</p>
	  <input
	    className={styles.input3}
	    type="password"
	    aria-label=".form-control-lg example"
	    value={selectedPassword}
	    onChange={handlePasswordChange}
	    required
	  />
          <p className={styles.confirmation}>パスワード確認</p>
	  <input
	    className={styles.input4}
	    type="password"
	    aria-label=".form-control-lg example"
            value={selectedPasswordconfirmation}
            onChange={handlePasswordconfirmationChange}
	    required
	  />
	  {selectedPassword !== selectedPasswordconfirmation && (
	    <p className={styles.errorText}>パスワードが一致しません</p>
	  )}
	  <p>性別</p>
	  <div className={styles.to1}>
            <input
	      className={styles.button}
	      type="radio"
	      name="inlineRadioOptions"
	      id="inlineRadio1"
	      value="男性"
	      required
	      onChange={handleGenderChange}
	    />
            <label
	      className={styles.label1}
	      htmlFor="inlineRadio1">男性
	    </label>
              <input
                className={styles.button}
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="女性"
                required
                onChange={handleGenderChange}
              />
              <label
              className={styles.lavel2}
              htmlFor="inlineRadio2">女性
              </label>
            <input
              className={styles.button}
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              value="無回答"
              required
              onChange={handleGenderChange}
            />
            <label
              className={styles.lavel3}
              htmlFor="inlineRadio3">無回答
            </label>
	  </div>
	  <div className={`${styles.birthDateContainer}`}>
	    <p>生年月日</p>
	    <div className={`${styles.option1}`}>
	      <select value={selectedYear} onChange={handleYearChange}>
	        <option value="">年</option>
	        {years.map((year) => (
		  <option key={year} value={year}>
	            {year}年
	          </option>
	        ))}
	      </select>
              <select value={selectedMonth} onChange={handleMonthChange}>
                <option value="">月</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                 ))}
              </select>
              <select value={selectedDay} onChange={handleDayChange}>
                <option value="">日</option>
                {days.map((day, index) => (
                  <option key={index} value={day}>
                    {day}日
                  </option>
                 ))}
               </select>
	    </div>
	  </div>
	</div>
        <div className={styles.footer}>
	  <Link href="/Login">
            <button
	      type="submit"
	      id="button"
	      className={styles.blueButton}
	      disabled={!selectedEmail || !selectedName || !selectedPassword  || !selectedGender || !selectedYear || !selectedMonth || !selectedDay}
	    >
	    新規登録
	    </button>
	  </Link>
        </div>
    </div>
 );
}

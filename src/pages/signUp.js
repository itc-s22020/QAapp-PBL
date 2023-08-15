import Link from 'next/link';
import styles from '../styles/signUp.module.css'
import { useState } from 'react';

export default function signUp() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const StartYear = 1970;
  const endYear = 2023;

  const months = [
    '１月', '２月', '３月', '４月', '５月', '６月',
    '７月', '８月', '９月', '１０月' ,'１１月' ,'１２月'
  ];
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31
  ];

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

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
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
	      htmlFor="inlineRadio1">男性
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
	    htmlFor="inlineRadio2">女性
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
	      htmlFor="inlineRadio2">無回答
	    </label>
	  </div>
	  <p>生年月日</p>
	  <div>
	    <select value={selectedYear} onChange={handleYearChange}>
	      <option value="">年</option>
	      {years.map((year) => (
		<option key={year} value={year}>
	          {year}
	        </option>
	      ))}
	    </select>
	  </div>
	  <div>
            <select value={selectedMonth} onChange={handleMonthChange}>
	      <option value="">月</option>
	      {months.map((month, index) => (
		<option key={index} value={month}>
		  {month}
		</option>
	       ))}
	    </select>
	  </div>
	  <div>
	    <select value={selectedDay} onChange={handleDayChange}>
	      <option value="">日</option>
	      {days.map((day, index) => (
		<option key={index} value={day}>
		  {day}
		</option>
	       ))}
	     </select>
	  </div>
	</div>
        <div className={styles.footer}>
          <Link href="/login">
            <button className={styles.button}>新規登録</button>
          </Link>
        </div>
    </div>
  );
}

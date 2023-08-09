import React, { useState } from 'react';

const ProfileEditPage = () => {
  const 初期プロフィール = {
    名前: 'ジョン・ドウ',
    年齢: '',
    性別: '',
    メッセージ: '',
  };
  const [プロフィール, プロフィールを設定] = useState(初期プロフィール);
  const [編集完了, 編集完了を設定] = useState(false);

  const 入力変更の処理 = (e) => {
    const { name, value } = e.target;
    プロフィールを設定((前のプロフィール) => ({
      ...前のプロフィール,
      [name]: value,
    }));
  };

  const 送信の処理 = (e) => {
    e.preventDefault();
    // プロフィール情報を保存する処理を実装
    console.log('プロフィールが保存されました:', プロフィール);
    編集完了を設定(true);
  };

  return (
    <div>
      <h1>プロフィールの編集</h1>
      <form onSubmit={送信の処理}>
        <label>
          名前：
          <input
            type="text"
            name="名前"
            value={プロフィール.名前}
            onChange={入力変更の処理}
          />
        </label>
        <label>
          年齢：
          <input
            type="number"
            name="年齢"
            value={プロフィール.年齢}
            onChange={入力変更の処理}
          />
        </label>
        <label>
          性別：
          <input
            type="text"
            name="性別"
            value={プロフィール.性別}
            onChange={入力変更の処理}
          />
        </label>
        <label>
          メッセージ：
          <textarea
            name="メッセージ"
            value={プロフィール.メッセージ}
            onChange={入力変更の処理}
          />
        </label>
        <button type="submit">保存</button>
      </form>

      {編集完了 && (
        <div>
          <h2>編集完了</h2>
          <p>名前: {プロフィール.名前}</p>
          <p>年齢: {プロフィール.年齢}</p>
          <p>性別: {プロフィール.性別}</p>
          <p>メッセージ: {プロフィール.メッセージ}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileEditPage;


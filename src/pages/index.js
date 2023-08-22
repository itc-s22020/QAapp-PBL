import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import styles from '@/styles/Home.module.css'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import { formatDate } from '@/lib/formatDate';
import Link from 'next/link';


const Home = () => {
  const [alignment, setAlignment] = React.useState('new');
  const [questions, setQuestions] = React.useState([]);

  //いいね順並び替え(sort引数)
  const compareLike = (a, b) => {
    var r = 0;
    if (a.like > b.like) { r = -1 }
    else if (a.like < b.like) { r = 1 }
    return r
  }
  //日付順並び替え(sort引数)
  const compareDate = (a, b) => {
    return (formatDate(a.date) < formatDate(b.date) ? 1 : -1)
  }

  //apiデータ受け取り V{true:日付順, false:いいね順}
  const qRes = (V = false) => {
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/question`)
      .then((r) => r.json())
      .then((d) => setQuestions(d.sort(V ? compareDate : compareLike)))
  }
  React.useEffect(() => {
    qRes(true)
  }, [])

  //toggleButtonの処理
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
    if (newAlignment === "new") {
      qRes(true)
    } else {
      qRes(false)
    }
  };

  //toggleButtonの表示
  const children = [
    <ToggleButton value="new" key="left" className={styles.tb}>
      <div>新着</div>
    </ToggleButton>,
    <ToggleButton value="pop" key="right" className={styles.tb}>
      <div>人気</div>
    </ToggleButton>,
  ];

  //質問単体の表示
  const Prop = ({ q_id, title, c_name, date, like }) => (
    <div>
      <ul>
        <Link href={`/question/${q_id}`}>
          <li>title: {title}</li>
        </Link>
        <li>c_name: {c_name}</li>
        <li>date: {formatDate(date)}</li>
        <li>like: {like}</li>
      </ul>
    </div>
  );

  //質問全体の表示
  const NpProps = ({ q }) => (
    <a>
      {q.map(q => <Prop key={q.id} {...q} />)}
    </a>
  )

  //toggleButtonの設定
  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <>
      <Stack spacing={2} alignItems="center">
        <ToggleButtonGroup size="large" {...control} aria-label="Large sizes">
          {children}
        </ToggleButtonGroup>
      </Stack>
      <div>
        <NpProps q={questions} />
      </div>
    </>
  );
}
export default Home

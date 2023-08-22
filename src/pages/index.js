import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import styles from '@/styles/Home.module.css'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import { formatDate } from '@/lib/formatDate';
import Link from 'next/link';
import IconLiked from '@mui/icons-material/Favorite';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import Header from '../components/header'

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
    if (newAlignment === "new") { qRes(true) }
    else { qRes(false) }
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
    <Card sx={{ mt: 2, mb: 2 }} variant="outlined">
      <Box sx={{ m: 4 }}>
        <Link href={`/question/${q_id}`} className={styles.title} >
          <div >{title}</div>
        </Link>
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <span className={styles.cName}>{c_name}</span>
            <span className={styles.date}>{formatDate(date)}</span>
          </div>
          <Box sx={{ display: 'flex', alignItems: 'center', fontSize:24 }}>
              <IconLiked color='error' sx={{ width: 30, height: 30 }} />{like}
          </Box>
        </Box>
      </Box>
    </Card>
  );

  //質問全体の表示
  const NpProps = ({ q }) => (
    <>
      {q.map(q => <Prop key={q.id} {...q} />)}
    </>
  )

  //toggleButtonの設定
  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <>
	  <Header />
      <Box sx={{ backgroundColor: "#F6EEEE", color: "#2B2C34", p: 2 }}>
        <Box sx={{ maxWidth: 800, minWidth: 300, m: "auto", border: "1px #D1D1E9 solid", backgroundColor: "#FFFFFE" }}>
          <Box sx={{ m: 2 }}>
            <Stack spacing={2} alignItems="center" sx={{ mt: 5, mb: 5 }}>
              <ToggleButtonGroup size="large" {...control} aria-label="Large sizes">
                {children}
              </ToggleButtonGroup>
            </Stack>
            <NpProps q={questions} />
          </Box>
        </Box>
      </Box >
    </>
  );
}

export default Home

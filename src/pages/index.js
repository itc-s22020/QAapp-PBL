import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import styles from '@/styles/Home.module.css'
import { useRouter } from "next/router";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";



const Home = () => {
  const [alignment, setAlignment] = React.useState('new');
  const [props, setProps] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);

  const compareLike = (a, b) =>{
    var r = 0;
    if (a.like < b.like){ r = -1 }
    else if ( a.like > b.like ){ r = 1}
    return r
  } 

  const qRes = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/question`)
      .then((r) => r.json())
      .then((d) => setQuestions(d))
  }

  const qLikeRes = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/question`)
      .then((r) => r.json())
      .then((d) => setQuestions(d.sort(compareLike)))
  }

  React.useEffect(() => {
    qRes()
  }, [])

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
    if (newAlignment === "new") {
      qRes()
    } else {
      qLikeRes()
    }
  };

  const children = [
    <ToggleButton value="new" key="left" className={styles.tb}>
      <div>新着</div>
    </ToggleButton>,
    <ToggleButton value="pop" key="right" className={styles.tb}>
      <div>人気</div>
    </ToggleButton>,
  ];

  const Prop = ({ title, c_name, date, like }) => (
    <div>
      <ul>
        <li>title: {title}</li>
        <li>c_name: {c_name}</li>
        <li>date: {date}</li>
        <li>like: {like}</li>
      </ul>
    </div>
  );


  const NpProps = ({ q }) => (
    <a>
      {q.map(q => <Prop key={q.id} {...q} />)}
    </a>
  )

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

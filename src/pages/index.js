import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Home = () =>  {
  const [alignment, setAlignment] = React.useState('new');
  const [props, setProps] = React.useState(false);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
    if (newAlignment === "new") {
      setProps(npProps[0])
    } else {
      setProps(npProps[1])
    }
  };

  const npProps = [
    [
      <ul>
        <li>
          <a>新着記事1</a>
          <div>メッセージ1</div>
        </li>
        <li>
          <a>新着記事2</a>
          <div>メッセージ2</div>
        </li>
        <li>
          <a>新着記事3</a>
          <div>メッセージ3</div>
        </li>
      </ul>
    ],
    [
      <ul>
      <li>
        <a>人気記事1</a>
        <div>メッセージ1</div>
      </li>
      <li>
        <a>人気記事2</a>
        <div>メッセージ2</div>
      </li>
      <li>
        <a>人気記事3</a>
        <div>メッセージ3</div>
      </li>
    </ul>
    ]
  ]  

  const children = [
    <ToggleButton value="new" key="left">
      <div>新着</div>
    </ToggleButton>,
    <ToggleButton value="pop" key="right">
      <div>人気</div>
    </ToggleButton>,
  ];

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
    <div>{props ? props : npProps[0]}</div>
    </>
  );
}
export default Home
/*import styles from "@/styles/Home.module.css"
import { useState } from "react";

const Home = () => {
  const RADIO_VALUES = [["新着", true], ["人気", false]]
  const [selectedRadioBtnValue, setSelectedRadioBtnValue] = useState("")
  const onRadioBtnChanged = (e) => setSelectedRadioBtnValue(e.target.value)
  return (
    <div>
      {RADIO_VALUES.map((radioValue) => (
        <label key={radioValue[0]}>
          <input
            type="radio"
            value={radioValue[1]}
            name="sample"
            onChange={onRadioBtnChanged}
          />
          {radioValue[0]}
        </label>
      ))}
        <div>{selectedRadioBtnValue}</div>
    </div>
  )
}

export default Home
*/

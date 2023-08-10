import styles from "@/styles/Home.module.css"
import { useState } from "react";

const Home = () => {
  const RADIO_VALUES = ["新着", "人気"];
  const [selectedRadioBtnValue, setSelectedRadioBtnValue] = useState("");
  const onRadioBtnChanged = (e) => setSelectedRadioBtnValue(e.target.value);

  return (
    <>
      {RADIO_VALUES.map((radioValue) => (
        <label key={radioValue}>
          <input
            type="radio"
            value={radioValue}
            name="sample"
            onChange={onRadioBtnChanged}
          />
          {radioValue}
        </label>
      ))}
      <div>check : {selectedRadioBtnValue}</div>
    </>
  )
}

export default Home

import React from "react";
import { observer } from "mobx-react-lite";
import countdownStore from "../../store/CountdownStore";
import ActionButton from "../ActionButton";
import InputField from "../InputField";

const CountdownCard: React.FC = () => {
  const handlePlayPause = () => {
    if (countdownStore.countdownIntervalId) {
      countdownStore.pauseCountdown();
    } else {
      countdownStore.playCountdown();
    }
  };

  const onChange = (e) => {
    countdownStore.updateFromTime(e.target.value);
  };

  return (
    <>
      <InputField
        inputLabel="Countdown"
        inputValue={countdownStore.fromTime}
        onChange={onChange}
      />
      <h2>{countdownStore.countdownValue}</h2>
      <ActionButton
        buttonText={countdownStore.countdownIntervalId ? "Pause" : "Start"}
        onClick={handlePlayPause}
      />
      <ActionButton
        buttonText={"Reset"}
        onClick={countdownStore.resetCountdown}
      />
      {countdownStore.countdownValue === 0 ? <p>Time's up!</p> : null}
    </>
  );
};

export default observer(CountdownCard);

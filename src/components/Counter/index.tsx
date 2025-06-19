import React from "react";
import counterStore from "../../store/CounterStore";
import ActionButton from "../ActionButton";
import { observer } from "mobx-react-lite";

const Counter: React.FC = observer(() => {
  const { countValue, timeToResetCounter, onDecrement, onIncrement } =
    counterStore;

  return (
    <>
      <p style={{ fontSize: "30px" }}>Counter: {countValue}</p>
      <ActionButton
        buttonText={"increase"}
        onClick={onIncrement}
        style={{ margin: "8px 0" }}
      />
      <ActionButton
        buttonText={"decrease"}
        onClick={onDecrement}
        style={{ margin: "8px 0" }}
      />
      <p>Reset Counter in {timeToResetCounter}</p>
    </>
  );
});

export default Counter;

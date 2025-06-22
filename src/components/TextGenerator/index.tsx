import React from "react";
import { observer } from "mobx-react-lite";
import InputField from "../InputField";
import animatedTextStore from "../../store/AnimatedTextStore";
import ActionButton from "../ActionButton";

const TextGenerator: React.FC = () => {
  const onChange = (event) => {
    animatedTextStore.updateInput(event.target.value);
  };
  return (
    <>
      <InputField
        inputLabel="Generate Text"
        inputValue={animatedTextStore.textContent}
        onChange={onChange}
      />
      <ActionButton
        buttonText="Generate"
        onClick={() => animatedTextStore.handleGenerate()}
      />
      <>{animatedTextStore.textGenerator.join(" ")}</>
    </>
  );
};

export default observer(TextGenerator);

import React from "react";
import { observer } from "mobx-react-lite";
import InputField from "../../InputField";
import pollingStore from "../../../store/PollingStore";
import ActionButton from "../../ActionButton";

interface NewPollingType {
  id: string;
  vote: number;
  content: string;
  error?: string;
}

interface CreatePollItemProps {
  item: NewPollingType;
}

const CreatePollItem: React.FC<CreatePollItemProps> = ({ item }) => {
  const { id, content, error } = item;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    pollingStore.updateInputData(id, event.target.value);
  };

  const handleRemove = () => {
    pollingStore.removeNewPollItem(id);
  };

  return (
    <div>
      <InputField
        inputLabel=""
        inputValue={content}
        onChange={handleChange}
        errorMessage={error}
      />
      <ActionButton buttonText="Remove Option" onClick={handleRemove} />
    </div>
  );
};

export default observer(CreatePollItem);

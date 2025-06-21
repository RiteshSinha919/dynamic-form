import { observer } from "mobx-react-lite";
import React from "react";
import InputField from "../InputField";
import voteStore from "../../store/VoteStore";
import ActionButton from "../ActionButton";
import VoteItem from "./VoteItem";

const VotingCard: React.FC = () => {
  const onChange = (event) => {
    voteStore.updateInput(event.target.value);
  };
  return (
    <>
      <InputField
        inputLabel="Voter"
        onChange={onChange}
        inputValue={voteStore.inputValue}
      />
      <ActionButton buttonText="Add Voter" onClick={voteStore.addNew} />
      <ActionButton buttonText="Reset Votes" onClick={voteStore.resetVote} />
      <>
        {voteStore.voteList.map((item) => (
          <VoteItem key={item.id} item={item} />
        ))}
      </>
    </>
  );
};

export default observer(VotingCard);

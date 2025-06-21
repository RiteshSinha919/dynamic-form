import { observer } from "mobx-react-lite";
import React from "react";
import voteStore from "../../../store/VoteStore";
import { VoteType } from "../../../types/VoteType";
import ActionButton from "../../ActionButton";

const VoteItem: React.FC<VoteType> = ({ item }) => {
  const { id, voteCount, content } = item;
  const onChange = (event) => {
    voteStore.updateInput(event.target.value);
  };
  return (
    <>
      <p>{content}</p>
      <h2>{voteCount}</h2>
      <ActionButton
        buttonText="Upvote"
        onClick={() => voteStore.handleUpVote(id)}
      />
      <ActionButton
        buttonText="Downvote"
        onClick={() => voteStore.handleDownVote(id)}
      />
    </>
  );
};

export default observer(VoteItem);

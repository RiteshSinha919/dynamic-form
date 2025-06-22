import React from "react";
import { observer } from "mobx-react-lite";
import ActionButton from "../../ActionButton";
import pollingStore from "../../../store/PollingStore";
import { PollingType } from "../../../types/PollingType";

interface PollItemProps {
  item: PollingType;
  percentage: number;
  totalVotes: number;
}

const PollItem: React.FC<PollItemProps> = ({ item, percentage, totalVotes }) => {
  const { id, vote, content } = item;
  const hasVoted = pollingStore.hasUserVoted(id);
  
  const handleVote = () => {
    if (hasVoted) {
      alert('You have already voted for this option!');
      return;
    }
    pollingStore.handleVote(id);
  };

  return (
    <div>
      <h3>{content}</h3>
      
      <div>
        <p>Votes: {vote}</p>
        <p>Percentage: {percentage}%</p>
        {totalVotes > 0 && (
          <p>Vote Count: {vote} out of {totalVotes}</p>
        )}
      </div>
      
      <ActionButton 
        buttonText={hasVoted ? "Already Voted" : "Vote"} 
        onClick={handleVote}
        disabled={hasVoted}
      />
      
      {hasVoted && (
        <p>✓ You voted for this option</p>
      )}
    </div>
  );
};

export default observer(PollItem);

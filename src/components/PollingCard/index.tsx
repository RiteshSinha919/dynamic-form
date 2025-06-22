import React from "react";
import ActionButton from "../ActionButton";
import { observer } from "mobx-react-lite";
import pollingStore from "../../store/PollingStore";
import CreatePollItem from "./CreatePollItem";
import PollItem from "./PollItem";

const PollingCard: React.FC = () => {
  const { 
    showCreatePoll, 
    pollingList, 
    newPollingData, 
    getTotalVotes,
    votingPercentage 
  } = pollingStore;

  const handleCreatePoll = () => {
    const validation = pollingStore.validatePoll();
    if (validation.isValid) {
      pollingStore.createNewPoll();
    } else {
      alert(validation.message);
    }
  };

  const totalVotes = getTotalVotes();

  return (
    <div>
      <h1>Polling System</h1>
      
      {!showCreatePoll && (
        <ActionButton
          buttonText="Create New Poll"
          onClick={() => pollingStore.showNewPoll()}
        />
      )}

      {showCreatePoll && (
        <div>
          <h2>Create New Poll</h2>
          <p>Add at least 2 options for your poll:</p>
          
          {newPollingData.map((item) => (
            <CreatePollItem key={item.id} item={item} />
          ))}
          
          <div>
            <ActionButton
              buttonText="Add Another Option"
              onClick={() => pollingStore.addNewPollItem()}
            />
            <ActionButton
              buttonText="Cancel"
              onClick={() => pollingStore.cancelNewPoll()}
            />
            <ActionButton
              buttonText="Create Poll"
              onClick={handleCreatePoll}
            />
          </div>
        </div>
      )}

      {pollingList.length > 0 && (
        <div>
          <h2>Current Polls</h2>
          <p>Total Votes: {totalVotes}</p>
          
          {pollingList.map((item) => {
            const percentage = votingPercentage.find(p => p.id === item.id)?.percentage || 0;
            return (
              <PollItem 
                key={item.id} 
                item={item} 
                percentage={percentage}
                totalVotes={totalVotes}
              />
            );
          })}
          
          <ActionButton
            buttonText="Reset All Polls"
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all polls?')) {
                pollingStore.resetPollingList();
              }
            }}
          />
        </div>
      )}

      {pollingList.length === 0 && !showCreatePoll && (
        <div>
          <p>No polls available. Create your first poll!</p>
        </div>
      )}
    </div>
  );
};

export default observer(PollingCard);

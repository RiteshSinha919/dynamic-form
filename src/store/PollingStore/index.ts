import { makeObservable, computed, observable, action } from "mobx";
import { PollingType } from "../../types/PollingType";
import { v4 as uuidv4 } from "uuid";

interface NewPollingType extends PollingType {
  error?: string;
}

interface VoteRecord {
  pollId: string;
  votedAt: number;
}

class PollingStore {
  pollingList: PollingType[] = [];
  newPollingData: NewPollingType[] = [];
  showCreatePoll: boolean = false;
  userVotes: VoteRecord[] = [];

  constructor() {
    makeObservable(this, {
      pollingList: observable,
      newPollingData: observable,
      showCreatePoll: observable,
      userVotes: observable,
      updateInputData: action,
      addNewPollItem: action,
      showNewPoll: action,
      cancelNewPoll: action,
      createNewPoll: action,
      removeNewPollItem: action,
      handleVote: action,
      savePollToLocal: action,
      loadPollFromLocal: action,
    });

    this.loadPollFromLocal();
  }

  updateInputData = (id: string, value: string) => {
    const newItem = this.newPollingData.find((item) => item.id === id);
    if (newItem) {
      newItem.content = value;
    }
  };

  handleVote = (id: string) => {
    const hasVoted = this.userVotes.some((vote) => vote.pollId === id);
    if (hasVoted) {
      console.warn("User has already voted for this poll");
      return;
    }

    const pollItem = this.pollingList.find((item) => item.id === id);
    if (pollItem) {
      pollItem.vote++;
      this.userVotes.push({
        pollId: id,
        votedAt: Date.now(),
      });
      this.savePollToLocal();
    }
  };

  hasUserVoted = (id: string): boolean => {
    return this.userVotes.some((vote) => vote.pollId === id);
  };

  addNewPollItem = () => {
    const newItem = {
      id: uuidv4(),
      content: "",
      vote: 0,
      error: "",
    };
    this.newPollingData.push(newItem);
  };

  showNewPoll = () => {
    this.showCreatePoll = true;
    this.addNewPollItem();
    this.addNewPollItem();
  };

  cancelNewPoll = () => {
    this.showCreatePoll = false;
    this.resetNewPollingData();
  };

  createNewPoll = () => {
    this.pollingList = this.newPollingData;
    this.resetNewPollingData();
    this.savePollToLocal();
    this.showCreatePoll = false;
  };

  removeNewPollItem = (id: string) => {
    const newItem = this.newPollingData.filter((item) => item.id !== id);
    this.newPollingData = newItem;
  };

  get votingPercentage() {
    const totalVotes = this.pollingList.reduce(
      (sum, item) => sum + item.vote,
      0
    );

    if (totalVotes === 0) {
      return this.pollingList.map((item) => ({
        id: item.id,
        percentage: 0,
      }));
    }

    return this.pollingList.map((item) => ({
      id: item.id,
      percentage: Math.round((item.vote / totalVotes) * 100),
    }));
  }

  getTotalVotes = () => {
    return this.pollingList.reduce((sum, item) => sum + item.vote, 0);
  };

  resetNewPollingData = () => {
    this.newPollingData = [];
  };

  resetPollingList = () => {
    this.pollingList = [];
    this.userVotes = [];
    this.savePollToLocal();
  };

  validatePoll = () => {
    const hasEmptyContent = this.newPollingData.some(
      (item) => !item.content.trim()
    );
    if (hasEmptyContent) {
      return { isValid: false, message: "All poll options must have content" };
    }

    if (this.newPollingData.length < 2) {
      return { isValid: false, message: "Poll must have at least 2 options" };
    }

    return { isValid: true, message: "" };
  };

  savePollToLocal = () => {
    try {
      localStorage.setItem(
        "pollingData",
        JSON.stringify({
          pollingList: this.pollingList,
          userVotes: this.userVotes,
        })
      );
    } catch (error) {
      console.error("Failed to save polling data to localStorage:", error);
    }
  };

  loadPollFromLocal = () => {
    try {
      const savedData = localStorage.getItem("pollingData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        this.pollingList = parsedData.pollingList || [];
        this.userVotes = parsedData.userVotes || [];
      }
    } catch (error) {
      console.error("Failed to load polling data from localStorage:", error);
      this.pollingList = [];
      this.userVotes = [];
    }
  };
}

const pollingStore = new PollingStore();
export default pollingStore;

import { action, computed, makeObservable, observable } from "mobx";
import { VoteType } from "../../types/VoteType";
import { v4 as uuidv4 } from "uuid";

class VoteStore {
  voteList: VoteType[] = [];
  inputValue: string = "";

  constructor() {
    makeObservable(this, {
      voteList: observable,
      inputValue: observable,
      addNew: action,
      sortedList: computed,
      updateInput: action,
    });
  }

  get sortedList() {
    return this.voteList.slice().sort((a, b) => b.voteCount - a.voteCount);
  }

  addNew = () => {
    if (this.inputValue) {
      const newItem: VoteType = {
        id: uuidv4(),
        voteCount: 0,
        content: this.inputValue,
      };
      this.voteList.push(newItem);
      this.voteList = [...this.sortedList];
    }
  };

  updateInput = (value: string) => {
    this.inputValue = value;
  };

  handleUpVote = (id: string) => {
    const voteItem = this.voteList.find((item) => item.id === id);
    if (voteItem) {
      voteItem.voteCount++;
      this.voteList = [...this.sortedList];
    }
  };

  handleDownVote = (id: string) => {
    const voteItem = this.voteList.find((item) => item.id === id);
    if (voteItem && voteItem.voteCount > 0) {
      voteItem.voteCount--;
      this.voteList = [...this.sortedList];
    }
  };

  resetVote = () => {
    this.voteList.forEach((item) => (item.voteCount = 0));
  };
}

const voteStore = new VoteStore();
export default voteStore;

import { makeAutoObservable, runInAction } from "mobx";

class CounterStore {
  countValue: number;
  timeToResetCounter: number;

  constructor() {
    this.countValue = 0;
    this.timeToResetCounter = 10;
    makeAutoObservable(this);
    this.onHalt();
  }

  onIncrement = () => {
    this.countValue = this.countValue >= 0 ? this.countValue + 1 : 0;
    this.onUserInteration();
  };

  onDecrement = () => {
    this.countValue = this.countValue > 0 ? this.countValue - 1 : 0;
    this.onUserInteration();
  };

  resetCount = () => {
    this.countValue = 0;
  };

  onUserInteration = () => {
    this.timeToResetCounter = 10;
  };

  onHalt = () => {
    runInAction(() => {
      setInterval(() => {
        if (this.timeToResetCounter === 0) {
          this.resetCount();
          this.onUserInteration();
        }
        this.timeToResetCounter--;
      }, 1000);
    });
  };
}

const counterStore = new CounterStore();
export default counterStore;

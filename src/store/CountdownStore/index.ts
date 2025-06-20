import { makeObservable, observable } from "mobx";

class CountdownStore {
  fromTime: number = 5;
  countdownValue: number = this.fromTime;
  countdownIntervalId: NodeJS.Timeout | undefined;

  constructor() {
    makeObservable(this, {
      fromTime: observable,
      countdownValue: observable,
      countdownIntervalId: observable,
    });
  }

  updateFromTime = (value: number) => {
    this.fromTime = value;
    this.countdownValue = this.fromTime;
  };

  handleCountdown = () => {
    this.countdownIntervalId = setInterval(() => {
      if (this.countdownValue > 0) {
        this.countdownValue--;
      }
    }, 1000);
  };

  playCountdown = () => {
    if (this.fromTime && this.countdownValue > 0) this.handleCountdown();
  };

  pauseCountdown = () => {
    clearInterval(this.countdownIntervalId);
    this.countdownIntervalId = undefined;
  };

  resetCountdown = () => {
    this.pauseCountdown();
    this.countdownValue = this.fromTime;
  };
}

const countdownStore = new CountdownStore();
export default countdownStore;

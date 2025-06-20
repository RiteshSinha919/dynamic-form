import { makeObservable, observable } from "mobx";

class CountdownStore {
  fromTime: number;
  countdownValue: number;

  constructor() {
    this.fromTime = 0;
    this.countdownValue = this.fromTime;
    makeObservable(this, {
      fromTime: observable,
      countdownValue: observable,
    });
  }

  updateFromTime = (value: number) => {
    this.fromTime = value;
  };

  handleCountdown = () => {
    setInterval(() => {
      if (this.countdownValue > 0) {
        this.countdownValue--;
      }
    }, 1000);
  };

  startCountdown = () => {
    this.handleCountdown();
  };

  pause
}

const countdownStore = new CountdownStore();
export default countdownStore;

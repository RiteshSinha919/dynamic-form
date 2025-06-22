import { timers } from "cypress/types/jquery";
import { action, makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";

class AnimatedTextStore {
  textContent: string = "";
  currentIndex: number = 0;
  textGenerator: string[] = [];

  constructor() {
    makeObservable(this, {
      textContent: observable,
      textGenerator: observable,
      updateInput: action,
      handleGenerate: action,
      updateTextGenerator: action,
      reset: action,
    });
  }

  updateInput = (value: string) => {
    this.textContent = value;
  };

  updateTextGenerator = (words: string[]) => {
    this.textGenerator = [...this.textGenerator, words[this.currentIndex]];
  };

  handleGenerate = () => {
    if (this.textContent) {
      const words: string[] = this.textContent.split(" ");
      if (this.currentIndex < words.length) {
        const timer = setInterval(() => {
          this.updateTextGenerator(words);
          this.currentIndex++;
          if (this.currentIndex >= words.length) {
            clearInterval(timer);
            this.reset();
          }
        }, 400);
      }
    }
  };

  reset() {
    this.currentIndex = 0;
  }
}

const animatedTextStore = new AnimatedTextStore();
export default animatedTextStore;

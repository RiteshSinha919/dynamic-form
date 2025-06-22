import { action, makeObservable, observable } from "mobx";
import { AccordionType } from "../../types/AccordionType";
import { v4 as uuidv4 } from "uuid";

class AccordionStore {
  accordionList: AccordionType[] = [];
  inputData: AccordionType = {
    id: uuidv4(),
    title: "",
    content: "",
    isOpen: false,
  };

  constructor() {
    makeObservable(this, {
      accordionList: observable,
      inputData: observable,
      updateInput: action,
      toggleAccordion: action,
      addNew: action,
      handleCollapseAll: action,
      handleExpandAll: action,
    });
  }

  updateInput = (field: string, value: string) => {
    this.inputData[field] = value;
  };

  addNew = () => {
    if (this.inputData.title) {
      this.accordionList.push(this.inputData);
    }
    this.resetInputData();
  };

  toggleAccordion = (id: string) => {
    const listItem = this.accordionList.find((item) => item.id === id);
    if (listItem) {
      if (listItem.isOpen) {
        listItem.isOpen = false;
      } else {
        this.accordionList.forEach((item) => (item.isOpen = false));
        listItem.isOpen = true;
      }
    }
  };

  handleExpandAll = () => {
    if (this.accordionList.length > 0)
      this.accordionList.forEach((item) => (item.isOpen = true));
  };

  handleCollapseAll = () => {
    if (this.accordionList.length > 0)
      this.accordionList.forEach((item) => (item.isOpen = false));
  };

  resetInputData = () => {
    this.inputData = {
      id: uuidv4(),
      title: "",
      content: "",
      isOpen: false,
    };
  };
}

const accordionStore = new AccordionStore();
export default accordionStore;

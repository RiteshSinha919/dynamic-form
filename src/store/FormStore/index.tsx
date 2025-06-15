import { makeObservable, observable, runInAction } from "mobx";
import { v4 as uuidv4 } from "uuid";

interface FormEntries {
  id: string;
  institute: string;
  degree: string;
  errors: {
    institute?: string;
    degree?: string;
  };
}

class FormStore {
  formRecords: FormEntries[] = [];

  constructor() {
    makeObservable(this, {
      formRecords: observable,
      addFormRecord: observable,
      updateFormRecord: observable,
      removeFormRecord: observable,
      validateFormRecord: observable,
    });
    this.addFormRecord();
  }

  addFormRecord() {
    this.formRecords.push({
      id: uuidv4(),
      institute: "",
      degree: "",
      errors: {},
    });
  }

  updateFormRecord(id: string, field: string, value: string) {
    const record = this.formRecords.find((record) => record.id === id);
    if (record) {
      record[field as keyof FormEntries] = value;
      this.validateFormRecord(record, field);
    }
  }

  removeFormRecord(id: string) {
    this.formRecords = this.formRecords.filter((record) => record.id !== id);
  }

  validateFormRecord(record: FormEntries, field: string) {
    const value = record[field as keyof FormEntries];
    runInAction(() => {
      delete record.errors[field as keyof FormEntries];
    });
    if (!value) {
      record.errors[field as keyof FormEntries] = `${field} is required`;
    }
  }
}

const formStore = new FormStore();
export default formStore;

import { makeAutoObservable, runInAction } from "mobx";
import { EmployeExperienceType } from "../../types/EmployeExperienceType";
import { v4 as uuidv4 } from "uuid";

class EmployeExperienceDataStore {
  employeExperienceData: EmployeExperienceType[] = [];

  constructor() {
    makeAutoObservable(this);
    this.addExperienceData();
  }

  addExperienceData() {
    const erroredField = this.employeExperienceData.find(
      (item) => !item.companyName
    );

    if (!erroredField) {
      this.employeExperienceData.push({
        id: uuidv4(),
        companyName: "",
        jobTitle: "",
        companyNameError: "",
      });
    } else {
      this.validateExperienceData(erroredField);
    }
  }

  updateExperienceData(id: string, field: string, value: string) {
    const updateData = this.employeExperienceData.find(
      (item) => item.id === id
    );
    if (updateData) {
      updateData[field] = value;
      this.validateExperienceData(updateData);
    }
  }

  validateExperienceData(experienceData: EmployeExperienceType) {
    runInAction(() => {
      delete experienceData.companyNameError;
    });
    if (!experienceData.companyName) {
      experienceData.companyNameError = "Company name is required";
    }
  }
}

const employeExperienceDataStore = new EmployeExperienceDataStore();
export default employeExperienceDataStore;

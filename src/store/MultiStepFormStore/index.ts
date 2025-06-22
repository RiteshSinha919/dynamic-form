import { act } from "@testing-library/react";
import { action, makeObservable, observable, computed } from "mobx";
import { v4 as uuidv4 } from "uuid";

interface FormStore {
  id: string;
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  errors: {
    name?: string;
    email?: string;
    address?: string;
    city?: string;
    zipCode?: string;
  };
}

class MultiStepFormStore {
  formData: FormStore = {
    id: "",
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    errors: {},
  };

  isSubmitted: boolean = false;
  formStep: number = 1;
  totalSteps: number = 3;

  constructor() {
    makeObservable(this, {
      formData: observable,
      formStep: observable,
      isSubmitted: observable,
      totalSteps: observable,
      validPrev: computed,
      updateFormData: action,
      validateInput: action,
      clearErrors: action,
      nextStep: action,
      prevStep: action,
      handleFormRefresh: action,
      handleSubmit: action,
      resetFormData: action,
    });
  }

  get validPrev(): boolean {
    return this.formStep > 1;
  }

  updateFormData = (field: string, value: string) => {
    this.formData[field] = value;

    if (this.formData.errors[field]) {
      delete this.formData.errors[field];
    }
  };

  validateInput = (field: string) => {
    const value = this.formData[field];

    if (this.formData.errors[field]) {
      delete this.formData.errors[field];
    }

    if (!value) {
      this.formData.errors[field] = `Field is required`;
      return false;
    }

    if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
      this.formData.errors.email = "Enter a valid email";
      return false;
    }

    if (field === "zipCode" && !/^\d+$/.test(value)) {
      this.formData.errors.zipCode = "Zip code must be a number";
      return false;
    }

    return true;
  };

  clearErrors = () => {
    this.formData.errors = {};
  };

  nextStep = () => {
    if (this.formStep < this.totalSteps) {
      let canProceed = true;

      if (this.formStep === 1) {
        if (!this.validateInput("name")) canProceed = false;
        if (!this.validateInput("email")) canProceed = false;
      } else if (this.formStep === 2) {
        if (!this.validateInput("address")) canProceed = false;
        if (!this.validateInput("city")) canProceed = false;
        if (!this.validateInput("zipCode")) canProceed = false;
      }

      if (canProceed) {
        this.formStep++;
      }
    } else if (this.formStep === this.totalSteps) {
      this.handleSubmit();
    }
  };

  prevStep = () => {
    if (this.formStep > 1) {
      this.formStep--;
      this.clearErrors();
    }
  };

  handleSubmit = () => {
    this.isSubmitted = true;
    this.resetFormData();
  };

  handleFormRefresh = () => {
    this.isSubmitted = false;
    this.formStep = 1;
    this.clearErrors();
  };

  resetFormData = () => {
    this.formData = {
      id: "",
      name: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      errors: {},
    };
  };
}

const multiStepFormStore = new MultiStepFormStore();
export default multiStepFormStore;

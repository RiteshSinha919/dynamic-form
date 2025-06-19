import { makeAutoObservable, runInAction } from "mobx";
import { ProductFeedbackType } from "../../types/ProductFeedbackType";

class ProductFeedbackStore {
  productFeedbackData: ProductFeedbackType;

  constructor() {
    this.productFeedbackData = {
      id: "",
      name: "",
      email: "",
      feedback: "",
      errors: {
        name: "",
        email: "",
      },
    };
    makeAutoObservable(this);
  }

  validateFeedbackData() {
    const emialReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (this.productFeedbackData.email) {
      if (!emialReg.test(this.productFeedbackData.email)) {
        this.productFeedbackData.errors.email = "Enter Correct Email";
      }
    } else {
      this.productFeedbackData.errors.email = "Email is required";
    }

    if (!this.productFeedbackData.name) {
      this.productFeedbackData.errors.name = "Name is required";
    }

    runInAction(() => {
      delete this.productFeedbackData.errors.email;
      delete this.productFeedbackData.errors.name;
    });
  }

  submitFeedback() {
    this.validateFeedbackData();
    if (
      !this.productFeedbackData.errors.email &&
      !this.productFeedbackData.errors.name
    ) {
      this.resetFeedbackData();
    }
  }

  resetFeedbackData() {
    this.productFeedbackData = {
      id: "",
      name: "",
      email: "",
      feedback: "",
      errors: {
        name: "",
        email: "",
      },
    };
  }
}

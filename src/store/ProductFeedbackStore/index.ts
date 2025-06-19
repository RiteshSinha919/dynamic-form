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
      error: {
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
        this.productFeedbackData.error.email = "Enter Correct Email";
      }
    } else {
      this.productFeedbackData.error.email = "Email is required";
    }

    if (!this.productFeedbackData.name) {
      this.productFeedbackData.error.name = "Name is required";
    }

    runInAction(() => {
      delete this.productFeedbackData.error.email;
      delete this.productFeedbackData.error.name;
    });
  }

  submitFeedback() {
    
  }
}

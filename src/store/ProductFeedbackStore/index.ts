import { makeAutoObservable, runInAction } from "mobx";
import { ProductFeedbackType } from "../../types/ProductFeedbackType";
import { v4 as uuidv4 } from "uuid";

class ProductFeedbackStore {
  productFeedbackData: ProductFeedbackType;
  showSuccessMessage: boolean;

  constructor() {
    this.productFeedbackData = {
      id: uuidv4(),
      name: "",
      email: "",
      feedback: "",
      errors: {
        name: "",
        email: "",
      },
    };
    this.showSuccessMessage = false;
    makeAutoObservable(this);
  }

  setFeedbackData = (field: string, value: string) => {
    this.productFeedbackData[field] = value;
    if (field in this.productFeedbackData.errors) {
      this.productFeedbackData.errors[field] = "";
    }
  };

  validateFeedbackData = () => {
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
  };

  onSuccess() {
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  submitFeedback = () => {
    this.validateFeedbackData();
    if (
      !this.productFeedbackData.errors.email &&
      !this.productFeedbackData.errors.name
    ) {
      this.resetFeedbackData();
      this.onSuccess();
    }
  };

  resetFeedbackData() {
    this.productFeedbackData = {
      id: uuidv4(),
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

const productFeedbackStore = new ProductFeedbackStore();
export default productFeedbackStore;

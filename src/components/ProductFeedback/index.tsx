import React from "react";
import InputField from "../InputField";
import { observer } from "mobx-react-lite";
import productFeedbackStore from "../../store/ProductFeedbackStore";
import ActionButton from "../ActionButton";
import SuccessCard from "../SuccessCard";

const ProductFeedback: React.FC = observer(() => {
  const {
    productFeedbackData,
    showSuccessMessage,
    submitFeedback,
    setFeedbackData,
  } = productFeedbackStore;
  const onChange =
    (field: "name" | "email" | "feedback") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFeedbackData(field, event.target.value);
    };
  return (
    <>
      <h1>Product Feedback</h1>
      <InputField
        inputLabel={"Name"}
        errorMessage={productFeedbackData.errors.name}
        onChange={onChange("name")}
        inputValue={productFeedbackData.name}
      />
      <InputField
        inputLabel={"Email"}
        errorMessage={productFeedbackData.errors.email}
        onChange={onChange("email")}
        inputValue={productFeedbackData.email}
      />
      <InputField
        inputLabel={"Feedback"}
        onChange={onChange("feedback")}
        inputValue={productFeedbackData.feedback}
      />
      <ActionButton onClick={submitFeedback} buttonText={"Submit"} />
      {showSuccessMessage && <SuccessCard successText={"Success"} />}
    </>
  );
});

export default ProductFeedback;

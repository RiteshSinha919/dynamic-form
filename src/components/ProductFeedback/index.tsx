import React from "react";
import InputField from "../InputField";

const ProductFeedback: React.FC = () => {
  const onChange =
    (field: "name" | "email" | "feedback") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      
    };
  return (
    <>
      <h1>Product Feedback</h1>
      <InputField
        inputLabel={"Name"}
        errorMessage={}
        onChange={}
        inputValue={}
      />
      <InputField
        inputLabel={"Email"}
        errorMessage={}
        onChange={}
        inputValue={}
      />
      <InputField
        inputLabel={"Feedback"}
        errorMessage={}
        onChange={}
        inputValue={}
      />
    </>
  );
};

export default ProductFeedback;

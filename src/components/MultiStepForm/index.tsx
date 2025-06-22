import React from "react";
import InputField from "../InputField";
import ActionButton from "../ActionButton";
import { observer } from "mobx-react-lite";
import multiStepFormStore from "../../store/MultiStepFormStore";

const MultiStepForm: React.FC = () => {
  const { formData, formStep, validPrev, isSubmitted } = multiStepFormStore;
  const onChange =
    (field: "name" | "email" | "address" | "city" | "zipCode") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      multiStepFormStore.updateFormData(field, event.target.value);
    };

  if (isSubmitted) {
    return (
      <div>
        <h2>Form Submitted Successfully!</h2>
        <ActionButton
          buttonText="Another Form"
          onClick={() => multiStepFormStore.handleFormRefresh()}
        />
      </div>
    );
  }

  return (
    <>
      {formStep === 1 && (
        <>
          <InputField
            inputLabel="Name"
            inputValue={formData.name}
            onChange={onChange("name")}
            errorMessage={formData.errors.name}
          />
          <InputField
            inputLabel="Email"
            inputValue={formData.email}
            onChange={onChange("email")}
            errorMessage={formData.errors.email}
          />
        </>
      )}
      {formStep === 2 && (
        <>
          <InputField
            inputLabel="Address"
            inputValue={formData.address}
            onChange={onChange("address")}
            errorMessage={formData.errors.address}
          />
          <InputField
            inputLabel="City"
            inputValue={formData.city}
            onChange={onChange("city")}
            errorMessage={formData.errors.city}
          />
          <InputField
            inputLabel="Zip Code"
            inputValue={formData.zipCode}
            onChange={onChange("zipCode")}
            errorMessage={formData.errors.zipCode}
          />
        </>
      )}
      {formStep === 3 && (
        <>
          <h3>Review Your Information:</h3>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Address: {formData.address}</p>
          <p>City: {formData.city}</p>
          <p>Zip Code: {formData.zipCode}</p>
        </>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        {validPrev && (
          <ActionButton
            buttonText="Previous"
            onClick={() => multiStepFormStore.prevStep()}
          />
        )}
        <ActionButton
          buttonText={formStep === 3 ? "Submit" : "Next"}
          onClick={() => multiStepFormStore.nextStep()}
        />
      </div>
    </>
  );
};

export default observer(MultiStepForm);

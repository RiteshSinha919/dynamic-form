import React, { useState } from "react";
import {
  StyledEducationCardItemContainer,
  CloseButton,
  CloseButtonContainer,
} from "./styledComponents";
import InputField from "../../InputField";
import formStore from "../../../store/FormStore";

interface EducationCardItemProps {
  id: string;
  institute: string;
  degree: string;
  errors: {
    institute?: string;
    degree?: string;
  };
}

const EducationCardItem: React.FC<EducationCardItemProps> = ({
  id,
  institute,
  degree,
  errors,
}) => {
  const handleChange =
    (field: "institute" | "degree") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      formStore.updateFormRecord(id, field, event.target.value);
    };

  return (
    <StyledEducationCardItemContainer>
      <CloseButtonContainer>
        <CloseButton onClick={() => formStore.removeFormRecord(id)}>
          x
        </CloseButton>
      </CloseButtonContainer>
      <InputField
        inputLabel="Institute Name"
        errorMessage={errors?.institute}
        value={institute}
        onChange={handleChange("institute")}
      />
      <InputField
        inputLabel="Degree"
        errorMessage={errors?.degree}
        value={degree}
        onChange={handleChange("degree")}
      />
    </StyledEducationCardItemContainer>
  );
};

export default EducationCardItem;

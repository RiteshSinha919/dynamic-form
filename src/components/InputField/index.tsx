import React, { useState } from "react";
import {
  StyledInputFieldContainer,
  StyledInputField,
  StyledLabel,
  StyledErrorMessage,
} from "./styledComponents";

interface InputFieldProps {
  inputLabel: string;
  inputValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  inputLabel,
  errorMessage,
  inputValue,
  onChange,
}) => {
  return (
    <StyledInputFieldContainer>
      <StyledLabel htmlFor={inputLabel}>{inputLabel}</StyledLabel>
      <StyledInputField
        id={inputLabel}
        onChange={onChange}
        value={inputValue}
      />
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </StyledInputFieldContainer>
  );
};

export default InputField;

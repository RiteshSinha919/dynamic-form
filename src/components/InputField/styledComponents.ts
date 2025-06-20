import styled from "styled-components";

export const StyledInputFieldContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 8px 0;
`;

export const StyledInputField = styled.input`
  height: 100%;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #c3c3c3;
  outline: none;
  padding: 8px;
  box-sizing: border-box;

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const StyledLabel = styled.label`
  margin-bottom: 4px;
  cursor: pointer;
`;
export const StyledErrorMessage = styled.p`
  margin-top: 4px;
  color: red;
  font-size: 12px;
`;

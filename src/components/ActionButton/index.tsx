import React from "react";
import {
  StyledActionButtonContainer,
  StyledActionButton,
} from "./styledComponents";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ buttonText, ...rest }) => {
  return (
    <StyledActionButtonContainer>
      <StyledActionButton onClick={rest.onClick} {...rest}>
        {buttonText}
      </StyledActionButton>
    </StyledActionButtonContainer>
  );
};

export default ActionButton;

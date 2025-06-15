import React from "react";
import ActionButton from "../../components/ActionButton";
import EducationFormCard from "../../components/EducationCards";

import { StyledFormContainer } from "./styledComponents";
import { observer } from "mobx-react-lite";

const FormRoute: React.FC = observer(() => {
  return (
    <StyledFormContainer>
      <EducationFormCard />
    </StyledFormContainer>
  );
});

export default FormRoute;

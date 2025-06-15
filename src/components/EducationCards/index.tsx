import React from "react";
import ActionButton from "../../components/ActionButton";
import EducationCardItem from "./EducationCardItem";
import formStore from "../../store/FormStore";

import {
  StyledEducationCardsContainer,
  EducationCardWrapper,
} from "./styledComponents";
import { observer } from "mobx-react-lite";

const EducationCards: React.FC = observer(() => {
  console.log(formStore.formRecords);
  return (
    <StyledEducationCardsContainer>
      <h1>Education</h1>
      <EducationCardWrapper>
        {formStore.formRecords.map((item) => (
          <EducationCardItem
            key={item.id}
            id={item.id}
            institute={item.institute}
            degree={item.degree}
            errors={item.errors}
          />
        ))}
      </EducationCardWrapper>
      <ActionButton
        buttonText="+ Add"
        onPress={() => formStore.addFormRecord()}
      />
    </StyledEducationCardsContainer>
  );
});

export default EducationCards;

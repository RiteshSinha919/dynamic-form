import React from "react";
import { observer } from "mobx-react-lite";
import ExperienceCardItem from "./ExperienceCardItem";
import employeExperienceDataStore from "../../store/EmployeExperienceDataStore";
import ActionButton from "../ActionButton";

const ExperienceCards: React.FC = observer(() => {
  return (
    <>
      <h1>Experience</h1>
      {employeExperienceDataStore.employeExperienceData.map((item) => (
        <ExperienceCardItem key={item.id} {...item} />
      ))}
      <ActionButton
        buttonText={"+ Add"}
        onClick={() => employeExperienceDataStore.addExperienceData()}
      />
    </>
  );
});

export default ExperienceCards;

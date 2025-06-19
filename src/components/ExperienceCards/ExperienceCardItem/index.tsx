import React from "react";
import InputField from "../../InputField";
import employeExperienceDataStore from "../../../store/EmployeExperienceDataStore";
import { EmployeExperienceType } from "../../../types/EmployeExperienceType";

const ExperienceCardItem: React.FC<EmployeExperienceType> = ({
  id,
  companyName,
  jobTitle,
  companyNameError,
}) => {
  const onChange =
    (field: "companyName" | "jobTitle") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      employeExperienceDataStore.updateExperienceData(
        id,
        field,
        event.target.value
      );
    };
  return (
    <>
      <InputField
        inputLabel={"Company Name"}
        onChange={onChange("companyName")}
        errorMessage={companyNameError}
        inputValue={companyName}
      />
      <InputField
        inputLabel={"Job Title"}
        onChange={onChange("jobTitle")}
        inputValue={jobTitle}
      />
    </>
  );
};

export default ExperienceCardItem;

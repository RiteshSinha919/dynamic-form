import React from "react";
import { SuccessCardContainer } from "./styledComponents";

interface SuccessCardProps {
  successText: string;
}

const SuccessCard: React.FC<SuccessCardProps> = ({ successText }) => {
  return <SuccessCardContainer>{successText}</SuccessCardContainer>;
};

export default SuccessCard;

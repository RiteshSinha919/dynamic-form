import React from "react";
import { AccordionType } from "../../../types/AccordionType";
import accordionStore from "../../../store/AccordionStore";
import { observer } from "mobx-react-lite";

const AccordionItem: React.FC<AccordionType> = ({ item }) => {
  const { id, title, content, isOpen } = item;
  return (
    <>
      <>
        <button onClick={() => accordionStore.toggleAccordion(id)}>{title}</button>
        {isOpen ? "-" : "+"}
      </>
      {isOpen ? content : null}
    </>
  );
};

export default observer(AccordionItem);

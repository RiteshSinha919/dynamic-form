import React from "react";
import InputField from "../InputField";
import accordionStore from "../../store/AccordionStore";
import ActionButton from "../ActionButton";
import AccordionItem from "./AccordionItem";
import { observer } from "mobx-react-lite";

const Accordion: React.FC = () => {
  const onChange =
    (field: "title" | "content") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      accordionStore.updateInput(field, event.target.value);
    };
  console.log(accordionStore.accordionList);
  return (
    <>
      <InputField
        inputLabel="Title"
        inputValue={accordionStore.inputData.title}
        onChange={onChange("title")}
      />
      <InputField
        inputLabel="Content"
        inputValue={accordionStore.inputData.content}
        onChange={onChange("content")}
      />
      <ActionButton buttonText="Add" onClick={accordionStore.addNew} />
      <ActionButton
        buttonText="Collapse All"
        onClick={() => accordionStore.handleCollapseAll()}
      />
      <ActionButton
        buttonText="Expand All"
        onClick={() => accordionStore.handleExpandAll()}
      />
      <>
        {accordionStore.accordionList.map((item) => (
          <AccordionItem key={item.id} item={item} />
        ))}
      </>
    </>
  );
};

export default observer(Accordion);

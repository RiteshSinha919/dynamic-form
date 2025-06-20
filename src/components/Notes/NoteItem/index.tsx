import React from "react";
import { NoteType } from "../../../types/NoteType";
import ActionButton from "../../ActionButton";
import noteStore from "../../../store/NoteStore";
import { observer } from "mobx-react-lite";

const NoteItem: React.FC<NoteType> = observer(({ item }) => {
  const { id, title, content, error } = item;
  const handleEditing = () => {
    noteStore.setCurrentEditingNoteId(id);
  };

  const handleDelete = () => {
    noteStore.removeNote(id);
  };

  return (
    <>
      <h4>{title}</h4>
      <p>{content}</p>
      <ActionButton buttonText={"Edit"} onClick={handleEditing} />
      <ActionButton buttonText={"Delete"} onClick={handleDelete} />
    </>
  );
});

export default NoteItem;

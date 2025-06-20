import React from "react";
import { observer } from "mobx-react-lite";
import NoteItem from "./NoteItem";
import noteStore from "../../store/NoteStore";
import InputField from "../InputField";
import ActionButton from "../ActionButton";

const Notes: React.FC = observer(() => {
  const {
    noteList,
    currentEditingNote,
    contentLength,
    MAX_CONTENT_LENGTH,
  } = noteStore;

  const onChange =
    (field: "title" | "content") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      noteStore.editNote(field, event.target.value);
    };

  return (
    <>
      <InputField
        inputLabel={"Title"}
        onChange={onChange("title")}
        inputValue={currentEditingNote?.title || ""}
        errorMessage={currentEditingNote?.error || ""}
      />
      <InputField
        inputLabel={"Note Content"}
        onChange={onChange("content")}
        inputValue={currentEditingNote?.content || ""}
      />
      <p>
        {contentLength}/{MAX_CONTENT_LENGTH}
      </p>
      <ActionButton buttonText={"Add Note"} onClick={() => noteStore.addNewNote()} />
      {noteList.map((note) => (
        <NoteItem key={note.id} item={note} />
      ))}
    </>
  );
});

export default Notes;

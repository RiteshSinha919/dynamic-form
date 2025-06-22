import React from "react";
import { observer } from "mobx-react-lite";
import NoteItem from "./NoteItem";
import noteStore from "../../store/NoteStore";
import InputField from "../InputField";
import ActionButton from "../ActionButton";

const Notes: React.FC = observer(() => {
  const { noteList, contentLength, MAX_CONTENT_LENGTH, inputData } = noteStore;
  const isEditing = !!inputData.id;

  const onChange =
    (field: "title" | "content") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      noteStore.updateNote(field, event.target.value);
    };

  const handleSave = () => {
    if (isEditing) {
      const noteIndex = noteList.findIndex((note) => note.id === inputData.id);
      if (noteIndex !== -1) {
        if (noteStore.validateNote(inputData)) {
          noteList[noteIndex] = {
            ...inputData,
            title: inputData.title.trim(),
            content: inputData.content.trim(),
          };
          noteStore.saveNotesToStorage();
          noteStore.clearInput();
        }
      }
    } else {
      noteStore.addNewNote();
    }
  };

  const handleCancel = () => {
    noteStore.clearInput();
  };

  return (
    <>
      <InputField
        inputLabel={"Title"}
        onChange={onChange("title")}
        inputValue={inputData.title}
        errorMessage={inputData.error}
      />
      <InputField
        inputLabel={"Note Content"}
        onChange={onChange("content")}
        inputValue={inputData.content}
      />
      <p>
        {contentLength}/{MAX_CONTENT_LENGTH}
      </p>
      <ActionButton
        buttonText={isEditing ? "Save Changes" : "Add Note"}
        onClick={handleSave}
      />
      {isEditing && (
        <ActionButton buttonText={"Cancel"} onClick={handleCancel} />
      )}
      {noteList.map((note) => (
        <NoteItem key={note.id} item={note} />
      ))}
    </>
  );
});

export default Notes;

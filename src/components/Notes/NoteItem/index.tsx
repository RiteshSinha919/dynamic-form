import React from "react";
import { NoteType } from "../../../types/NoteType";
import ActionButton from "../../ActionButton";
import noteStore from "../../../store/NoteStore";
import { observer } from "mobx-react-lite";

interface NoteItemProps {
  item: NoteType;
}

const NoteItem: React.FC<NoteItemProps> = observer(({ item }) => {
  const { id, title, content } = item;
  
  const handleEditing = () => {
    noteStore.editNote(id);
  };

  const handleDelete = () => {
    noteStore.removeNote(id);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
      <h4>{title}</h4>
      {content && <p>{content}</p>}
      <div style={{ marginTop: "10px" }}>
        <ActionButton buttonText={"Edit"} onClick={handleEditing} />
        <ActionButton buttonText={"Delete"} onClick={handleDelete} />
      </div>
    </div>
  );
});

export default NoteItem;

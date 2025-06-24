import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import InputField from "../../InputField";
import todoStore from "../../../store/TodoStore";
import ActionButton from "../../ActionButton";

const TodoItem: React.FC<{ item: any }> = ({ item }) => {
  const { id, content, category, completed } = item;
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [editCategory, setEditCategory] = useState(category);

  const onToggleComplete = () => {
    todoStore.toggleTodoCompleted(id);
  };

  const onEdit = () => {
    setIsEditing(true);
  };

  const onSave = () => {
    todoStore.editTodo(id, "content", editContent);
    todoStore.editTodo(id, "category", editCategory);
    setIsEditing(false);
  };

  const onCancel = () => {
    setEditContent(content);
    setEditCategory(category);
    setIsEditing(false);
  };

  return (
    <>
      <ActionButton
        buttonText={completed ? "completed" : "pending"}
        onClick={onToggleComplete}
      />
      <>
        {isEditing ? (
          <>
            <input
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              {todoStore.categoryList.map((cat) => (
                <option key={cat.id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
            <ActionButton buttonText={"Save"} onClick={onSave} />
            <ActionButton buttonText={"Cancel"} onClick={onCancel} />
          </>
        ) : (
          <>
            <p
              style={{
                textDecoration: completed ? "line-through" : "",
              }}
            >
              {content}
            </p>
            <p>{category}</p>
          </>
        )}
      </>
      <br />
      <>
        <ActionButton buttonText={"edit"} onClick={onEdit} />
        <ActionButton
          buttonText={"Remove"}
          onClick={() => todoStore.removeTodo(id)}
        />
      </>
      <br />
      <br />
    </>
  );
};

export default observer(TodoItem);

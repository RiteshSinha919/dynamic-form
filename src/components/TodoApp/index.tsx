import React from "react";
import { observer } from "mobx-react-lite";
import InputField from "../InputField";
import todoStore from "../../store/TodoStore";
import ActionButton from "../ActionButton";

const TodoApp: React.FC = () => {
  const { todoList, categoryList, filterCategory, newCategory, newTodo } =
    todoStore;
  const onChange = (event) => {};
  return <></>;
};

export default observer(TodoApp);

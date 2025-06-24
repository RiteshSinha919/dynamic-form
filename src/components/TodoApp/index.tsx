import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import InputField from "../InputField";
import todoStore from "../../store/TodoStore";
import ActionButton from "../ActionButton";
import TodoItem from "./TodoItem";

const TodoApp: React.FC = () => {
  const {
    todoList,
    categoryList,
    filterCategory,
    newCategory,
    newTodo,
    showAddNewCategory,
    filteredTodoList,
  } = todoStore;

  useEffect(() => {
    if (categoryList.length > 0 && !newTodo.category) {
      todoStore.updateTodo("category", categoryList[1].category);
    }
  }, [categoryList, newTodo.category]);

  useEffect(() => {
    todoStore.handleTodoFilter();
  }, [todoStore.todoList, todoStore.filterCategory]);

  const onChangeCategory = (event) => {
    todoStore.updateCategory(event.target.value);
  };

  const onChangeTodo = (field: "content" | "category") => (event) => {
    todoStore.updateTodo(field, event.target.value);
    console.log(newTodo);
  };

  return (
    <>
      <ActionButton
        buttonText="Create Category"
        onClick={() => todoStore.showAddCategory()}
      />
      {showAddNewCategory && (
        <>
          <InputField
            inputLabel=""
            inputValue={newCategory.category}
            onChange={onChangeCategory}
            errorMessage={newCategory.error}
          />
          <ActionButton
            buttonText="Cancel"
            onClick={() => todoStore.cancelAddCategory()}
          />
          <ActionButton
            buttonText="Add"
            onClick={() => todoStore.addNewCategory()}
          />
        </>
      )}
      <br />
      <>
        <InputField
          inputLabel="Task Name"
          inputValue={newTodo.content}
          onChange={onChangeTodo("content")}
          errorMessage={newTodo.error}
        />
        <select value={newTodo.category} onChange={onChangeTodo("category")}>
          {categoryList.map((item) => (
            <option key={item.id} value={item.category}>
              {item.category}
            </option>
          ))}
        </select>
        <ActionButton
          buttonText="Add Task"
          onClick={() => todoStore.addNewTodo()}
        />
      </>
      <br />
      <br />

      <>
        <select
          value={filterCategory}
          onChange={(e) => todoStore.updateTodoFilter(e.target.value)}
        >
          {categoryList.map((item) => (
            <option key={item.id} value={item.category}>
              {item.category}
            </option>
          ))}
        </select>
      </>
      <>
        {filteredTodoList.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}
      </>
    </>
  );
};

export default observer(TodoApp);

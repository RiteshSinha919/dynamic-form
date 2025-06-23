import { action, computed, makeObservable, observable } from "mobx";
import { VoteType } from "../../types/VoteType";
import { v4 as uuidv4 } from "uuid";
import { error } from "cypress/types/jquery";

interface TodoList {
  id: string;
  content: string;
  category: string;
  error?: string;
}

interface CategoryList {
  id: string;
  category: string;
  error?: string;
}

class TodoStore {
  todoList: TodoList[] = [];
  categoryList: CategoryList[] = [];
  filterCategory: string = "All";
  showAddNewCategory: boolean = false;
  newCategory: CategoryList = {
    id: "",
    category: "",
    error: "",
  };
  newTodo: TodoList = {
    id: "",
    content: "",
    category: "",
    error: "",
  };

  constructor() {
    makeObservable(this, {
      todoList: observable,
      categoryList: observable,
      filterCategory: observable,
      newCategory: observable,
      newTodo: observable,
      showAddCategory: action,
      updateTodo: action,
      updateCategory: action,
      addNewCategory: action,
      cancelAddCategory: action,
      addNewTodo: action,
      validateInput: action,
      removeTodo: action,
      editTodo: action,
      handleTodoFilter: action,
      resetNewCategory: action,
      resetNewTodo: action,
    });
  }

  updateTodo = (field: string, value: string) => {
    this.newTodo[field] = value;
    this.validateInput();
  };

  showAddCategory = () => {
    this.showAddNewCategory = true;
  };

  updateCategory = (value: string) => {
    this.newCategory.category = value;
    this.validateInput();
  };

  validateInput = () => {
    if (!this.newCategory.category) {
      this.newCategory.error = "Enter category";
      return false;
    }
    if (!this.newTodo.content) {
      this.newTodo.error = "Enter task to add";
      return false;
    }
    this.newCategory.error = "";
    this.newTodo.error = "";
    return true;
  };

  addNewCategory = () => {
    if (this.validateInput()) {
      const newItem: CategoryList = {
        id: uuidv4(),
        category: this.newCategory.category,
      };
      this.categoryList.push(newItem);
      this.resetNewCategory();
    }
  };

  cancelAddCategory = () => {
    this.showAddNewCategory = false;
  };

  addNewTodo = () => {
    if (this.validateInput()) {
      const newItem = {
        id: uuidv4(),
        content: this.newTodo.content,
        category: this.newTodo.category,
      };
      this.todoList.push(newItem);
      this.resetNewTodo();
    }
  };

  removeTodo = (id: string) => {
    const newList = this.todoList.filter((item) => item.id !== id);
    this.todoList = [...newList];
  };

  editTodo = (id: string, field: string, value: string) => {
    const editItem = this.todoList.find((item) => item.id === id);
    if (editItem) editItem[field] = value;
  };

  handleTodoFilter = (value: string) => {
    this.filterCategory = value;
  };

  resetNewCategory = () => {
    this.newCategory = {
      id: "",
      category: "",
      error: "",
    };
  };

  resetNewTodo = () => {
    this.newTodo = {
      id: "",
      content: "",
      category: "",
      error: "",
    };
  };
}

const todoStore = new TodoStore();
export default todoStore;

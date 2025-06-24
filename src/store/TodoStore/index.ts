import { action, computed, makeObservable, observable } from "mobx";
import { VoteType } from "../../types/VoteType";
import { v4 as uuidv4 } from "uuid";
import { error } from "cypress/types/jquery";

interface TodoList {
  id: string;
  content: string;
  category: string;
  completed?: boolean;
  error?: string;
}

interface CategoryList {
  id: string;
  category: string;
  error?: string;
}

class TodoStore {
  todoList: TodoList[] = [];
  filteredTodoList: TodoList[] = [];
  categoryList: CategoryList[] = [];
  filterCategory: string = "All";
  showAddNewCategory: boolean = false;
  taskStatus: "pending" | "completed" = "pending";
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
      showAddNewCategory: observable,
      taskStatus: observable,
      filteredTodoList: observable,
      toggleStatus: action,
      showAddCategory: action,
      updateTodo: action,
      updateCategory: action,
      addNewCategory: action,
      cancelAddCategory: action,
      addNewTodo: action,
      validateCategory: action,
      validateTodo: action,
      removeTodo: action,
      editTodo: action,
      updateTodoFilter: action,
      resetNewCategory: action,
      resetNewTodo: action,
      toggleTodoCompleted: action,
    });

    this.categoryList.push({ id: uuidv4(), category: "All" });
    this.categoryList.push({ id: uuidv4(), category: "Work" });
    this.categoryList.push({ id: uuidv4(), category: "Personal" });
  }

  toggleStatus = () => {
    this.taskStatus = this.taskStatus === "pending" ? "completed" : "pending";
  };

  updateTodo = (field: string, value: string) => {
    this.newTodo[field] = value;
  };

  showAddCategory = () => {
    this.showAddNewCategory = true;
  };

  updateCategory = (value: string) => {
    this.newCategory.category = value;
    this.validateCategory();
  };

  validateCategory = () => {
    if (!this.newCategory.category) {
      this.newCategory.error = "Enter category";
      return false;
    }
    this.newCategory.error = "";
    return true;
  };

  validateTodo = () => {
    if (!this.newTodo.content) {
      this.newTodo.error = "Enter task to add";
      return false;
    }
    this.newTodo.error = "";
    return true;
  };

  addNewCategory = () => {
    const item = this.categoryList.find(
      (item) =>
        item.category.toLowerCase() === this.newCategory.category.toLowerCase()
    );
    if (this.validateCategory() && !item) {
      const newItem: CategoryList = {
        id: uuidv4(),
        category: this.newCategory.category,
      };
      this.categoryList.push(newItem);
      this.showAddNewCategory = false;
      this.resetNewCategory();
    } else {
      this.newCategory.error = "Category already exisit";
    }
  };

  cancelAddCategory = () => {
    this.showAddNewCategory = false;
    this.resetNewCategory();
  };

  addNewTodo = () => {
    if (this.validateTodo()) {
      const newItem = {
        id: uuidv4(),
        content: this.newTodo.content,
        category: this.newTodo.category,
        completed: false,
      };
      this.todoList.push(newItem);
      this.resetNewTodo();
    } else {
      this.validateTodo();
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

  updateTodoFilter = (value: string) => {
    this.filterCategory = value;
  };

  handleTodoFilter = () => {
    if (this.filterCategory === "All") {
      this.filteredTodoList = this.todoList;
      return;
    }
    this.filteredTodoList = this.todoList.filter(
      (item) => item.category === this.filterCategory
    );
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

  toggleTodoCompleted = (id: string) => {
    const todo = this.todoList.find((item) => item.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  };
}

const todoStore = new TodoStore();
export default todoStore;

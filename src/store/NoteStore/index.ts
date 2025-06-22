import { makeObservable, computed, observable, action } from "mobx";
import { NoteType } from "../../types/NoteType";
import { v4 as uuidv4 } from "uuid";

class NoteStore {
  noteList: NoteType[] = [];
  inputData: NoteType = {
    id: "",
    title: "",
    content: "",
    error: "",
  };
  readonly MAX_CONTENT_LENGTH = 200;
  private readonly STORAGE_KEY = "notes";

  constructor() {
    makeObservable(this, {
      noteList: observable,
      inputData: observable,
      addNewNote: action,
      updateNote: action,
      removeNote: action,
      editNote: action,
      clearInput: action,
      saveNotesToStorage: action,
      contentLength: computed,
    });

    this.loadNotesFromStorage();
  }

  get contentLength(): number {
    return this.inputData.content.length;
  }

  addNewNote() {
    if (!this.validateNote(this.inputData)) {
      return;
    }

    const newNote: NoteType = {
      id: uuidv4(),
      title: this.inputData.title.trim(),
      content: this.inputData.content.trim(),
    };

    this.noteList.push(newNote);
    this.saveNotesToStorage();
    this.clearInput();
  }

  updateNote(field: "title" | "content", value: string) {
    if (field === "content" && value.length > this.MAX_CONTENT_LENGTH) {
      return;
    }

    this.inputData[field] = value;

    if (this.inputData.error) {
      this.inputData.error = "";
    }
  }

  editNote(id: string) {
    const note = this.noteList.find((item) => item.id === id);
    if (note) {
      this.inputData = {
        id: note.id,
        title: note.title,
        content: note.content,
        error: "",
      };
    }
  }

  removeNote(id: string) {
    this.noteList = this.noteList.filter((item) => item.id !== id);
    this.saveNotesToStorage();

    if (this.inputData.id === id) {
      this.clearInput();
    }
  }

  clearInput() {
    this.inputData = {
      id: "",
      title: "",
      content: "",
      error: "",
    };
  }

  validateNote(note: NoteType): boolean {
    if (!note.title.trim()) {
      this.inputData.error = "Title is required";
      return false;
    }

    this.inputData.error = "";
    return true;
  }

  private loadNotesFromStorage() {
    try {
      const storedNotes = localStorage.getItem(this.STORAGE_KEY);
      if (storedNotes) {
        this.noteList = JSON.parse(storedNotes);
      }
    } catch (error) {
      console.error("Error loading notes from localStorage:", error);
      this.noteList = [];
    }
  }

  saveNotesToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.noteList));
    } catch (error) {
      console.error("Error saving notes to localStorage:", error);
    }
  }
}

const noteStore = new NoteStore();
export default noteStore;

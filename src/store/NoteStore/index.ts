import { makeObservable, computed, observable, action } from "mobx";
import { NoteType } from "../../types/NoteType";
import { v4 as uuidv4 } from "uuid";

class NoteStore {
  noteList: NoteType[] = [];
  contentLength: number = 0;
  currentEditingNoteId: string | null = null;
  readonly MAX_CONTENT_LENGTH = 200;

  constructor() {
    makeObservable(this, {
      noteList: observable,
      contentLength: observable,
      currentEditingNoteId: observable,
      addNewNote: action,
      editNote: action,
      removeNote: action,
      setCurrentEditingNoteId: action,
      updateContentLength: action,
      currentEditingNote: computed,
    });
  }

  get currentEditingNote() {
    return (
      this.noteList.find((note) => note.id === this.currentEditingNoteId) ||
      null
    );
  }

  addNewNote() {
    const newNote: NoteType = {
      id: uuidv4(),
      title: "Untitled",
      content: "",
    };

    this.noteList.push(newNote);
    this.currentEditingNoteId = newNote.id;
    this.updateContentLength(newNote.id);
  }

  editNote(field: string, value: string) {
    if (this.currentEditingNoteId) {
      const note = this.noteList.find(
        (item) => item.id === this.currentEditingNoteId
      );
      if (note) {
        if (field === "content" && value.length > this.MAX_CONTENT_LENGTH) {
          return;
        }
        
        note[field] = value;

        if (field === "content") {
          this.updateContentLength(note.id);
        }

        if (note.error) {
          note.error = undefined;
        }
      }
    }
  }

  removeNote(id: string) {
    this.noteList = this.noteList.filter((item) => item.id !== id);

    if (this.currentEditingNoteId === id) {
      const newCurrentId =
        this.noteList.length > 0 ? this.noteList[0].id : null;
      this.setCurrentEditingNoteId(newCurrentId);
    }
  }

  updateContentLength(id: string) {
    const note = this.noteList.find((item) => item.id === id);
    if (note) {
      this.contentLength = note.content.length;
    }
  }

  validateNote(note: NoteType): boolean {
    if (!note.title.trim()) {
      note.error = "Title is required";
      return false;
    }

    note.error = undefined;
    return true;
  }

  setCurrentEditingNoteId(id: string | null) {
    this.currentEditingNoteId = id;
    if (id) {
      this.updateContentLength(id);
    }
  }
}

const noteStore = new NoteStore();
export default noteStore;

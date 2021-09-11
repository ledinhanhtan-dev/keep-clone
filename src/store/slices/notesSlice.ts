import { RootState } from '../store';
import INote from 'src/interfaces/INote';
import { createSlice } from '@reduxjs/toolkit';

export interface NotesState {
  notes: INote[];
}

const initialState: NotesState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    getNotes: (state, action) => {
      state.notes = action.payload;
    },

    addNote: (state, action) => {
      state.notes.push(action.payload);
    },

    editNote: (state, action) => {
      const editedNote = action.payload as INote;

      const index = state.notes.findIndex(note => note._id === editedNote._id);
      state.notes[index] = editedNote;
    },

    deleteNote: (state, action) => {
      const noteId = action.payload;
      state.notes = state.notes.filter(note => note._id !== noteId);
    },

    toggleTodoById: (state, action) => {
      const { noteId, todoId } = action.payload;

      const targetedTodo = state.notes
        .find(note => note._id === noteId)!
        .todos.find(todo => todo._id === todoId)!;

      targetedTodo.checked = !targetedTodo.checked;
    },
  },
});

export const { getNotes, addNote, editNote, deleteNote, toggleTodoById } = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.notes;

export default notesSlice.reducer;

import INote from 'src/interfaces/INote';
import { createSlice } from '@reduxjs/toolkit';
import { DUMMY_NOTES } from 'src/constants/constants';
import { RootState } from '../store';

export interface NotesState {
  notes: INote[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: NotesState = {
  status: 'idle',
  notes: DUMMY_NOTES,
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },

    editNote: (state, action) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      state.notes[index] = action.payload;
    },

    deleteNote: (state, action) => {
      const id = action.payload;
      state.notes = state.notes.filter(note => note.id !== id);
    },

    toggleTodoById: (state, action) => {
      const noteId = action.payload.split('/')[0];
      const todoId = action.payload;

      const targetedTodo = state.notes
        .find(note => note.id === noteId)!
        .todos.find(todo => todo.id === todoId)!;

      targetedTodo.checked = !targetedTodo.checked;
    },
  },
});

// Public action
export const { addNote, editNote, deleteNote, toggleTodoById } = notesSlice.actions;
export const selectNotes = (state: RootState) => state.notes.notes;

// Reducer
export default notesSlice.reducer;

// Thunk

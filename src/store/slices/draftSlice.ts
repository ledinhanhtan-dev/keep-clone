import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';
import { ColorId, EMPTY_NOTE } from 'src/interfaces/INote';
import { noteHelper } from 'src/helpers/noteHelper';
import INote from 'src/interfaces/INote';
import ITodo from 'src/interfaces/ITodo';

interface Draft {
  draftNote: INote;
  isTouched: boolean;
}

const initialState: Draft = {
  // FIX: fixing isTouched checking algorithm
  isTouched: false,
  draftNote: EMPTY_NOTE,
};

export const draftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {
    // Title
    draftWriteTitle: (state, action) => {
      state.draftNote.title = action.payload as string;
      if (!state.isTouched) state.isTouched = true;
      if (state.draftNote.title === '' && state.draftNote.text === '') state.isTouched = false;
    },

    // Text
    draftWriteText: (state, action) => {
      state.draftNote.text = action.payload as string;
      if (!state.isTouched) state.isTouched = true;
      if (state.draftNote.title === '' && state.draftNote.text === '') state.isTouched = false;
    },

    // Todo
    draftWriteTodo: (state, action) => {
      const todoData = action.payload as ITodo;

      if (!state.isTouched) state.isTouched = true;
      const index = state.draftNote.todos.findIndex(todo => todo._id === todoData._id);

      state.draftNote.todos[index] = todoData;
    },

    draftAddTodo: (state, action) => {
      if (!state.isTouched) state.isTouched = true;
      state.draftNote.todos.push(action.payload as ITodo);
    },

    draftDeleteTodo: (state, action) => {
      const todoId = action.payload as string;
      if (!state.isTouched) state.isTouched = true;
      state.draftNote.todos = state.draftNote.todos.filter(todo => todo._id !== todoId);
    },

    draftSetTodo: (state, action) => {
      if (!state.isTouched) state.isTouched = true;
      state.draftNote.todos = action.payload as ITodo[];
    },

    draftToggleTodoDropdown: state => {
      if (!state.isTouched) state.isTouched = true;
      state.draftNote.noteData.isTodoDropdownActive =
        !state.draftNote.noteData.isTodoDropdownActive;
    },

    // Draft
    draftLoad: (state, action) => {
      state.draftNote = action.payload as INote;
    },

    draftReset: state => {
      state = initialState;
    },

    draftChangeNoteColor: (state, action) => {
      if (!state.isTouched) state.isTouched = true;
      state.draftNote.noteData.noteColor = action.payload as ColorId;
    },

    draftToggleNoteType: state => {
      const { draftNote } = state;
      if (!state.isTouched) state.isTouched = true;

      const { _id, text, todos } = draftNote;

      if (draftNote.noteData.noteType === 'text') {
        draftNote.todos = noteHelper.convertToNoteTodo(_id, text);
        draftNote.noteData.noteType = 'todo';
      } else {
        draftNote.text = noteHelper.convertToNoteText(todos);
        draftNote.noteData.noteType = 'text';
      }
    },
  },
});

export const {
  draftWriteTitle,
  draftWriteText,
  draftWriteTodo,
  draftAddTodo,
  draftDeleteTodo,
  draftSetTodo,
  draftToggleTodoDropdown,

  draftLoad,
  draftReset,
  draftToggleNoteType,
  draftChangeNoteColor,
} = draftSlice.actions;

export const selectDraft = (state: RootState) => state.draft;

export default draftSlice.reducer;

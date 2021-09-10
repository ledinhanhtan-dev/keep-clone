import { AppThunk, RootState } from '../store';
import { registerAddedTodoId } from './uiSlice';
import { createSlice } from '@reduxjs/toolkit';
import { EMPTY_NOTE } from 'src/interfaces/INote';
import { noteHelper } from 'src/helpers/noteHelper';
import INote from 'src/interfaces/INote';

interface Draft {
  isTouched: boolean;
  draftNote: INote;
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
    writeDraftTitle: (state, action) => {
      state.draftNote.title = action.payload;
      if (!state.isTouched) state.isTouched = true;
      if (state.draftNote.title === '' && state.draftNote.text === '') state.isTouched = false;
    },

    // Text
    writeDraftText: (state, action) => {
      state.draftNote.text = action.payload;
      if (!state.isTouched) state.isTouched = true;
      if (state.draftNote.title === '' && state.draftNote.text === '') state.isTouched = false;
    },

    // Todo
    writeDraftTodo: (state, action) => {
      const todoData = action.payload;
      if (!state.isTouched) state.isTouched = true;
      const index = state.draftNote.todos.findIndex(todo => todo.id === todoData.id);
      state.draftNote.todos[index] = todoData;
    },

    addDraftTodo: (state, action) => {
      if (!state.isTouched) state.isTouched = true;
      state.draftNote.todos.push(action.payload);
    },

    deleteDraftTodo: (state, action) => {
      const todoId = action.payload;
      if (!state.isTouched) state.isTouched = true;
      state.draftNote.todos = state.draftNote.todos.filter(todo => todo.id !== todoId);
    },

    setDraftTodo: (state, action) => {
      if (!state.isTouched) state.isTouched = true;
      state.draftNote.todos = action.payload;
    },

    toggleDraftTodoDropdownActive: state => {
      if (!state.isTouched) state.isTouched = true;
      state.draftNote.noteData.isTodoDropdownActive =
        !state.draftNote.noteData.isTodoDropdownActive;
    },

    // Draft
    loadDraft: (state, action) => {
      state.draftNote = action.payload;
    },

    resetDraft: state => {
      state.isTouched = initialState.isTouched;
      state.draftNote = initialState.draftNote;
    },

    changeDraftNoteColor: (state, action) => {
      if (!state.isTouched) state.isTouched = true;
      state.draftNote.noteData.noteColor = action.payload;
    },

    toggleDraftNoteType: state => {
      const { draftNote } = state;
      if (!state.isTouched) state.isTouched = true;

      if (draftNote.noteData.noteType === 'text') {
        draftNote.todos = noteHelper.convertToNoteTodo(draftNote.text);
        draftNote.noteData.noteType = 'todo';
      } else {
        draftNote.text = noteHelper.convertToNoteText(draftNote.todos);
        draftNote.noteData.noteType = 'text';
      }
    },
  },
});

export const {
  writeDraftTitle,
  writeDraftText,
  writeDraftTodo,
  addDraftTodo,
  deleteDraftTodo,
  setDraftTodo,
  toggleDraftTodoDropdownActive,

  loadDraft,
  resetDraft,
  toggleDraftNoteType,
  changeDraftNoteColor,
} = draftSlice.actions;

export const selectDraft = (state: RootState) => state.draft;

export default draftSlice.reducer;

export const addDraftTodoAndRegisterId =
  (text: string): AppThunk =>
  (dispatch, getState) => {
    const { id: currentNoteId, todos } = getState().draft.draftNote;
    const nextTodoId = noteHelper.generateNextTodoId(currentNoteId, todos);
    console.log(nextTodoId);

    dispatch(registerAddedTodoId(nextTodoId));
    dispatch(addDraftTodo({ id: nextTodoId, checked: false, text }));
  };

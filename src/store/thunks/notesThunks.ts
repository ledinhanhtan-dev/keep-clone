import * as api from 'src/api';
import { AppThunk } from '../store';
import { draftReset } from '../slices/draftSlice';
import { addNote, deleteNote, editNote, getNotes, toggleTodoById } from '../slices/notesSlice';

export const fetchNotes = (): AppThunk => async (dispatch, getState) => {
  const notes = await api.getNotes();
  dispatch(getNotes(notes));
};

export const addCurrentNote = (): AppThunk => (dispatch, getState) => {
  const { isTouched, draftNote } = getState().draft;
  if (!isTouched) return;

  api.addNote(draftNote);
  dispatch(addNote(draftNote));
};

export const editCurrentNote =
  (reset: boolean = true): AppThunk =>
  (dispatch, getState) => {
    const { isTouched, draftNote } = getState().draft;
    if (!isTouched) return;

    dispatch(editNote(draftNote));
    api.editNote(draftNote._id, draftNote);

    if (reset) dispatch(draftReset()); // Reset must be executed at the end!
  };

export const toggleTodoCurrentNote =
  (noteId: string, todoId: string): AppThunk =>
  dispatch => {
    api.toggleTodo(noteId, todoId);
    dispatch(toggleTodoById({ noteId, todoId }));
  };

export const deleteCurrentNote = (): AppThunk => (dispatch, getState) => {
  const { _id } = getState().draft.draftNote;
  dispatch(deleteNote(_id));
  api.deleteNote(_id!);
};

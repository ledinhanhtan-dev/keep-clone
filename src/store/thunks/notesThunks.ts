import { AppThunk } from '../store';
import { resetDraft } from '../slices/draftSlice';
import { noteHelper } from 'src/helpers/noteHelper';
import { addNote, deleteNote, editNote } from '../slices/notesSlice';

export const addCurrentNote = (): AppThunk => (dispatch, getState) => {
  const { isTouched, draftNote } = getState().draft;
  if (!isTouched) return;
  const { notes } = getState().notes;
  const newNote = { ...draftNote, id: noteHelper.generateNextNoteId(notes) };
  dispatch(addNote(newNote));
};

export const editCurrentNote =
  (alsoReset: boolean = true): AppThunk =>
  (dispatch, getState) => {
    const { isTouched, draftNote } = getState().draft;
    if (isTouched) dispatch(editNote(draftNote));
    if (alsoReset) dispatch(resetDraft());
  };

export const deleteCurrentNote = (): AppThunk => (dispatch, getState) => {
  const { id } = getState().draft.draftNote;
  dispatch(deleteNote(id));
};

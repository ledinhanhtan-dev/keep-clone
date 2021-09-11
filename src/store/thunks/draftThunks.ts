import { noteHelper } from 'src/helpers/noteHelper';
import { registerAddedTodoId } from '../slices/uiSlice';
import { draftAddTodo, draftToggleNoteType } from '../slices/draftSlice';
import { AppThunk } from '../store';
import { editCurrentNote } from './notesThunks';

export const draftAddTodoAndRegisterId =
  (text: string): AppThunk =>
  (dispatch, getState) => {
    const parentNote = getState().draft.draftNote._id;
    const _id = noteHelper.generateObjectId();

    dispatch(registerAddedTodoId(_id));
    dispatch(draftAddTodo({ _id, parentNote, checked: false, text }));
  };

export const toggleNoteType = (): AppThunk => async (dispatch, getState) => {
  const noteAddShow = getState().ui.noteAdd.show;
  const noteEditShow = getState().ui.noteEdit.show;

  dispatch(draftToggleNoteType());
  if (!noteAddShow && !noteEditShow) dispatch(editCurrentNote());
};

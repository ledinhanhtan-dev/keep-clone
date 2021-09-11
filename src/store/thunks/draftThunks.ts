import { noteHelper } from 'src/helpers/noteHelper';
import { registerAddedTodoId } from '../slices/uiSlice';
import { draftAddTodo } from '../slices/draftSlice';
import { AppThunk } from '../store';

export const draftAddTodoAndRegisterId =
  (text: string): AppThunk =>
  (dispatch, getState) => {
    const parentNote = getState().draft.draftNote._id;
    const _id = noteHelper.generateObjectId();

    dispatch(registerAddedTodoId(_id));
    dispatch(draftAddTodo({ _id, parentNote, checked: false, text }));
  };

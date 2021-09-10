import React from 'react';
import { resetDraft } from 'src/store/slices/draftSlice';
import { addCurrentNote, editCurrentNote } from 'src/store/thunks/notesThunks';
import {
  hideNoteAddAndResetDraft,
  hideNoteEdit,
  resetHiddenNoteId,
} from 'src/store/slices/uiSlice';
import { NoteVariation } from 'src/interfaces/INote';
import { useAppDispatch } from 'src/store/hooks';

import classes from './ButtonSquare.module.scss';

interface IProps {
  title: string;
  variation: NoteVariation;
}

const ButtonSquare: React.FC<IProps> = props => {
  const { title, variation } = props;
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    if (variation === 'add') {
      dispatch(addCurrentNote());
      dispatch(hideNoteAddAndResetDraft());
    }

    if (variation === 'edit') {
      dispatch(resetHiddenNoteId());
      dispatch(editCurrentNote());
      dispatch(hideNoteEdit());
      dispatch(resetDraft());
    }
  };

  return (
    <button className={classes.square} onClick={clickHandler}>
      {title}
    </button>
  );
};

export default ButtonSquare;

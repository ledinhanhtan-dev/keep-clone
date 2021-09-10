import React from 'react';
import { selectDraft } from 'src/store/slices/draftSlice';
import { editCurrentNote } from 'src/store/thunks/notesThunks';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { hideNoteEdit, resetHiddenNoteId, selectNoteEdit } from 'src/store/slices/uiSlice';
import Backdrop from 'src/components/UI/Portals/Backdrop';
import NoteItem from '../noteItem/NoteItem';

import classes from './NoteEdit.module.scss';

const NoteEdit: React.FC = () => {
  const dispatch = useAppDispatch();
  const { show } = useAppSelector(selectNoteEdit);
  const { draftNote } = useAppSelector(selectDraft);

  const hideNoteEditHandler = () => {
    dispatch(editCurrentNote());
    dispatch(resetHiddenNoteId());
    dispatch(hideNoteEdit());
  };

  return (
    <>
      {show && (
        <div className={classes.edit}>
          <NoteItem note={draftNote} variation="edit" />
        </div>
      )}
      <Backdrop show={show} onClick={hideNoteEditHandler} />
    </>
  );
};

export default NoteEdit;

import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { hideNoteAdd, selectColorMenu, selectNoteMenu } from 'src/store/slices/uiSlice';
import { selectDraft } from 'src/store/slices/draftSlice';
import { addCurrentNote } from 'src/store/thunks/notesThunks';
import useOnClickOutside from 'src/hooks/useOnClickOutside';
import NoteItem from '../NoteItem/NoteItem';

import classes from './NoteAdd.module.scss';

const NoteAdd: React.FC = () => {
  const dispatch = useAppDispatch();
  const noteAddRef = useRef<HTMLDivElement>(null);
  const noteMenuShow = useAppSelector(selectNoteMenu).show;
  const colorMenuShow = useAppSelector(selectColorMenu).show;
  const { draftNote } = useAppSelector(selectDraft);

  const clickOutsideHandler = () => {
    if (noteMenuShow || colorMenuShow) return;
    dispatch(addCurrentNote());
    dispatch(hideNoteAdd());
  };

  useOnClickOutside(noteAddRef, clickOutsideHandler);

  return (
    <div className={classes.add} ref={noteAddRef}>
      <NoteItem note={draftNote} variation="add" />
    </div>
  );
};

export default NoteAdd;

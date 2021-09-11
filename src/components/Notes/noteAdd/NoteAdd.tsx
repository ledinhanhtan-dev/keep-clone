import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
// prettier-ignore
import { hideNoteAddAndResetDraft, selectColorMenu, selectNoteMenu } from 'src/store/slices/uiSlice';
import { selectDraft } from 'src/store/slices/draftSlice';
import { addCurrentNote } from 'src/store/thunks/notesThunks';
import useOnClickOutside from 'src/hooks/useOnClickOutside';
import NoteItem from '../NoteItem/NoteItem';

import styles from './NoteAdd.module.scss';

const NoteAdd: React.FC = () => {
  const dispatch = useAppDispatch();
  const noteAddRef = useRef<HTMLDivElement>(null);
  const noteMenuShow = useAppSelector(selectNoteMenu).show;
  const colorMenuShow = useAppSelector(selectColorMenu).show;
  const { draftNote } = useAppSelector(selectDraft);

  const clickOutsideHandler = () => {
    // FIX: If so, have to manage every menu ===> Bad code
    if (!noteMenuShow && !colorMenuShow) {
      dispatch(addCurrentNote());
      dispatch(hideNoteAddAndResetDraft());
    }
  };

  // BUG:
  // BIGBUG: find a way to prevent everything until note add is close / prevent
  // + checking is Touched better
  // 1. After isTouched
  // 2. Click on the noteItem
  // 3. Auto added a duplicated note
  // MAYBE: addCurrentNote happen before resetDraft ====> the new noteEdit is blank!

  useOnClickOutside(noteAddRef, clickOutsideHandler);

  return (
    <div className={styles['note-add']} ref={noteAddRef}>
      <NoteItem note={draftNote} variation="add" />
    </div>
  );
};

export default NoteAdd;

import React, { useRef } from 'react';
import useOnClickOutside from 'src/hooks/useOnClickOutside';
import { deleteCurrentNote } from 'src/store/thunks/notesThunks';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { hideNoteEdit, hideNoteMenu, selectUI } from 'src/store/slices/uiSlice';
import { toggleNoteType } from 'src/store/thunks/draftThunks';
import { selectDraft } from 'src/store/slices/draftSlice';
import MenuItem from './MenuItem';

import classes from './NoteMenu.module.scss';

const NoteMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const ui = useAppSelector(selectUI);
  const { show, top, left, isFullMenu } = ui.noteMenu;
  const noteEditShow = ui.noteEdit.show;

  const noteMenuRef = useRef<HTMLDivElement>(null);
  const clickOutSideHandler = () => show && dispatch(hideNoteMenu());
  useOnClickOutside(noteMenuRef, clickOutSideHandler);

  // Delete Note
  const deleteNoteHandler = () => {
    dispatch(deleteCurrentNote());
    dispatch(hideNoteMenu());
    if (noteEditShow) dispatch(hideNoteEdit());
  };

  // Toggle Note type
  const { noteType } = useAppSelector(selectDraft).draftNote.noteData;
  const toggleNoteTypeHandler = () => {
    dispatch(toggleNoteType());
    dispatch(hideNoteMenu());
  };

  let style: Object = { display: 'none' };
  if (show) style = { display: 'block', top: top + 'px', left: left + 'px' };

  return (
    <div style={style} ref={noteMenuRef} className={classes.menu}>
      <ul role="menu">
        {isFullMenu && <MenuItem title="Delete note" onClick={deleteNoteHandler} />}
        <MenuItem title="Add label" />
        <MenuItem title="Add drawing" />
        <MenuItem
          onClick={toggleNoteTypeHandler}
          title={noteType === 'text' ? 'Show checkboxes' : 'Hide checkboxes'}
        />
        {isFullMenu && <MenuItem title="Make a copy" />}
        {isFullMenu && <MenuItem title="Copy to Google Docs" />}
      </ul>
    </div>
  );
};

export default NoteMenu;

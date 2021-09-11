import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { deleteCurrentNote, editCurrentNote } from 'src/store/thunks/notesThunks';
import { hideNoteEdit, hideNoteMenu, selectUIState } from 'src/store/slices/uiSlice';
import { draftReset, selectDraft, draftToggleNoteType } from 'src/store/slices/draftSlice';
import useOnClickOutside from 'src/hooks/useOnClickOutside';
import MenuItem from './MenuItem';

import classes from './NoteMenu.module.scss';

const NoteMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const ui = useAppSelector(selectUIState);
  const { show: noteMenuShow, top, left, isFullMenu } = ui.noteMenu;
  const noteEditShow = ui.noteEdit.show;
  const noteAddShow = ui.noteAdd.show;

  const noteMenuRef = useRef<HTMLDivElement>(null);
  const clickOutSideHandler = () => noteMenuShow && dispatch(hideNoteMenu());
  useOnClickOutside(noteMenuRef, clickOutSideHandler);

  // Hide NoteMenu and Edit
  const hideNoteMenuHandler = () => {
    dispatch(hideNoteMenu());
    dispatch(draftReset()); // Could let the Menu Item call the function
    if (noteEditShow) dispatch(hideNoteEdit());
  };

  // Delete Note
  const deleteNoteHandler = () => {
    dispatch(deleteCurrentNote());
    hideNoteMenuHandler();
  };

  const { noteType } = useAppSelector(selectDraft).draftNote.noteData;
  const toggleNoteTypeHandler = () => {
    dispatch(draftToggleNoteType());
    if (!noteEditShow && !noteAddShow) dispatch(editCurrentNote());
    dispatch(hideNoteMenu());
  };

  let style: Object = { display: 'none' };
  if (noteMenuShow) style = { display: 'block', top: top + 'px', left: left + 'px' };

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

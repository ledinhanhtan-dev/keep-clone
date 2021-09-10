import React, { MouseEvent } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { NoteVariation } from 'src/interfaces/INote';
import { noteHelper } from 'src/helpers/noteHelper';
import { showColorMenu, showNoteMenu } from 'src/store/slices/uiSlice';
import ButtonSquare from 'src/components/UI/Button/ButtonSquare';
import Button from 'src/components/UI/Button/Button';

import classes from './NoteControls.module.scss';

interface IProps {
  variation: NoteVariation;
}

const NoteControls: React.FC<IProps> = props => {
  const { variation } = props;
  const dispatch = useAppDispatch();

  const showColorMenuHandler = (e: MouseEvent) => {
    const { top, left } = noteHelper.getButtonRect(e);
    dispatch(showColorMenu({ show: true, top, left }));
  };

  const showNoteMenuHandler = (e: MouseEvent) => {
    const { bottom, left } = noteHelper.getButtonRect(e);
    dispatch(showNoteMenu({ show: true, top: bottom, left, isFullMenu: variation !== 'add' }));
  };

  return (
    <div className={classes.controls}>
      <div className={classes.tray}>
        <Button title="Remind me" iconId="bell-filled" size="small" />
        <Button title="Collaborator" iconId="collaborator" size="small" />
        <Button size="small" iconId="palette" title="Change color" onClick={showColorMenuHandler} />
        <Button title="Add image" iconId="image" size="small" />
        <Button title="Archive" iconId="archive" size="small" />
        <Button title="More" iconId="dots-three" size="small" onClick={showNoteMenuHandler} />
        {variation !== 'item' && (
          <>
            <Button title="Undo" iconId="backward" size="small" />
            <Button title="Redo" iconId="forward" size="small" />
          </>
        )}
      </div>
      {variation !== 'item' && <ButtonSquare title="Close" variation={variation} />}
    </div>
  );
};

export default NoteControls;

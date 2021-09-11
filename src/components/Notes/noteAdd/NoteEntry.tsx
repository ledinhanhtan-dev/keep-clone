import React from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { noteHelper } from 'src/helpers/noteHelper';
import { draftLoad } from 'src/store/slices/draftSlice';
import { showNoteAdd } from 'src/store/slices/uiSlice';
import Button from 'src/components/UI/Button/Button';
import Card from 'src/components/UI/Card/Card';

import classes from './NoteEntry.module.scss';

const NoteEntry: React.FC = () => {
  const dispatch = useAppDispatch();

  const inputClickHandler = () => {
    dispatch(draftLoad(noteHelper.generateEmptyNote('text')));
    dispatch(showNoteAdd());
  };

  const listClickHandler = () => {
    dispatch(draftLoad(noteHelper.generateEmptyNote('todo')));
    dispatch(showNoteAdd());
  };

  return (
    <Card className={classes.entry} shadow={true} color="default">
      <input type="text" placeholder="Take a note..." onClick={inputClickHandler} />
      <Button size="medium" title="New list" iconId="checkbox-checked" onClick={listClickHandler} />
      <Button title="New note with drawing" iconId="brush" size="medium" />
      <Button size="medium" iconId="image" title="New note with image" />
    </Card>
  );
};

export default NoteEntry;

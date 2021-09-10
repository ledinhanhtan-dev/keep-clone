import React from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { EMPTY_NOTE } from 'src/interfaces/INote';
import { loadDraft, toggleDraftNoteType } from 'src/store/slices/draftSlice';
import { showNoteAdd } from 'src/store/slices/uiSlice';
import Button from 'src/components/UI/Button/Button';
import Card from 'src/components/UI/Card/Card';

import classes from './NoteEntry.module.scss';

const NoteEntry: React.FC = () => {
  const dispatch = useAppDispatch();
  const showNoteAddHandler = () => {
    dispatch(showNoteAdd());
  };

  const newListClickHandler = () => {
    dispatch(loadDraft(EMPTY_NOTE));
    dispatch(toggleDraftNoteType());
    dispatch(showNoteAdd());
  };

  return (
    <Card className={classes.entry} shadow={true} color="default">
      <input type="text" placeholder="Take a note..." onClick={showNoteAddHandler} />
      <Button
        size="medium"
        title="New list"
        iconId="checkbox-checked"
        onClick={newListClickHandler}
      />
      <Button title="New note with drawing" iconId="brush" size="medium" />
      <Button title="New note with image" iconId="image" size="medium" />
    </Card>
  );
};

export default NoteEntry;

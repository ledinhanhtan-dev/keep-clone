import React, { MouseEvent } from 'react';
import Card from 'src/components/UI/Card/Card';
import NoteContent from './NoteContent/NoteContent';
import Button from 'src/components/UI/Button/Button';
import NoteControls from './NoteControls/NoteControls';
import { draftLoad } from 'src/store/slices/draftSlice';
import INote, { NoteVariation } from 'src/interfaces/INote';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectHiddenNoteId } from 'src/store/slices/uiSlice';
import { noteHelper } from 'src/helpers/noteHelper';

import classes from './NoteItem.module.scss';

interface IProps {
  note: INote;
  variation: NoteVariation;
}

const NoteItem: React.FC<IProps> = props => {
  const dispatch = useAppDispatch();
  const { note, variation } = props;
  const hiddenId = useAppSelector(selectHiddenNoteId);

  const draftLoadHandler = (e: MouseEvent<HTMLDivElement>) => {
    const clickedOnCheckbox = noteHelper.isClickedOn(e.target, 'checkbox');

    if (variation === 'item' && !clickedOnCheckbox) dispatch(draftLoad(note));
  };

  return (
    <Card
      className={classes.item}
      onClick={draftLoadHandler}
      color={note.noteData.noteColor}
      hide={note._id === hiddenId && variation === 'item'}
    >
      <Button title="Pin note" iconId="pin" size="medium" className={classes.pin} />
      <NoteContent variation={variation} noteContent={note} />
      <NoteControls variation={variation} />
    </Card>
  );
};

export default NoteItem;

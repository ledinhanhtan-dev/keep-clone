import React, { MouseEvent } from 'react';
import Card from 'src/components/UI/Card/Card';
import Button from 'src/components/UI/Button/Button';
import NoteContent from './noteContent/NoteContent';
import NoteControls from './noteControls/NoteControls';
import { loadDraft } from 'src/store/slices/draftSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import INote, { NoteVariation } from 'src/interfaces/INote';

import styles from './NoteItem.module.scss';
import { selectHiddenNoteId } from 'src/store/slices/uiSlice';
import { noteHelper } from 'src/helpers/noteHelper';

interface IProps {
  note: INote;
  variation: NoteVariation;
}

const NoteItem: React.FC<IProps> = props => {
  const dispatch = useAppDispatch();
  const { note, variation } = props;
  const hiddenId = useAppSelector(selectHiddenNoteId);

  const loadDraftHandler = (e: MouseEvent<HTMLDivElement>) => {
    const clickedOnCheckbox = noteHelper.isClickedOn(e.target as HTMLElement, 'checkbox');

    if (variation === 'item' && !clickedOnCheckbox) dispatch(loadDraft(note));
  };

  return (
    <Card
      className={styles.item}
      onClick={loadDraftHandler}
      color={note.noteData.noteColor}
      hide={note.id === hiddenId && variation === 'item'}
    >
      <Button title="Pin note" iconId="pin" size="medium" className={styles.pin} />
      <NoteContent variation={variation} noteContent={note} />
      <NoteControls variation={variation} />
    </Card>
  );
};

export default NoteItem;

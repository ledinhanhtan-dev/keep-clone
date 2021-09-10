import React from 'react';
import { useAppSelector } from 'src/store/hooks';
import { selectNotes } from 'src/store/slices/notesSlice';
import NoteItem from '../noteItem/NoteItem';

import classes from './NoteList.module.scss';

const NoteList: React.FC = () => {
  const notes = useAppSelector(selectNotes);
  const reversedNotes = [...notes].reverse();

  return (
    <div className={classes.list}>
      {reversedNotes.map(note => (
        <NoteItem key={note.id} note={note} variation="item" />
      ))}
    </div>
  );
};

export default NoteList;

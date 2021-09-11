import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectNotes } from 'src/store/slices/notesSlice';
import { fetchNotes } from 'src/store/thunks/notesThunks';
import NoteItem from '../NoteItem/NoteItem';

import classes from './NoteList.module.scss';

const NoteList: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => dispatch(fetchNotes()), [dispatch]);
  const notes = useAppSelector(selectNotes);

  return (
    <div className={classes.list}>
      {notes.map(note => (
        <NoteItem key={note._id} note={note} variation="item" />
      ))}
    </div>
  );
};

export default NoteList;

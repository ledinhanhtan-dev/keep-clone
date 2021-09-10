import React from 'react';
import NoteAdd from './NoteAdd';
import NoteEntry from './NoteEntry';
import { useSelector } from 'react-redux';
import { selectNoteAdd } from 'src/store/slices/uiSlice';

import classes from './NoteSwitch.module.scss';

const NoteSwitch: React.FC = () => {
  const { show } = useSelector(selectNoteAdd);

  return (
    <div className={classes.switch}>
      {!show && <NoteEntry />}
      {show && <NoteAdd />}
    </div>
  );
};

export default NoteSwitch;

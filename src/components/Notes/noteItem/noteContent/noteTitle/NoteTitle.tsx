import React, { ChangeEvent } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { draftWriteTitle } from 'src/store/slices/draftSlice';
import { NoteVariation } from 'src/interfaces/INote';

import classes from './NoteTitle.module.scss';

type eInput = ChangeEvent<HTMLInputElement>;

interface IProps {
  title: string;
  variation: NoteVariation;
}

const NoteTitle: React.FC<IProps> = props => {
  const { title, variation } = props;
  const dispatch = useAppDispatch();

  const titleChangeHandler = (e: eInput) => {
    dispatch(draftWriteTitle(e.target.value));
  };

  let variationClass = '';
  if (variation === 'edit') variationClass = classes.edit;
  if (variation === 'add') variationClass = classes.add;

  const classList = `${classes.title} ${variationClass}`;

  return (
    <input
      type="text"
      placeholder="Title"
      onChange={titleChangeHandler}
      className={classList}
      value={title}
    />
  );
};

export default NoteTitle;

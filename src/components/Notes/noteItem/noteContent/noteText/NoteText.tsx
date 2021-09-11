import React, { ChangeEvent, useEffect, useRef } from 'react';
import { draftWriteText } from 'src/store/slices/draftSlice';
import { NoteVariation } from 'src/interfaces/INote';
import { useAppDispatch } from 'src/store/hooks';

import classes from './NoteText.module.scss';

type eInput = ChangeEvent<HTMLInputElement>;

interface IProps {
  text: string;
  variation: NoteVariation;
}

const NoteText: React.FC<IProps> = props => {
  const dispatch = useAppDispatch();
  const { text, variation } = props;
  const textInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    variation === 'add' && textInputRef.current?.focus();
  }, [variation]);

  const textChangeHandler = (e: eInput) => {
    dispatch(draftWriteText(e.target.value));
  };

  let variationClass = '';
  if (variation === 'edit') variationClass = classes.edit;

  const classList = `${classes.text} ${variationClass}`;

  return (
    <input
      value={text}
      placeholder="Take a note"
      onChange={textChangeHandler}
      className={classList}
      ref={textInputRef}
    />
  );
};

export default NoteText;

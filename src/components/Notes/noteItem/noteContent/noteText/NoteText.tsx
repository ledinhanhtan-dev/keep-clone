import React, { ChangeEvent, useEffect, useRef } from 'react';
import { writeDraftText } from 'src/store/slices/draftSlice';
import { NoteVariation } from 'src/interfaces/INote';
import { useAppDispatch } from 'src/store/hooks';

import classes from './NoteText.module.scss';

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

  const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(writeDraftText(e.target.value));
  };

  const baseClass = classes.text;
  let variationClass = '';
  if (variation === 'edit') variationClass = classes.edit;

  const classList = `${baseClass} ${variationClass}`;

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

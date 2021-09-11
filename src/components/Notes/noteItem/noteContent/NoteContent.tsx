import React, { MouseEvent } from 'react';
import INote, { NoteVariation } from 'src/interfaces/INote';
import NoteTitle from './NoteTitle/NoteTitle';
import NoteImage from './NoteImage/NoteImage';
import NoteLabel from './NoteLabel/NoteLabel';
import NoteTodo from './NoteTodo/NoteTodo';
import NoteText from './NoteText/NoteText';

import classes from './NoteContent.module.scss';

type eDiv = MouseEvent<HTMLDivElement>;

interface IProps {
  note: INote;
  variation: NoteVariation;
  onClick: (e: eDiv) => void;
}

const NoteContent: React.FC<IProps> = props => {
  const { variation, note, onClick } = props;
  const { title, text, images, todos, labels, noteData } = note;
  const { noteType, isDropdownActive } = noteData;

  return (
    <div className={classes.content} onClick={onClick}>
      {images.length > 0 && <NoteImage images={images} />}

      <NoteTitle title={title} variation={variation} />

      {noteType === 'text' && <NoteText text={text} variation={variation} />}

      {noteType === 'todo' && (
        <NoteTodo todos={todos} variation={variation} isDropdownActive={isDropdownActive} />
      )}

      <NoteLabel labels={labels} />
    </div>
  );
};

export default NoteContent;

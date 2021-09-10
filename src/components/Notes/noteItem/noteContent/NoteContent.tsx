import React, { MouseEvent, useCallback } from 'react';
import INote, { NoteVariation } from 'src/interfaces/INote';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectNoteAdd, setHiddenNoteId, showNoteEdit } from 'src/store/slices/uiSlice';
import { noteHelper } from 'src/helpers/noteHelper';
import NoteTitle from './noteTitle/NoteTitle';
import NoteImage from './noteImage/NoteImage';
import NoteLabel from './noteLabel/NoteLabel';
import NoteTodo from './noteTodo/NoteTodo';
import NoteText from './noteText/NoteText';

import classes from './NoteContent.module.scss';

interface IProps {
  noteContent: INote;
  variation: NoteVariation;
}

const NoteContent: React.FC<IProps> = props => {
  const dispatch = useAppDispatch();
  const { variation, noteContent } = props;
  const noteAddShow = useAppSelector(selectNoteAdd).show;
  const { id, title, text, images, todos, labels, noteData } = noteContent;

  const showNoteEditHandler = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const clickedOnCheckbox = noteHelper.isClickedOn(e.target as HTMLElement, 'checkbox');

      if (variation === 'item' && !noteAddShow && !clickedOnCheckbox) {
        dispatch(showNoteEdit());
        dispatch(setHiddenNoteId(id));
      }
    },
    [variation, noteAddShow, id, dispatch]
  );

  return (
    <div className={classes.content} onClick={showNoteEditHandler}>
      {images.length > 0 && <NoteImage images={images} />}

      <NoteTitle title={title} variation={variation} />

      {noteData.noteType === 'text' && <NoteText text={text} variation={variation} />}

      {noteData.noteType === 'todo' && (
        <NoteTodo
          todos={todos}
          variation={variation}
          isDropdownActive={noteData.isTodoDropdownActive}
        />
      )}

      <NoteLabel labels={labels} />
    </div>
  );
};

export default NoteContent;

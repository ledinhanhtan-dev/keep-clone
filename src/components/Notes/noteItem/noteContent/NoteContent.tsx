import React, { MouseEvent, useCallback } from 'react';
import INote, { NoteVariation } from 'src/interfaces/INote';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectNoteAdd, setHiddenNoteId, showNoteEdit } from 'src/store/slices/uiSlice';
import { noteHelper } from 'src/helpers/noteHelper';
import NoteTitle from './NoteTitle/NoteTitle';
import NoteImage from './NoteImage/NoteImage';
import NoteLabel from './NoteLabel/NoteLabel';
import NoteTodo from './NoteTodo/NoteTodo';
import NoteText from './NoteText/NoteText';

import classes from './NoteContent.module.scss';

interface IProps {
  noteContent: INote;
  variation: NoteVariation;
}

const NoteContent: React.FC<IProps> = props => {
  const dispatch = useAppDispatch();
  const { variation, noteContent } = props;
  const noteAddShow = useAppSelector(selectNoteAdd).show;
  const { _id, title, text, images, todos, labels, noteData } = noteContent;

  const showNoteEditHandler = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const clickedOnCheckbox = noteHelper.isClickedOn(e.target, 'checkbox');

      if (variation === 'item' && !noteAddShow && !clickedOnCheckbox) {
        dispatch(showNoteEdit());
        dispatch(setHiddenNoteId(_id));
      }
    },
    [variation, noteAddShow, _id, dispatch]
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

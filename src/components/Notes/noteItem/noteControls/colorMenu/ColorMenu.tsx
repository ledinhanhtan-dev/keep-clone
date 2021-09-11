import React, { useEffect, useRef, useState } from 'react';
import { draftChangeNoteColor, selectDraft } from 'src/store/slices/draftSlice';
import { hideColorMenu, selectColorMenu, selectUI } from 'src/store/slices/uiSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { editCurrentNote } from 'src/store/thunks/notesThunks';
import useOnClickOutside from 'src/hooks/useOnClickOutside';
import { ColorId } from 'src/interfaces/INote';

import classes from './ColorMenu.module.scss';
import ColorItem from './ColorItem';

// prettier-ignore
const colorIdList: ColorId[] = ['default' , 'red' , 'orange' , 'yellow' , 'green' , 'teal' , 'blue' , 'dark-blue' , 'purple' , 'pink' , 'brown' , 'gray']

const ColorMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const [menuHeight, setMenuHeight] = useState(0);
  const colorMenuRef = useRef<HTMLDivElement>(null);
  const { show, top, left } = useAppSelector(selectColorMenu);
  const selectedColor = useAppSelector(selectDraft).draftNote.noteData.noteColor;
  const noteEditShow = useAppSelector(selectUI).noteEdit.show;
  const noteAddShow = useAppSelector(selectUI).noteAdd.show;

  useEffect(() => setMenuHeight(colorMenuRef.current?.offsetHeight!), [show]);

  const clickOutSideHandler = () => show && dispatch(hideColorMenu());
  useOnClickOutside(colorMenuRef, clickOutSideHandler);

  const changeColorHandler = (colorId: ColorId) => {
    dispatch(draftChangeNoteColor(colorId));

    if (!noteEditShow && !noteAddShow) dispatch(editCurrentNote(false));
  };

  let style: {} = { display: 'none' };
  if (show) style = { display: 'grid', top: top - menuHeight, left };

  return (
    <div className={classes.menu} ref={colorMenuRef} style={style}>
      {colorIdList.map(colorId => (
        <ColorItem
          key={colorId}
          colorId={colorId}
          selectedColor={selectedColor}
          onChangeColor={changeColorHandler}
        />
      ))}
    </div>
  );
};

export default ColorMenu;

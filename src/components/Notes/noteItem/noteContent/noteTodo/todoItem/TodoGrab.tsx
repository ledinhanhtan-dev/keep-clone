import React from 'react';
import Svg from 'src/components/UI/Svg/Svg';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import classes from './TodoGrab.module.scss';
import { NoteVariation } from 'src/interfaces/INote';

interface IProps {
  className: string;
  variation: NoteVariation;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
}

const TodoGrab: React.FC<IProps> = props => {
  const { className, variation, dragHandleProps } = props;

  const classList = `${classes.grab} ${className}`;

  let style: Object = {};
  if (variation === 'item') style = { display: 'none' };

  return (
    <div className={classList} style={style} {...dragHandleProps}>
      <Svg iconId="dots-six" />
    </div>
  );
};

export default TodoGrab;

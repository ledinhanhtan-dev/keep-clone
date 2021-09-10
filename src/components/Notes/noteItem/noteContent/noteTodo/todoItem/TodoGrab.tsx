import React from 'react';
import Svg from 'src/components/UI/Svg/Svg';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import classes from './TodoGrab.module.scss';

interface IProps {
  display: boolean;
  className: string;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
}

const TodoGrab: React.FC<IProps> = props => {
  const { display, className, dragHandleProps } = props;

  const classList = `${classes.grab} ${className}`;

  return (
    <div className={classList} style={display ? {} : { display: 'none' }} {...dragHandleProps}>
      <Svg iconId="dots-six" />
    </div>
  );
};

export default TodoGrab;

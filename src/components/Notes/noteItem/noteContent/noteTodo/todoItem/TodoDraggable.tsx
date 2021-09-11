import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { NoteVariation } from 'src/interfaces/INote';
import ITodo from 'src/interfaces/ITodo';
import TodoItem from './TodoItem';

interface IProps {
  todo: ITodo;
  index: number;
  variation: NoteVariation;
}

const TodoDraggable: React.FC<IProps> = props => {
  const { todo, index } = props;

  return (
    <Draggable draggableId={todo._id} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <TodoItem
            {...props}
            dragHandleProps={provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          />
        </div>
      )}
    </Draggable>
  );
};

export default TodoDraggable;

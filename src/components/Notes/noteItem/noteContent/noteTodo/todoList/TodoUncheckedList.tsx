import React from 'react';
import ITodo from 'src/interfaces/ITodo';
import { Droppable } from 'react-beautiful-dnd';
import { NoteVariation } from 'src/interfaces/INote';
import TodoDraggable from '../TodoItem/TodoDraggable';

import classes from './TodoUncheckedList.module.scss';

interface IProps {
  todos: ITodo[];
  variation: NoteVariation;
}

const TodoUncheckedList: React.FC<IProps> = props => {
  const { todos, variation } = props;

  return (
    <Droppable droppableId="unchecked-todos">
      {provided => (
        <div className={classes.list} ref={provided.innerRef} {...provided.droppableProps}>
          {todos.map((todo, index) => (
            <TodoDraggable key={todo._id} todo={todo} index={index} variation={variation} />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TodoUncheckedList;

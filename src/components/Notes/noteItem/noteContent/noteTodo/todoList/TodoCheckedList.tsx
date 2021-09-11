import React from 'react';
import ITodo from 'src/interfaces/ITodo';
import TodoItem from '../TodoItem/TodoItem';
import { NoteVariation } from 'src/interfaces/INote';

import classes from './TodoCheckedList.module.scss';

interface IProps {
  todos: ITodo[];
  variation: NoteVariation;
}

const TodoCheckedList: React.FC<IProps> = props => {
  const { todos, variation } = props;

  return (
    <div className={classes.list}>
      {todos.map((todo, index) => (
        <TodoItem
          todo={todo}
          index={index}
          key={todo._id}
          isDragging={false}
          variation={variation}
          dragHandleProps={undefined}
        />
      ))}
    </div>
  );
};

export default TodoCheckedList;

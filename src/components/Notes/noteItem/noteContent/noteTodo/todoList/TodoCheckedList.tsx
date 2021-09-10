import React from 'react';
import ITodo from 'src/interfaces/ITodo';
import TodoItem from '../todoItem/TodoItem';
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
          key={todo.id}
          todo={todo}
          index={index}
          variation={variation}
          isDragging={false}
          dragHandleProps={undefined}
        />
      ))}
    </div>
  );
};

export default TodoCheckedList;

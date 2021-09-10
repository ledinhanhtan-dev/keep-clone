import React from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { NoteVariation } from 'src/interfaces/INote';
import { setDraftTodo, toggleDraftTodoDropdownActive } from 'src/store/slices/draftSlice';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TodoUncheckedList from './todoList/TodoUncheckedList';
import TodoCheckedList from './todoList/TodoCheckedList';
import TodoDropdown from './todoDropdown/TodoDropdown';
import ITodo from 'src/interfaces/ITodo';
import TodoAdd from './todoAdd/TodoAdd';

import classes from './NoteTodo.module.scss';

interface IProps {
  todos: ITodo[];
  isDropdownActive: boolean;
  variation: NoteVariation;
}

const NoteTodo: React.FC<IProps> = props => {
  const dispatch = useAppDispatch();
  const { todos, variation, isDropdownActive } = props;

  const uncheckedTodos = todos.filter(todo => todo.checked === false);
  const checkedTodos = todos.filter(todo => todo.checked === true);

  // DRAG END
  const dragEndHandler = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Guard 1: drop to nowhere
    if (!destination) return;

    // Guard 2: drop on the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    // Re-ordering:
    const editedTodos = [...uncheckedTodos];
    const draggingTodo = editedTodos.find(todo => todo.id === draggableId)!;
    editedTodos.splice(source.index, 1);
    editedTodos.splice(destination.index, 0, draggingTodo);

    dispatch(setDraftTodo([...editedTodos, ...checkedTodos]));
  };

  return (
    <div className={classes.todo}>
      <DragDropContext onDragEnd={dragEndHandler}>
        <TodoUncheckedList todos={uncheckedTodos} variation={variation} />
      </DragDropContext>

      {variation !== 'item' && <TodoAdd focus={todos.length === 0} />}

      {checkedTodos.length !== 0 && (
        <TodoDropdown
          active={isDropdownActive}
          checkedTodosLength={checkedTodos.length}
          onClick={() => dispatch(toggleDraftTodoDropdownActive())}
        />
      )}

      {isDropdownActive && <TodoCheckedList variation={variation} todos={checkedTodos} />}
    </div>
  );
};

export default NoteTodo;

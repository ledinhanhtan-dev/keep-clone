import React, { ChangeEvent, useEffect, useRef } from 'react';
import { deleteDraftTodo, writeDraftTodo } from 'src/store/slices/draftSlice';
import { resetAddedTodoId, selectUIState } from 'src/store/slices/uiSlice';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { toggleTodoById } from 'src/store/slices/notesSlice';
import { NoteVariation } from 'src/interfaces/INote';
import Button from 'src/components/UI/Button/Button';
import ITodo from 'src/interfaces/ITodo';
import TodoGrab from './TodoGrab';
import TodoCheckbox from './TodoCheckbox';

import classes from './TodoItem.module.scss';

type eInput = ChangeEvent<HTMLInputElement>;

interface IProps {
  todo: ITodo;
  index: number;
  isDragging: boolean;
  variation: NoteVariation;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
}

const TodoItem: React.FC<IProps> = props => {
  const dispatch = useAppDispatch();
  const { todo, variation, isDragging, dragHandleProps } = props;
  const { id, checked, text } = todo;

  // Focus on the last, recently added todo right after
  const todoTextRef = useRef<HTMLInputElement>(null);
  const { recentlyAddedTodoId } = useAppSelector(selectUIState);
  useEffect(() => {
    if (text.length === 0 && variation === 'add') todoTextRef.current?.focus();

    if (id === recentlyAddedTodoId) {
      todoTextRef.current?.focus();
      dispatch(resetAddedTodoId());
    }
  }, [id, text, variation, recentlyAddedTodoId, dispatch]);

  // Remove focus when dragging todo
  useEffect(() => {
    if (isDragging) todoTextRef.current?.blur();
  }, [isDragging]);

  const checkedChangedHandler = (bangedChecked: boolean) => {
    if (variation === 'item') dispatch(toggleTodoById(id));
    else dispatch(writeDraftTodo({ id, checked: bangedChecked, text }));
  };

  const textChangeHandler = (e: eInput) => {
    dispatch(writeDraftTodo({ id, checked, text: e.target.value }));
  };

  const baseClass = classes.item;
  let draggingClass = '';
  let variationClass = '';
  if (isDragging) draggingClass = classes.dragging;
  if (variation === 'edit') variationClass = classes.edit;

  return (
    <div className={`${baseClass} ${draggingClass} ${variationClass}`}>
      <TodoGrab
        className={classes.grab}
        display={variation === 'edit' && !checked}
        dragHandleProps={dragHandleProps}
      />

      <TodoCheckbox
        checked={checked}
        variation={variation}
        onCheckedChange={checkedChangedHandler}
      />

      <input
        type="text"
        value={text}
        placeholder={''}
        ref={todoTextRef}
        onChange={textChangeHandler}
        style={checked ? { textDecoration: 'line-through' } : {}}
      />

      {variation === 'edit' && (
        <Button
          title="Delete"
          iconId="x"
          size="smol"
          className={classes.delete}
          onClick={() => dispatch(deleteDraftTodo(todo.id))}
        />
      )}
    </div>
  );
};

export default TodoItem;

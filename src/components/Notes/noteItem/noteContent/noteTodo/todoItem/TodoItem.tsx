import React, { ChangeEvent, useEffect, useRef } from 'react';
import { draftDeleteTodo, draftWriteTodo } from 'src/store/slices/draftSlice';
import { resetAddedTodoId, selectUIState } from 'src/store/slices/uiSlice';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { toggleTodoCurrentNote } from 'src/store/thunks/notesThunks';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
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
  const { _id, parentNote, checked, text } = todo;

  // Focus on the last, recently added todo right after
  const todoTextRef = useRef<HTMLInputElement>(null);
  const { recentlyAddedTodoId } = useAppSelector(selectUIState);
  useEffect(() => {
    if (text.length === 0 && variation === 'add') todoTextRef.current?.focus();

    if (_id === recentlyAddedTodoId) {
      todoTextRef.current?.focus();
      dispatch(resetAddedTodoId());
    }
  }, [_id, text, variation, recentlyAddedTodoId, dispatch]);

  // Remove focus when dragging todo
  useEffect(() => {
    if (isDragging) todoTextRef.current?.blur();
  }, [isDragging]);

  const checkedChangedHandler = (bangedChecked: boolean) => {
    // FIX: ALSO EDIT CURRENT NOTE
    if (variation === 'item') dispatch(toggleTodoCurrentNote(parentNote, _id));
    else dispatch(draftWriteTodo({ ...todo, checked: bangedChecked }));
  };

  const textChangeHandler = (e: eInput) => {
    dispatch(draftWriteTodo({ ...todo, text: e.target.value }));
  };

  let draggingClass = '';
  let variationClass = '';
  if (isDragging) draggingClass = classes.dragging;
  if (variation === 'edit') variationClass = classes.edit;

  const classList = `${classes.item} ${draggingClass} ${variationClass}`;

  return (
    <div className={classList}>
      <TodoGrab
        className={classes.grab}
        dragHandleProps={dragHandleProps}
        display={variation !== 'item' && !checked}
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
          onClick={() => dispatch(draftDeleteTodo(todo._id))}
        />
      )}
    </div>
  );
};

export default TodoItem;

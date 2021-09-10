import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { addDraftTodoAndRegisterId } from 'src/store/slices/draftSlice';
import { useAppDispatch } from 'src/store/hooks';
import Svg from 'src/components/UI/Svg/Svg';

import classes from './TodoAdd.module.scss';

type eInput = ChangeEvent<HTMLInputElement>;

interface ITodoAddProps {
  focus: boolean;
}

const TodoAdd: React.FC<ITodoAddProps> = props => {
  const { focus } = props;
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus) inputRef.current?.focus();
  }, [focus]);

  const textChangeHandler = (e: eInput) => {
    setText('');
    dispatch(addDraftTodoAndRegisterId(e.target.value));
  };

  return (
    <div className={classes.add}>
      <div className={classes.plus}>
        <Svg iconId="plus" />
      </div>

      <input
        type="text"
        value={text}
        ref={inputRef}
        placeholder="List item"
        className={classes.input}
        onChange={textChangeHandler}
      />
    </div>
  );
};

export default TodoAdd;

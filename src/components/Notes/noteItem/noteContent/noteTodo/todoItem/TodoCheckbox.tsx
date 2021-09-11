import React from 'react';
import Svg from 'src/components/UI/Svg/Svg';
import { NoteVariation } from 'src/interfaces/INote';

import classes from './TodoCheckbox.module.scss';

interface IProps {
  checked: boolean;
  variation: NoteVariation;
  onCheckedChange: (bangedChecked: boolean) => void;
}

const TodoCheckbox: React.FC<IProps> = props => {
  const { checked, variation, onCheckedChange } = props;

  let style: {} = {};
  if (variation !== 'item') style = { left: '1.5rem' };

  return (
    <div
      aria-checked
      style={style}
      role="checkbox"
      className={classes.checkbox}
      onClick={onCheckedChange.bind(null, !checked)}
    >
      {!checked && <Svg iconId="checkbox" className="checkbox" />}
      {checked && <Svg iconId="checkbox-checked" className="checkbox" />}
    </div>
  );
};

export default TodoCheckbox;

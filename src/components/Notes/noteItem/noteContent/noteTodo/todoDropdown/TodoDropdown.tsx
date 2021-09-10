import React from 'react';
import Svg from 'src/components/UI/Svg/Svg';

import classes from './TodoDropdown.module.scss';

interface IProps {
  active: boolean;
  onClick: () => void;
  checkedTodosLength: number;
}

const TodoDropdown: React.FC<IProps> = props => {
  const { active, onClick, checkedTodosLength: n } = props;

  const value = `${n} Completed item${n === 1 ? '' : 's'}`;

  const chevronRotate = active ? {} : { transform: 'rotateZ(-90deg)' };

  return (
    <div className={classes.dropdown} onClick={onClick}>
      <div className={classes.chevron} style={chevronRotate}>
        <Svg iconId="chevron" />
      </div>

      <input type="text" value={value} readOnly={true} className={classes.input} />
    </div>
  );
};

export default TodoDropdown;

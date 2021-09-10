import React from 'react';

import classes from './MenuItem.module.scss';

interface IProps {
  title: string;
  onClick?: () => void;
}

const MenuItem: React.FC<IProps> = props => {
  const { title, onClick } = props;

  return (
    <li className={classes.item} role="menuitem" onClick={onClick}>
      {title}
    </li>
  );
};

export default MenuItem;

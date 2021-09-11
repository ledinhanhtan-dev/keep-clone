import React, { MouseEvent } from 'react';

import classes from './Card.module.scss';

type eDiv = MouseEvent<HTMLDivElement>;

interface IProps {
  color: string;
  hide?: boolean;
  shadow?: boolean;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: (e: eDiv) => void;
}

const Card: React.FC<IProps> = props => {
  const { hide, color, shadow, className, onClick, onMouseEnter, onMouseLeave } = props;

  const colorClass = classes[color];
  const hideClass = hide ? classes.hide : '';
  const shadowClass = shadow ? classes.shadow : '';
  const additionClass = className ? className : '';

  const classList = `${classes.card} ${hideClass} ${colorClass} ${shadowClass} ${additionClass}`;

  return (
    <div
      className={classList}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.children}
    </div>
  );
};

export default Card;

import React, { MouseEvent } from 'react';

import classes from './Card.module.scss';

interface IProps {
  color: string;
  hide?: boolean;
  shadow?: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Card: React.FC<IProps> = props => {
  const { hide, color, shadow, className, onClick, onMouseEnter, onMouseLeave } = props;

  const baseClass = classes.card;
  const colorClass = classes[color];
  const hideClass = hide ? classes.hide : '';
  const shadowClass = shadow ? classes.shadow : '';
  const additionClass = className ? className : '';

  const classList = `${baseClass} ${hideClass} ${colorClass} ${shadowClass} ${additionClass}`;

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

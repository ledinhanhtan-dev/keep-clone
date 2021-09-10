import React from 'react';
import icons from 'src/assets/icons/icons.svg';
import classes from './Svg.module.scss';

interface IProps {
  iconId: string;
  className?: string;
}

const Svg: React.FC<IProps> = props => {
  const { iconId, className } = props;

  const baseClass = classes.svg;
  const additionClass = className ? className : '';
  const classList = `${baseClass} ${additionClass}`;

  // FIX: stop mouse event on SVG ===> get the wrong width
  // FIX: todo checkbox !

  return (
    <svg className={classList}>
      <use href={`${icons}#icon-${iconId}`} />
    </svg>
  );
};

export default Svg;

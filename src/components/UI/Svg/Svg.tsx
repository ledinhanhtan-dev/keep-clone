import React from 'react';
import icons from 'src/assets/icons/icons.svg';
import classes from './Svg.module.scss';

interface IProps {
  iconId: string;
  className?: string;
}

const Svg: React.FC<IProps> = props => {
  const { iconId, className } = props;

  const additionClass = className ? className : '';
  const classList = `${classes.svg} ${additionClass}`;

  // FIX: stop mouse event on SVG ===> get the wrong width

  return (
    <svg className={classList}>
      <use href={`${icons}#icon-${iconId}`} className={additionClass} />
    </svg>
  );
};

export default Svg;

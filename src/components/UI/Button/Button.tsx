import React, { MouseEvent, useEffect, useState } from 'react';
import classes from './Button.module.scss';
import Svg from 'src/components/UI/Svg/Svg';
import Tooltip from '../Tooltip/Tooltip';
import { ITooltip } from 'src/interfaces/ITooltip';

interface IProps {
  title: string;
  iconId: string;
  className?: string;
  highlight?: boolean;
  onClick?: (e: MouseEvent) => void;
  size: 'tiny' | 'smol' | 'small' | 'medium' | 'large';
}

const Button: React.FC<IProps> = props => {
  const [tooltip, setTooltip] = useState<ITooltip | null>(null);
  const { title, iconId, size, className, highlight, onClick } = props;

  // FIX: button unmounted before dispatch hideTooltip()
  const mouseLeaveHandler = () => setTooltip(null);
  const mouseEnterHandler = (e: MouseEvent) => {
    const button = (e.target as HTMLElement).closest('button')!;
    const { bottom, left, width } = button.getBoundingClientRect();

    setTooltip({ title, top: bottom, left: left + width / 2 });
  };

  const classList = `${classes.button} ${classes[size]} ${highlight ? classes.highlight : ''} ${
    className ? className : ''
  }`;

  // This function will execute if any button unmounted,
  // doesn't matter if the tooltip is shown or not
  useEffect(() => {
    return () => {
      tooltip && setTooltip(null);
    };
  }, [tooltip]);

  return (
    <>
      <button
        className={classList}
        onClick={onClick}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <Svg iconId={iconId} />
      </button>

      {tooltip && <Tooltip tooltip={tooltip} />}
    </>
  );
};

export default Button;

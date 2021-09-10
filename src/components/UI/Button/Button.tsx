import React, { MouseEvent, useEffect } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { hideTooltip, showTooltip } from 'src/store/slices/uiSlice';
import classes from './Button.module.scss';
import Svg from 'src/components/UI/Svg/Svg';

interface IProps {
  title: string;
  iconId: string;
  className?: string;
  highlight?: boolean;
  onClick?: (e: MouseEvent) => void;
  size: 'tiny' | 'smol' | 'small' | 'medium' | 'large';
}

const Button: React.FC<IProps> = props => {
  const dispatch = useAppDispatch();
  const { title, iconId, size, className, highlight, onClick } = props;

  // FIX: button unmounted before dispatch hideTooltip()
  const mouseLeaveHandler = () => dispatch(hideTooltip());
  const mouseEnterHandler = (e: MouseEvent) => {
    const button = (e.target as HTMLElement).closest('button')!;
    const { bottom, left, width } = button.getBoundingClientRect();

    dispatch(showTooltip({ show: true, title, top: bottom, left: left + width / 2 }));
  };

  const classList = `${classes.button} ${classes[size]} ${highlight ? classes.highlight : ''} ${
    className ? className : ''
  }`;

  // This function will execute if any button unmounted,
  // doesn't matter if the tooltip is shown or not
  useEffect(() => {
    return () => {
      dispatch(hideTooltip());
    };
  }, [dispatch]);

  return (
    <button
      className={classList}
      onClick={onClick}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <Svg iconId={iconId} />
    </button>
  );
};

export default Button;

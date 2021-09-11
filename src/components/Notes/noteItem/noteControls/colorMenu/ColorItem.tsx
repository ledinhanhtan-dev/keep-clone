import React, { MouseEvent, useState } from 'react';
import Tooltip from 'src/components/UI/Tooltip/Tooltip';
import { noteHelper } from 'src/helpers/noteHelper';
import { ITooltip } from 'src/interfaces/ITooltip';
import { ColorId } from 'src/interfaces/INote';
import Svg from 'src/components/UI/Svg/Svg';

import classes from './ColorItem.module.scss';

interface IProps {
  colorId: ColorId;
  selectedColor: ColorId;
  onChangeColor: (colorId: ColorId) => void;
}

const ColorItem: React.FC<IProps> = props => {
  const [tooltip, setTooltip] = useState<ITooltip | null>(null);
  const { colorId, selectedColor, onChangeColor } = props;
  const title = noteHelper.generateColorTitle(colorId);

  const mouseLeaveHandler = () => setTooltip(null);
  const mouseEnterHandler = (e: MouseEvent) => {
    const { bottom, left, width } = (e.target as HTMLButtonElement).getBoundingClientRect();

    setTooltip({ title, top: bottom, left: left + width / 2 });
  };

  return (
    <>
      <button
        className={classes.item}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onClick={() => onChangeColor(colorId)}
      >
        <svg height="100%" width="100%" viewBox="0 0 18 18" className={classes[colorId]}>
          <path
            className={classes.outer}
            d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0ZM9,16.5A7.5,7.5,0,1,1,16.5,9,7.52,7.52,0,0,1,9,16.5Z"
          ></path>
          <circle cx="9" cy="9" r="7.5" />
        </svg>

        {colorId === selectedColor && <Svg iconId="tick" className={classes.tick} />}
      </button>
      {tooltip && <Tooltip tooltip={tooltip} />}
    </>
  );
};

export default ColorItem;

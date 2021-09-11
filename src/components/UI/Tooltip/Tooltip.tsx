import React, { useEffect, useRef, useState } from 'react';
import PortalTooltips from '../Portals/PortalTooltips';
import { ITooltip } from 'src/interfaces/ITooltip';

import classes from './Tooltip.module.scss';

interface IProps {
  tooltip: ITooltip;
}

const Tooltip: React.FC<IProps> = props => {
  const [show, setShow] = useState(false);
  const [width, setWidth] = useState(0);
  const { title, top, left } = props.tooltip;
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      setWidth(tooltipRef.current!.offsetWidth);
    } catch (error) {
      console.log(error);
      console.warn('Show tooltip happens too fast!');
    }

    const delayShow = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(delayShow);
  }, []);

  const style = { opacity: show ? '1' : '0', top: top, left: left - width / 2 };

  return (
    <PortalTooltips>
      <div className={classes.tooltip} ref={tooltipRef} style={style}>
        {title}
      </div>
    </PortalTooltips>
  );
};

export default Tooltip;

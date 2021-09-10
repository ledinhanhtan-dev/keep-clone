import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'src/store/hooks';
import { selectTooltip } from 'src/store/slices/uiSlice';

import classes from './Tooltip.module.scss';

const Tooltip: React.FC = () => {
  const { show, title, top, left } = useAppSelector(selectTooltip);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // const tooltipWidth = tooltipRef.current?.offsetWidth!;
  // console.log(tooltipWidth);

  const [width, setWidth] = useState(0);

  // FIX: still catch the previous width
  useEffect(() => {
    setWidth(tooltipRef.current?.offsetWidth!);
  }, [show]);

  let style: Object = { opacity: '0', right: 0, bottom: 0 };

  if (show) style = { opacity: '1', top: top + 'px', left: left - width / 2 + 'px' };

  return (
    <div className={classes.tooltip} ref={tooltipRef} style={style}>
      {title}
    </div>
  );
};

export default Tooltip;

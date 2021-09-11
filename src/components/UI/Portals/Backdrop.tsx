import React from 'react';
import PortalBackdrop from './PortalBackdrop';

import classes from './Backdrop.module.scss';
interface IProps {
  show: boolean;
  onClick: () => void;
}

const Backdrop: React.FC<IProps> = props => {
  const { show, onClick } = props;

  const style = show ? {} : { display: 'none' };

  return (
    <PortalBackdrop>
      <div style={style} onClick={onClick} className={classes.backdrop} />
    </PortalBackdrop>
  );
};

export default Backdrop;

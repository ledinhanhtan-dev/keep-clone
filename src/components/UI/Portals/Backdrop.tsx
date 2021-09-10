import React from 'react';

import PortalBackdrop from './PortalBackdrop';

interface IProps {
  show: boolean;
  onClick: () => void;
}

const Backdrop: React.FC<IProps> = props => {
  const { show, onClick } = props;

  const style = show ? {} : { display: 'none' };

  return (
    <PortalBackdrop>
      <div id="backdrop" style={style} onClick={onClick} />
    </PortalBackdrop>
  );
};

export default Backdrop;

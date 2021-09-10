import React from 'react';
import ReactDOM from 'react-dom';

const PortalBackdrop: React.FC = props => {
  return <>{ReactDOM.createPortal(props.children, document.getElementById('backdrop-root')!)}</>;
};

export default PortalBackdrop;

import React from 'react';
import ReactDOM from 'react-dom';

const PortalOverLay: React.FC = props => {
  return <>{ReactDOM.createPortal(props.children, document.getElementById('overlay')!)}</>;
};

export default PortalOverLay;

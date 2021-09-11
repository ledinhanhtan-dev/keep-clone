import React from 'react';
import ReactDOM from 'react-dom';

const PortalTooltips: React.FC = props => {
  return <>{ReactDOM.createPortal(props.children, document.getElementById('tooltips')!)}</>;
};

export default PortalTooltips;

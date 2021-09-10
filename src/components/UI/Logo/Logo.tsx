import React from 'react';

import logo from 'src/assets/images/logo.png';

import classes from './Logo.module.scss';

const Logo: React.FC = () => {
  return (
    <div className={classes.logo}>
      <a href="/">
        <img src={logo} alt="Oga Note List Logo" />
        <h1>#Keep</h1>
      </a>
    </div>
  );
};

export default Logo;

import React from 'react';
import Search from './Search';
import NavControls from './NavControls';

import classes from './Navbar.module.scss';

const Navbar: React.FC = () => {
  return (
    <div className={classes.navbar}>
      <Search />
      <NavControls />
    </div>
  );
};

export default Navbar;

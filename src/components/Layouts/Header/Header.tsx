import React from 'react';
import Logo from 'src/components/UI/Logo/Logo';
import avatar from 'src/assets/images/avatar.jpg';
import Button from 'src/components/UI/Button/Button';
import Navbar from 'src/components/Navigation/Navbar/Navbar';
import Avatar from 'src/components/UI/Avatar/Avatar';

import classes from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.menu}>
          <Button title="Main Menu" iconId="hamburger" size="large" />
          <Logo />
        </div>

        <Navbar />

        <div className={classes.account}>
          <Button title="Google apps" iconId="apps" size="large" />
          <Avatar imgSrc={avatar} name="Gentek Citizen" email="ledinhanhtan.dev@gmail.com" />
        </div>
      </div>
    </header>
  );
};

export default Header;

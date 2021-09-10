import React from 'react';
import Button from 'src/components/UI/Button/Button';

import classes from './Search.module.scss';

interface IProps {}

const Search: React.FC<IProps> = () => {
  return (
    <form className={classes.search}>
      <Button title="Search" iconId="search" size="medium" />
      <input type="text" placeholder="Search" />
    </form>
  );
};

export default Search;

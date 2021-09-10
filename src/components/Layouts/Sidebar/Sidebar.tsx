import React from 'react';
import Button from 'src/components/UI/Button/Button';

import classes from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  return (
    <div className={classes.sidebar}>
      <Button title="Notes" size="large" iconId="light-bulb" highlight={true} />
      <Button title="Reminders" size="large" iconId="bell" />
      <Button title="Edit labels" size="large" iconId="pencil" />
      <Button title="Archive" size="large" iconId="archive" />
      <Button title="Trash" size="large" iconId="trash-bin" />
    </div>
  );
};

export default Sidebar;

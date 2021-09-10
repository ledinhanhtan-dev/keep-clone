import React from 'react';
import Button from 'src/components/UI/Button/Button';

import classes from './NavControls.module.scss';

interface IProps {}

const NavigationControls: React.FC<IProps> = () => {
  // Control Components
  return (
    <div className={classes.controls}>
      <Button title="Refresh" iconId="refresh" className={classes.control} size="large" />
      <Button title="Grid view" iconId="grid" className={classes.control} size="large" />
      <Button title="Settings" iconId="cog" className={classes.control} size="large" />
    </div>
  );
};

export default NavigationControls;

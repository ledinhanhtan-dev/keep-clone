import React, { useState } from 'react';
import Button from 'src/components/UI/Button/Button';

import classes from './LabelItem.module.scss';

interface IProps {
  title: string;
}

const Label: React.FC<IProps> = props => {
  const [title, setTitle] = useState(props.title);

  const mouseEnterHandler = () => {
    const cloneTitle = props.title;
    const newStr = cloneTitle.slice(0, cloneTitle.length - 4) + ' .......';
    setTitle(newStr);
  };

  const mouseLeaveHandler = () => {
    setTitle(props.title);
  };

  return (
    <div
      role="button"
      className={classes.item}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {title}
      <Button title="Remove label" iconId="x" size="tiny" />
    </div>
  );
};

export default Label;

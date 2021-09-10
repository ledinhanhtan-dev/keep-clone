import React from 'react';

import classes from './Avatar.module.scss';

interface IProps {
  name: string;
  email: string;
  imgSrc: string;
}

const Avatar: React.FC<IProps> = props => {
  return (
    <div className={classes.avatar}>
      <img src={props.imgSrc} alt={`${props.name} avatar`} />
    </div>
  );
};

export default Avatar;

import React from 'react';
import Label from './LabelItem';
import ILabel from 'src/interfaces/ILabel';

import classes from './NoteLabel.module.scss';

interface IProps {
  labels: ILabel[];
}

const NoteLabel: React.FC<IProps> = props => {
  return (
    <div className={classes.labels}>
      {props.labels.length > 0 &&
        props.labels.map(label => <Label key={label._id} title={label.title} />)}
    </div>
  );
};

export default NoteLabel;

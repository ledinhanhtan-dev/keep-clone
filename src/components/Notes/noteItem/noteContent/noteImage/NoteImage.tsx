import React from 'react';
import IImage from 'src/interfaces/IImage';

import classes from './NoteImage.module.scss';

interface IProps {
  images: IImage[];
}

const NoteImage: React.FC<IProps> = props => {
  const { images } = props;

  const gridStyle = { gridTemplateColumns: `repeat(${images.length}, 1fr)` };

  return (
    <div className={classes.image} style={gridStyle}>
      {images.map(img => (
        <img key={img._id} src={img.preview} alt="user-note" />
      ))}
    </div>
  );
};

export default NoteImage;

import React from 'react';

import classes from './NoteImage.module.scss';

// import imagePath from 'src/assets/images/image.jpg';
import IImage from 'src/interfaces/IImage';

interface INoteImageProps {
  images: IImage[];
}

const NoteImage: React.FC<INoteImageProps> = props => {
  const { images } = props;

  const gridStyle = { gridTemplateColumns: `repeat(${images.length}, 1fr)` };

  return (
    <div className={classes.image} style={gridStyle}>
      {images.map(img => (
        <img key={img.id} src={img.path} alt="user-note" />
      ))}
    </div>
  );
};

export default NoteImage;

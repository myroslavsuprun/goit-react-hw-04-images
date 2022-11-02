import React from 'react';
import PropTypes from 'prop-types';

// Styled components
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

const emptyImage = 'https://picsum.photos/id/2/1000/?blur=10';

function ImageGalleryItem({ previewImg = emptyImage, tags, onImgCardClick }) {
  const handleClick = () => {
    onImgCardClick({ alt: tags, img: previewImg });
  };

  return (
    <GalleryItem onClick={handleClick}>
      <GalleryImage loading="lazy" src={previewImg} alt={tags} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  previewImg: PropTypes.string,
  tags: PropTypes.string,
  onImgCardClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

import React from 'react';
import PropTypes from 'prop-types';

// Components
import ImageGalleryItem from 'components/ImageGalleryItem';

// Styled components
import { GalleryList } from './ImageGallery.styled';

function ImageGallery({ data, onImgCardClick }) {
  return (
    <GalleryList>
      {data.map(image => {
        const { id, largeImageURL, tags } = image;
        return (
          <ImageGalleryItem
            onImgCardClick={onImgCardClick}
            key={id}
            previewImg={largeImageURL}
            tags={tags}
          />
        );
      })}
    </GalleryList>
  );
}

ImageGallery.propTypes = {
  data: PropTypes.array.isRequired,
  onImgCardClick: PropTypes.func.isRequired,
};

export default ImageGallery;

import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Bars } from 'react-loader-spinner';

// Styled components
import { LoaderWrapper } from './Loader.styled';

function Loader({ positionType = 'absolute', ifLargeSize = true }) {
  return (
    <LoaderWrapper positionType={positionType}>
      <Bars
        height={ifLargeSize ? '90' : '60'}
        width={ifLargeSize ? '90' : '60'}
        color="#3f51b5"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LoaderWrapper>
  );
}

Loader.propTypes = {
  positionType: PropTypes.string,
  ifLargeSize: PropTypes.bool,
};

export default Loader;

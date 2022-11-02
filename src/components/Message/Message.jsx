import React from 'react';

import PropTypes from 'prop-types';

// Styled components
import { Title } from './Message.styled';

function ErrorMessage({ title = 'Something went wrong...' }) {
  return <Title>{title}</Title>;
}

ErrorMessage.propTypes = {
  title: PropTypes.string,
};

export default ErrorMessage;

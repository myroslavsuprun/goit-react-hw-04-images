import React from 'react';
import PropTypes from 'prop-types';

// Styled components
import { StyledBtn } from './Button.styled';

function Button({ onClick, title }) {
  return (
    <StyledBtn type="button" onClick={onClick}>
      {title}
    </StyledBtn>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;

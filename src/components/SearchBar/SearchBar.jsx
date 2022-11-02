import React from 'react';
import PropTypes from 'prop-types';

// Components
import SearchForm from 'components/SearchForm';

// Styled components
import { Header } from './SearchBar.styled';

function SearchBar({ onFormSubmit }) {
  return (
    <Header>
      <SearchForm onFormSubmit={onFormSubmit} />
    </Header>
  );
}

SearchBar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default SearchBar;

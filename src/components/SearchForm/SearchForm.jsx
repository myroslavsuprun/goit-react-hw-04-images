import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Styled components
import { Form, FormButton, FormInput } from './SearchFrom.styled';

// Icons
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

const INITIAL_STATE = {
  inputValue: '',
};

let previousSearchQuery = null;

function SearchForm({ onFormSubmit }) {
  const [inputValue, setInputValue] = useState(INITIAL_STATE.inputValue);

  const handleFormSubmit = e => {
    e.preventDefault();

    const searchQuery = e.target.elements.search.value;

    if (searchQuery === previousSearchQuery)
      return toast.warning('Try something new');

    onFormSubmit(searchQuery);
    resetForm();
  };

  const handleChange = e => {
    const currentValue = e.target.value;

    setInputValue(currentValue);
  };

  function resetForm() {
    setInputValue(INITIAL_STATE.inputValue);
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormButton type="submit" aria-label="Search">
        <BsSearch size="22" />
      </FormButton>
      <FormInput
        type="text"
        onChange={handleChange}
        value={inputValue}
        autocomplete="off"
        name="search"
        autoFocus
        placeholder="Search images and photos"
      />
    </Form>
  );
}

SearchForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default SearchForm;

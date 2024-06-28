import React, { useState } from 'react';
import propTypes from 'prop-types';
import MdEdit from '@mui/icons-material/Edit';

import { Component, SearchIcon, SearchInput } from './styles';

const SearchField = ({ fullWidth }) => {
  const [txtBusqueda, setTxtBusqueda] = useState('');

  const manejadorKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log(txtBusqueda);
    }
  };

  return (
    <Component>
      <SearchIcon>
        <MdEdit />
      </SearchIcon>
      <SearchInput
        size="large"
        fullWidth={fullWidth}
        placeholder="Buscar"
        value={txtBusqueda}
        onChange={({ target: { value } }) => setTxtBusqueda(value)}
        inputProps={{ 'aria-label': 'search' }}
        onKeyDown={manejadorKeyDown}
      />
    </Component>
  );
};

SearchField.propTypes = {
  fullWidth: propTypes.bool,
};

SearchField.defaultProps = {
  fullWidth: true,
};

export default SearchField;

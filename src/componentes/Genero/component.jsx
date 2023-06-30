import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled(Chip)(() => ({
  display: 'flex',
  alignItems: 'center',
  width: 100,
}));

const Generos = ({ value, key }) => (
  <Container
    key={key}
    size="small"
    color={value === 'M' ? 'info' : 'secondary'}
    label={value === 'M' ? 'Masculino' : 'Femenino'}
  />
);

Generos.propTypes = {
  value: PropTypes.bool.isRequired,
  key: PropTypes.number.isRequired,
};
export default Generos;

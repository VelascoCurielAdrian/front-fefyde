import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled(Chip)(() => ({
  display: 'flex',
  alignItems: 'center',
  width: 100,
}));

const Estatus = ({ value }) => (
  <Container
    size="small"
    color={value ? 'success' : 'error'}
    label={value ? 'Habilitado' : 'Inhabilitado'}
  />
);

Estatus.propTypes = {
  value: PropTypes.bool.isRequired,
};
export default Estatus;

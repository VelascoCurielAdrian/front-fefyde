import React from 'react';
import propTypes from 'prop-types';
import { Button } from '@mui/material';

const Component = ({
  sx, url, label, size, icono, variant,
  onClick, disabled, isSubmit, fullWidth, component,
}) => (
  <Button
    sx={sx}
    to={url}
    size={size}
    startIcon={icono}
    onClick={onClick}
    variant={variant}
    disabled={disabled}
    component={component}
    fullWidth={fullWidth}
    type={isSubmit ? 'submit' : 'button'}
  >
    {label}
  </Button>
);

Component.propTypes = {
  url: propTypes.string,
  sx: propTypes.oneOfType([propTypes.object]),
  component: propTypes.elementType,
  label: propTypes.string,
  icono: propTypes.element,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  isSubmit: propTypes.bool,
  size: propTypes.string,
  fullWidth: propTypes.bool,
  variant: propTypes.string,
};

Component.defaultProps = {
  label: '',
  size: '10px',
  sx: undefined,
  variant: 'contained',
  fullWidth: false,
  icono: null,
  onClick: null,
  disabled: false,
  isSubmit: false,
  component: null,
  url: '',
};

export default React.memo(Component);

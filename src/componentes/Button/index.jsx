import React from 'react';
import propTypes from 'prop-types';
import { Button } from '@mui/material';

const Component = ({
  url, label, size, icono, variant,
  onClick, disabled, isSubmit, fullWidth, component, ...rest
}) => (
  <Button
    to={url}
    size={size}
    startIcon={icono}
    onClick={onClick}
    variant={variant}
    disabled={disabled}
    component={component}
    fullWidth={fullWidth}
    type={isSubmit ? 'submit' : 'button'}
    {...rest}
  >
    {label}
  </Button>
);

Component.propTypes = {
  url: propTypes.string,
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

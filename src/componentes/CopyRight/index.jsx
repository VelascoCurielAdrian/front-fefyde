import React from 'react';
import propTypes from 'prop-types';
import { Link, Typography } from '@mui/material';

const Copyright = (props) => (
  <Typography variant="body2" color={props?.color || 'text.secondary'} align="center" {...props}>
    {'Copyright © '}
    <Link
      color={props?.color}
      href="https://virtual.uas.edu.mx/centro/esef/"
      rel="noopener noreferrer"
      target="_blank"
    >
      Facultad de informática
    </Link>
    {' '}
    {new Date().getFullYear()}
    .
  </Typography>
);

Copyright.propTypes = {
  color: propTypes.string,
};

Copyright.defaultProps = {
  color: 'inherit',
};

export default Copyright;

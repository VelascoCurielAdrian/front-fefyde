/* eslint-disable import/prefer-default-export */
import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { MobileDatePicker } from '@mui/x-date-pickers';

import TextField from '../TextField';

export const DatePickerController = ({
  control, name, label, error,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value = null } }) => (
      <MobileDatePicker
        name={name}
        value={value}
        onChange={(value) => { const fecha = format(value, "yyyy-MM-dd'T'HH:mm:ss"); onChange(fecha); }}
        renderInput={(params) => (
          <TextField
            required
            {...params}
            size="small"
            fullWidth
            name={name}
            label={label}
            error={error}
            value={params.inputProps.value}
          />
        )}
      />
    )}
  />
);

DatePickerController.propTypes = {
  control: PropTypes.oneOfType([PropTypes.any]).isRequired,
  error: PropTypes.oneOfType([PropTypes.any]),
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

DatePickerController.defaultProps = {
  error: null,
};

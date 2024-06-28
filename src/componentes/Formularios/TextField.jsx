import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { Controller } from 'react-hook-form';

const TextFieldMui = ({
  name, label, error, control, ...restProps
}) => (
  <FormControl fullWidth error={Boolean(error)}>
    <label
      htmlFor={label}
      className="block mb-1 text-sm font-medium text-slate-700"
    >
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...restProps}
          {...field}
          size="small"
          variant="outlined"
          error={Boolean(error)}
          helperText={error?.message}
        />
      )}
    />
  </FormControl>
);

TextFieldMui.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.any]),
  control: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

TextFieldMui.defaultProps = {
  label: '',
  error: null,
};

export default React.memo(TextFieldMui);

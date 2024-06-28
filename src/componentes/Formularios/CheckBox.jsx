import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckBoxMui = ({
  showLabelOnTop,
  label,
  name,
  control,
}) => (
  <FormControl>
    {
      showLabelOnTop && (
        <label
          htmlFor={label}
          className="block mb-1 text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )
    }
    <FormControlLabel
      control={(
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              color="primary"
            />
          )}
        />
      )}
      label={label}
    />
  </FormControl>
);

CheckBoxMui.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.oneOfType([PropTypes.any]).isRequired,
  label: PropTypes.string,
  showLabelOnTop: PropTypes.bool,
};

CheckBoxMui.defaultProps = {
  label: '',
  showLabelOnTop: false,
};

export default React.memo(CheckBoxMui);

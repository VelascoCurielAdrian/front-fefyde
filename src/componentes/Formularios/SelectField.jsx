import React from 'react';
import PropTypes from 'prop-types';

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { Controller } from 'react-hook-form';

const SelectMui = ({
  label,
  name,
  labelProp,
  control,
  error,
  options,
  valueProp,
  disabled,
  ...restProps
}) => (
  <FormControl fullWidth error={Boolean(error)} size="small">
    <label
      htmlFor={label}
      className="block mb-1 text-sm font-medium text-slate-700"
    >
      {label}
    </label>
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <Select
            {...restProps}
            {...field}
            disabled={disabled}
            size="small"
            value={
              options.length === 0
              || field?.value === undefined
              || field?.value === null
                ? ''
                : field.value
            }
          >
            {options.map((option) => (
              <MenuItem
                key={option?.id}
                value={valueProp ? option[valueProp] : option}
              >
                {option[labelProp]}
              </MenuItem>
            ))}
            {options.length === 0 && (
              <MenuItem>
                Sin elementos
              </MenuItem>
            )}
          </Select>
          <FormHelperText>
            {Boolean(error) && error?.message}
          </FormHelperText>
        </>
      )}
    />
  </FormControl>
);

SelectMui.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  labelProp: PropTypes.string,
  valueProp: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
  error: PropTypes.oneOfType([PropTypes.any]),
  control: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

SelectMui.defaultProps = {
  label: '',
  labelProp: 'label',
  valueProp: 'id',
  disabled: false,
  error: null,

};

export default React.memo(SelectMui);

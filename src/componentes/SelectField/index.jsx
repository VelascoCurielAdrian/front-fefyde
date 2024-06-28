import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from '@mui/material';

const SelectField = ({
  label,
  value,
  name,
  onChange,
  isHandleChange,
  required,
  error,
  labelProp,
  options,
  valueProp,
  customLabel,
  onClick,
  messageError,
  disabled,
}) => {
  const customOnChange = (e) => {
    if (isHandleChange) onChange((current) => ({ ...current, [name]: e.target.value }));
    else onChange(e);
  };

  return (
    <FormControl fullWidth error={!!error} size="small">
      <label htmlFor={label} className="block mb-1 text-sm font-bold text-gray-600">{label}</label>
      <Select
        disabled={disabled}
        size="small"
        onChange={customOnChange}
        name={name}
        value={value}
        required={required}
        onClick={onClick}
      >
        {options.map((option) => (
          <MenuItem
            key={option?.id}
            value={valueProp ? option[valueProp] : option}
          >
            {customLabel ? customLabel(option) : option[labelProp]}
          </MenuItem>
        ))}
        {options.length === 0 && (
          <MenuItem disabled>Sin elementos para mostrar</MenuItem>
        )}
      </Select>
      <FormHelperText>{messageError && error?.message}</FormHelperText>
    </FormControl>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.array,
  ]),
  required: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  labelProp: PropTypes.string,
  valueProp: PropTypes.string,
  customLabel: PropTypes.func,
  messageError: PropTypes.bool,
  isHandleChange: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

SelectField.defaultProps = {
  label: '',
  value: null,
  isHandleChange: false,
  messageError: true,
  required: false,
  error: false,
  labelProp: 'label',
  valueProp: 'id',
  customLabel: null,
  onClick: () => {},
  disabled: false,
};

export default SelectField;

import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  FormControl, FormHelperText, MenuItem, Select,
} from '@mui/material';
import styles from './styles';

const CssSelect = styled(Select)(() => ({
  color: '#263238',
  backgroundColor: '#E9EEFA',
  '& MuiNativeSelect-select': {
    color: '#212121',
    borderWidth: 1,
    borderRadius: 10,
  },
}));

const SelectField = ({
  label, value, name, onChange, isHandleChange, required,
  error, labelProp, options, valueProp, multiple, customLabel,
  onClick, messageError, placeHolder, inputStyles, disabled,
}) => {
  const classes = styles();
  const customOnChange = (e) => {
    if (isHandleChange) onChange((current) => ({ ...current, [name]: e.target.value }));
    else onChange(e);
  };

  return (
    <div style={inputStyles}>
      <label
        htmlFor="label-form"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <FormControl fullWidth error={!!error}>
        <CssSelect
          disabled={disabled}
          size="small"
          fullWidth
          margin="dense"
          onChange={customOnChange}
          name={name}
          displayEmpty={!!placeHolder}
          value={value}
          multiple={multiple}
          required={required}
          onClick={onClick}
        >
          {options.map((option) => (
            <MenuItem
              key={option?.id}
              className={classes.li}
              value={valueProp ? option[valueProp] : option}
            >
              {customLabel ? customLabel(option) : option[labelProp]}
            </MenuItem>
          ))}
          {options.length === 0 && (
          <MenuItem disabled>Sin elementos para mostrar</MenuItem>
          )}
        </CssSelect>
        <FormHelperText>{messageError && error?.message}</FormHelperText>
      </FormControl>
    </div>
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
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  labelProp: PropTypes.string,
  valueProp: PropTypes.string,
  customLabel: PropTypes.func,
  messageError: PropTypes.bool,
  placeHolder: PropTypes.string,
  isHandleChange: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputStyles: PropTypes.oneOfType([PropTypes.object]),
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

SelectField.defaultProps = {
  label: '',
  value: '',
  isHandleChange: false,
  messageError: true,
  required: false,
  error: false,
  labelProp: 'label',
  valueProp: 'id',
  multiple: false,
  customLabel: null,
  onClick: () => {},
  disabled: false,
  inputStyles: {},
  placeHolder: 'black',
};

export default SelectField;

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TextField as Input } from '@mui/material';
import { styled } from '@mui/material/styles';

const CssTextField = styled(Input)(({ theme }) => ({
  '& input': {
    color: '#263238',
    backgroundColor: '#E9EEFA',
    borderWidth: 1,
    borderRadius: 10,
  },
  '& input:valid + fieldset': {
    color: '#212121',
    borderWidth: 1,
    borderRadius: 10,
  },
  '& input:invalid + fieldset': {
    borderWidth: 1,
    borderRadius: 10,
  },
  '& input:valid:focus + fieldset': {
    borderWidth: 1,
    borderRadius: 10,
  },
  transition: theme.transitions.create([
    'border-color',
    'background-color',
    'box-shadow',
  ]),
}));

const CustomTextField = styled(Input)(() => ({
  '& .MuiOutlinedInput-root': {
    color: '#263238',
    backgroundColor: '#E9EEFA',
    borderWidth: 0,
    borderRadius: 10,
  },
}));

const TextField = ({
  name, size, type, rows, error, label, value, variant,
  onChange, required, disabled, autoFocus, fullWidth, className,
  onKeyDown, inputProps, inputStyles, placeHolder, messageError, isHandleChange,
}) => {
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
      {variant !== 'multiline' ? (
        <CssTextField
          size={size}
          name={name}
          type={type}
          value={value || ''}
          error={!!error}
          autoFocus={autoFocus}
          disabled={disabled}
          required={required}
          onKeyDown={onKeyDown}
          className={className}
          fullWidth={fullWidth}
          InputProps={inputProps}
          helperText={messageError && error?.message}
          placeholder={placeHolder}
          onChange={customOnChange}
        />
      ) : (
        <CustomTextField
          multiline
          size={size}
          name={name}
          value={value}
          error={!!error}
          maxRows={rows}
          disabled={disabled}
          required={required}
          onKeyDown={onKeyDown}
          className={className}
          fullWidth={fullWidth}
          InputProps={inputProps}
          helperText={messageError && error?.message}
          placeholder={placeHolder}
          onChange={customOnChange}
        />
      )}
    </div>
  );
};

TextField.propTypes = {
  size: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  type: PropTypes.string,
  rows: PropTypes.number,
  label: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onKeyDown: PropTypes.func,
  variant: PropTypes.string,
  className: PropTypes.string,
  messageError: PropTypes.bool,
  placeHolder: PropTypes.string,
  isHandleChange: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  inputProps: PropTypes.oneOfType([PropTypes.object]),
  inputStyles: PropTypes.oneOfType([PropTypes.object]),
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

TextField.defaultProps = {
  size: 'small',
  label: '',
  value: '',
  type: 'text',
  isHandleChange: false,
  messageError: true,
  inputProps: {},
  required: false,
  fullWidth: true,
  autoFocus: false,
  variant: '',
  rows: 4,
  placeHolder: '',
  className: '',
  onKeyDown: null,
  disabled: false,
  error: null,
  inputStyles: {},
  onChange: () => {},
};

export default memo(TextField, (prev, next) => (
  prev.value === next.value
  && prev.error === next.error
  && prev.disabled === next.disabled
  && prev.onChange === next.onChange
));

/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import TextField from '../TextField';

export const TextFieldController = ({
  name, control, error, label, type, rows, variant,
  placeHolder, onChangeCustom, messageError, autoFocus, disabled,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <TextField
        fullWidth
        variant={variant}
        onChange={(e) => {
          const { value } = e.target;
          if (onChangeCustom) {
            onChange(onChangeCustom(e));
          } else {
            onChange(value);
          }
        }}
        value={value}
        name={name}
        label={label}
        error={error}
        messageError={messageError}
        type={type}
        rows={rows}
        disabled={disabled}
        autoFocus={autoFocus}
        placeHolder={placeHolder}
      />
    )}
  />
);

TextFieldController.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  variant: PropTypes.string,
  messageError: PropTypes.bool,
  placeHolder: PropTypes.string,
  onChangeCustom: PropTypes.oneOfType([PropTypes.any]),
  control: PropTypes.oneOfType([PropTypes.any]).isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

TextFieldController.defaultProps = {
  name: '',
  label: '',
  rows: 4,
  variant: '',
  error: null,
  type: 'text',
  placeHolder: '',
  disabled: false,
  autoFocus: false,
  messageError: true,
  onChangeCustom: null,
};

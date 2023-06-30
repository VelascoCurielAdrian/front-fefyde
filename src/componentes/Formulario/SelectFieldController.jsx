/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import SelectField from '../SelectField';

export const SelectFieldController = ({
  control, name, labelProp, label,
  options, error, customLabel, messageError,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value, name } }) => (
      <SelectField
        labelProp={labelProp}
        name={name}
        label={label}
        onChange={onChange}
        value={value}
        options={options}
        error={error}
        customLabel={customLabel}
        messageError={messageError}
      />
    )}
  />
);

SelectFieldController.propTypes = {
  customLabel: PropTypes.func,
  messageError: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelProp: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.array]),
  control: PropTypes.oneOfType([PropTypes.any]).isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

SelectFieldController.defaultProps = {
  messageError: true,
  customLabel: null,
  options: [],
  error: null,
};

import React, { useCallback } from 'react';
import { format, parse } from 'date-fns';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { MobileDatePicker } from '@mui/x-date-pickers';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  FormControl, TextField, InputAdornment, IconButton,
} from '@mui/material';

const DatePicker = ({
  control, name, label, error,
}) => {
  const handleDateChange = useCallback(
    (date) => format(date, 'yyyy-MM-dd'),
    [],
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MobileDatePicker
          name={name}
          value={
            field.value ? parse(field.value, 'yyyy-MM-dd', new Date()) : null
          }
          inputFormat="yyyy-MM-dd"
          onChange={(date) => field.onChange(handleDateChange(date))}
          renderInput={(params) => (
            <FormControl error={Boolean(error)} fullWidth>
              <label htmlFor={label} className="block mb-1 text-sm font-medium text-gray-600">{label}</label>
              <TextField
                required
                {...params}
                size="small"
                fullWidth
                name={name}
                error={Boolean(error)}
                helperText={error?.message}
                value={params.inputProps.value}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" edge="end">
                        <CalendarMonthIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          )}
        />
      )}
    />
  );
};

DatePicker.propTypes = {
  control: PropTypes.oneOfType([PropTypes.any]).isRequired,
  error: PropTypes.oneOfType([PropTypes.any]),
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

DatePicker.defaultProps = {
  error: null,
};

export default React.memo(DatePicker);

import { MenuItem, TextField } from '@mui/material';
import { createElement } from 'react';
import { Controller } from 'react-hook-form';

const SelectElement = ({
  name,
  required,
  valueKey = 'id',
  labelKey = 'title',
  options = [],
  parseError,
  type,
  objectOnChange,
  validation = {},
  control,
  customborderradius = '5px',
  'data-testid': datatestid,
  ...rest
}) => {
  const isNativeSelect = !!rest.SelectProps?.native;
  const ChildComponent = isNativeSelect ? 'option' : MenuItem;

  if (required && !validation.required) {
    // eslint-disable-next-line no-param-reassign
    validation.required = 'This field is required';
  }

  const parsedErrorFunction = (newError) =>
    typeof parseError === 'function' ? parseError(newError) : newError.message;

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({ field: { onBlur, onChange, value }, fieldState: { invalid, error } }) => {
        // handle shrink on number input fields
        if (type === 'number' && typeof value !== 'undefined') {
          // eslint-disable-next-line no-param-reassign
          rest.InputLabelProps = rest.InputLabelProps || {};
          // eslint-disable-next-line no-param-reassign
          rest.InputLabelProps.shrink = true;
        }
        if (typeof value === 'object') {
          // eslint-disable-next-line no-param-reassign
          value = value && value[valueKey]; // if value is object get key
        }
        return (
          <TextField
            {...rest}
            data-testid={datatestid}
            variant="outlined"
            name={name}
            value={value ?? ''}
            onBlur={onBlur}
            onChange={(event) => {
              let item = event.target.value;
              if (type === 'number') {
                item = Number(item);
              }
              onChange(item);
              if (typeof rest.onChange === 'function') {
                if (objectOnChange) {
                  item = options.find((i) => i[valueKey] === item);
                }
                rest.onChange(item);
              }
            }}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: customborderradius,
              },
              ...rest.sx,
            }}
            select
            required={required}
            error={invalid}
            helperText={error ? parsedErrorFunction(error) : rest.helperText}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            {isNativeSelect && <option />}
            {options.map((item) =>
              createElement(
                ChildComponent,
                {
                  key: `${name}_${item[valueKey]}_${Math.random() * 10000}`,
                  value: item[valueKey],
                },
                item[labelKey]
              )
            )}
          </TextField>
        );
      }}
    />
  );
};

export default SelectElement;

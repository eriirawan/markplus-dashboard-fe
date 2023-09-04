/* eslint-disable no-param-reassign */
import { Box, TextFieldProps as MUITextFieldProps, Theme } from '@mui/material';
import { ChangeEvent, ReactNode } from 'react';
import { Control, Controller, ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';
import { SxProps } from '@mui/system';
import { FR8FormLabel } from '..';
import StyledTextField from './MPTextField.styles';

export const FR8TextField = ({
  validation = {},
  parseError,
  type,
  required,
  name,
  control,
  label,
  id,
  size = 'small',
  showErrorMessage = true,
  customborderradius = '5px',
  sxContainer,
  sxLabel,
  transformInput,
  transformOutput,
  inputProps,
  ...rest
}) => {
  if (required && !validation.required) {
    validation.required = 'This field is required';
  }

  if (type === 'email' && !validation.pattern) {
    validation.pattern = {
      message: '',
      // eslint-disable-next-line no-useless-escape
      value:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    };
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
        <Box display="flex" flexDirection="column" width={rest.fullWidth ? '100%' : 'auto'} sx={sxContainer}>
          {label ? (
            <FR8FormLabel required={required} htmlFor={id} sx={sxLabel}>
              {label}
            </FR8FormLabel>
          ) : null}
          <StyledTextField
            {...rest}
            inputRef={(e) => {
              ref(e);
              if (rest.inputRef?.current) {
                rest.inputRef.current = e;
              }
            }}
            id={id}
            size={size}
            name={name}
            value={transformInput ? transformInput(value) : value ?? ''}
            onChange={(e) => {
              if (transformOutput) {
                onChange(transformOutput(e));
              } else {
                onChange(e);
              }
              rest.onChange?.(e);
            }}
            onBlur={onBlur}
            required={required}
            type={type}
            variant="outlined"
            inputProps={inputProps}
            customborderradius={customborderradius}
            {...(invalid && {
              error: true,
            })}
            {...(error &&
              showErrorMessage && {
                helperText: typeof parseError === 'function' ? parseError(error) : error.message,
              })}
            FormHelperTextProps={{
              sx: (theme) => ({
                color: '#ABBAD0',
                fontSize: theme.typography.body2,
                margin: '7px 0px',
              }),
            }}
          />
        </Box>
      )}
    />
  );
};

export default FR8TextField;

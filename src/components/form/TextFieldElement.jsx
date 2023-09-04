import { TextField, Box } from '@mui/material';
import { Controller } from 'react-hook-form';

const TextFieldElement = ({
  validation = {},
  parseError,
  type,
  required,
  name,
  control,
  variant,
  multiline,
  label,
  id,
  customborderradius = '5px',
  ...rest
}) => {
  if (required && !validation.required) {
    // eslint-disable-next-line no-param-reassign
    validation.required = 'This field is required';
  }

  if (type === 'email' && !validation.pattern) {
    // eslint-disable-next-line no-param-reassign
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
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <Box>
          <TextField
            {...rest}
            variant={variant}
            name={name}
            value={value ?? ''}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            type={type}
            error={invalid}
            helperText={
              error ? (typeof parseError === 'function' ? parseError(error) : error.message) : rest.helperText
            }
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: customborderradius,
              },
              ...rest.sx,
            }}
            multiline={multiline}
          />
        </Box>
      )}
    />
  );
};

export default TextFieldElement;

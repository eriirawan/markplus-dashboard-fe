import { Controller } from 'react-hook-form';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';

const CheckboxElement = ({ name, validation = {}, required, parseError, label, control, helperText, ...rest }) => {
  if (required && !validation.required) {
    // eslint-disable-next-line no-param-reassign
    validation.required = 'This field is required';
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({ field: { value, onChange }, fieldState: { invalid, error } }) => {
        const parsedErrorFunction = (newError) =>
          typeof parseError === 'function' ? parseError(newError) : newError.message;
        const parsedHelperText = error ? parsedErrorFunction(error) : helperText;
        return (
          <FormControl required={required} error={invalid}>
            <FormGroup row>
              <FormControlLabel
                label={label || ''}
                control={
                  <Checkbox
                    {...rest}
                    color={rest.color || 'primary'}
                    sx={{
                      ...rest.sx,
                      color: invalid ? 'error.main' : undefined,
                    }}
                    value={value}
                    checked={!!value}
                    onChange={() => {
                      onChange(!value);
                    }}
                  />
                }
              />
            </FormGroup>
            {/* eslint-disable-next-line max-len */}
            {parsedHelperText && <FormHelperText error={invalid}>{parsedHelperText}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
};

export default CheckboxElement;

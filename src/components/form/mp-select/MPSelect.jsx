import { Check } from '@mui/icons-material';
import { Box, MenuItem, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import FR8TextField from '../mp-text-field/MPTextField';

const MPSelect = ({
  name,
  required,
  valueKey = 'id',
  labelKey = 'label',
  options = [],
  parseError,
  type = 'string',
  objectOnChange,
  validation = {},
  label,
  control,
  size = 'small',
  placeholderEmptyText = 'Select here...',
  customborderradius = '5px',
  ...rest
}) => {
  if (required && !validation.required) {
    // eslint-disable-next-line no-param-reassign
    validation.required = 'This field is required';
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({ field: { onBlur, onChange, value, ref, ...fieldRest }, fieldState: { invalid, error } }) => {
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
          <FR8TextField
            {...rest}
            label={label}
            name={name}
            id={name}
            value={value ?? ''}
            onBlur={onBlur}
            size={size}
            customborderradius={customborderradius}
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
            select
            SelectProps={{
              ...rest.SelectProps,
              MenuProps: {
                PaperProps: {
                  sx: (theme) => ({
                    '& .MuiList-root': {
                      '& li.Mui-selected': {
                        '&:hover': {
                          backgroundColor: theme.palette.neutral.lightGrey,
                        },
                        backgroundColor: 'white',
                      },
                      '& li.MuiMenuItem-root': {
                        '&:hover': {
                          backgroundColor: theme.palette.neutral.lightGrey,
                        },
                        '&:not(&:last-child)': {
                          borderBottom: 1,
                          borderColor: theme.palette.neutral.lightGrey,
                        },
                        boxSizing: 'border-box',
                        height: size === 'small' ? '32px' : '40px',
                        pl: 2,
                      },
                      py: 0,
                    },
                    border: 1,
                    borderColor: theme.palette.neutral.greyScale03,
                    marginTop: 1,
                  }),
                },
              },
              displayEmpty: true,
              id: name,
              renderValue: (currentValue) => (
                <Typography
                  sx={{
                    color: currentValue === '' ? 'neutral.greyScale03' : 'text.primary',
                    height: '100%',
                    lineHeight: 'unset',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {currentValue === ''
                    ? placeholderEmptyText
                    : options.length > 0 && (options.find(({ [valueKey]: v }) => v === currentValue)?.[labelKey] || '')}
                </Typography>
              ),
            }}
            required={required}
            error={invalid}
            helperText={
              error ? (typeof parseError === 'function' ? parseError(error) : error.message) : rest.helperText
            }
          >
            {options.map((item) => (
              <MenuItem disabled={item.disabled} key={`${name}_${item[valueKey]}`} value={item[valueKey]}>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <Box sx={{ display: 'flex', flex: 1 }}>{item[labelKey]}</Box>

                  {/* Shock checkmar if value selected */}
                  {typeof value !== 'undefined' && value === item[valueKey] && (
                    <Check fontSize="small" sx={{ color: 'success.main' }} />
                  )}
                </Box>
              </MenuItem>
            ))}
          </FR8TextField>
        );
      }}
    />
  );
};

export default MPSelect;

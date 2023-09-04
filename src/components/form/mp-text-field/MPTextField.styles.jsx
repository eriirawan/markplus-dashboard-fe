import { TextField } from '@mui/material';
import { styled } from '@mui/system';

const StyledTextField = styled(TextField)(({ size, InputProps, customborderradius, value, theme, multiline }) => ({
  '& .MuiInputBase-root': {
    // overrides padding
    '& .MuiInputBase-input': {
      '&:disabled': {
        WebkitTextFillColor: value !== '' ? theme.palette.text.primary : '#ABBAD0',
      },
      height: '100%',
      lineHeight: multiline ? 'auto' : size === 'small' ? '32px' : size === 'medium' ? '40px' : 'auto',

      padding: multiline
        ? '0'
        : InputProps?.startAdornment
        ? '0px'
        : InputProps?.endAdornment
        ? '0px 0px 0px 16px'
        : '0px 16px',
    },

    // border size
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
    },

    /**
     * Disabled
     */
    '&.Mui-disabled': {
      WebkitTextFillColor: value !== '' ? theme.palette.text.primary : '#ABBAD0',
      backgroundColor: '#E3EAF1',
    },

    /**
     * Focus
     */
    '&.Mui-focused': {
      backgroundColor: '#F0F6FC',
    },

    '&:hover': {
      backgroundColor: '#F0F6FC',
    },

    /**
     * Hover
     */
    // handle hover state no error
    '&:not(.Mui-error):hover > fieldset': {
      borderColor: '#ABBAD0',
    },

    backgroundColor: 'white',
    borderRadius: customborderradius,

    height: multiline ? 'auto' : size === 'small' ? '32px' : size === 'medium' ? '40px' : 'auto',
  },
}));

export default StyledTextField;

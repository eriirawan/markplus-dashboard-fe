import { FormLabel } from '@mui/material';
import { styled } from '@mui/system';

const StyledFormLabel = styled(FormLabel)(() => ({
  '.MuiFormLabel-asterisk': {
    color: 'error.main',
  },
  bottom: '7px',
  color: 'text.main',
  fontSize: '14px',
}));

export default StyledFormLabel;

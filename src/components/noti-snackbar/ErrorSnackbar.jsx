import WarningIcon from '@mui/icons-material/Warning';
import { Alert, Typography } from '@mui/material';
import { useSnackbar, SnackbarContent } from 'notistack';
import { forwardRef, useCallback } from 'react';

const ErrorSnackbar = forwardRef(({ id, ...props }, ref) => {
  const { closeSnackbar } = useSnackbar();
  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref}>
      <Alert
        icon={<WarningIcon fontSize="small" sx={{ color: 'error.400' }} />}
        severity="error"
        sx={{ width: '100%' }}
        onClose={handleDismiss}
      >
        <Typography color="error.400" sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
          {props.message}
        </Typography>
      </Alert>
    </SnackbarContent>
  );
});

export default ErrorSnackbar;

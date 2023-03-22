import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Alert, Typography } from '@mui/material';
import { useSnackbar, SnackbarContent } from 'notistack';
import { forwardRef, useCallback, useEffect } from 'react';

function isHTML(str) {
  const doc = new DOMParser().parseFromString(str, 'text/html');
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
}

const SuccessSnackbar = forwardRef(({ id, ...props }, ref) => {
  const { closeSnackbar } = useSnackbar();
  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref}>
      <Alert
        icon={<CheckCircleIcon sx={{ color: 'success.400' }} />}
        severity="success"
        sx={{ width: '100%' }}
        onClose={handleDismiss}
      >
        <Typography
          component="div"
          color="success.400"
          sx={{
            '& a': {
              color: 'inherit',
              fontWeight: 'bold',
              textDecoration: 'underline',
            },
            whiteSpace: 'pre-line',
            wordBreak: 'break-word',
          }}
        >
          {isHTML(props.message) ? (
            // eslint-disable-next-line react/no-danger
            <div dangerouslySetInnerHTML={{ __html: props.message }} />
          ) : (
            props.message
          )}
        </Typography>
      </Alert>
    </SnackbarContent>
  );
});

export default SuccessSnackbar;

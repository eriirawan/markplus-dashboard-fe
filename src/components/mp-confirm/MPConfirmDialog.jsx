import { CheckBox, Info, WarningRounded } from '@mui/icons-material';
import Delete from '@mui/icons-material/Delete';
import { Box, Grid, Typography, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const MPConfirmDialog = ({ open, onCancel, onConfirm, onClose, options }) => {
  const opt = {};

  if (options.variant === 'DELETE') {
    opt.cancelTitle = 'Cancel';
    opt.message = 'Are you sure?';
    opt.Icon = Delete;
    opt.iconProps = { color: 'error.400' };
    opt.confirmTitle = 'Delete';
    opt.confirmButtonProps = { color: 'error.400', variant: 'contained' };
    opt.cancelButtonProps = { color: 'inherit', variant: 'outlined' };
  } else if (options.variant === 'CONFIRM') {
    opt.Icon = Info;
    opt.iconProps = { color: 'primary' };
    opt.cancelTitle = 'Cancel';
    opt.cancelButtonProps = { variant: 'outlined' };
    opt.confirmButtonProps = { color: 'primary', variant: 'contained' };
  } else if (options.variant === 'INFO') {
    opt.Icon = CheckBox;
    opt.iconProps = { color: 'primary' };
    opt.confirmTitle = 'Close';
    opt.confirmButtonProps = { color: 'primary', variant: 'outlined' };
  } else if (options.variant === 'WARNING') {
    opt.Icon = WarningRounded;
    opt.cancelTitle = 'Cancel';
    opt.iconProps = { color: 'warning.400' };
    opt.confirmTitle = 'Confirm';
    opt.confirmButtonProps = { color: 'warning.400', variant: 'contained' };
  }

  const { title, message, Icon, iconProps, cancelTitle, confirmTitle, cancelButtonProps, confirmButtonProps } = {
    ...opt,
    ...options,
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: { borderRadius: 10, width: 500 },
      }}
      open={open}
      scroll="body"
      onClose={onClose}
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'flex-start',
        },
      }}
    >
      <DialogContent>
        <Grid container sx={{ p: 3 }}>
          {Boolean(Icon) && (
            <Grid item container justifyContent="center" xs={12}>
              <Icon sx={{ fontSize: 60, mb: 2 }} {...iconProps} />
            </Grid>
          )}
          {Boolean(title) && (
            <Grid item container justifyContent="center" xs={12} sx={{ mb: 2 }}>
              <Typography variant="h2" fontWeight="600">
                {title}
              </Typography>
            </Grid>
          )}
          {Boolean(message) && (
            <Grid item container display="flex" justifyContent="center" xs={12} gap={0.4}>
              <Typography
                variant="body1"
                color="neutral.greyScale02"
                sx={{ fontSize: 14, textAlign: 'center', whiteSpace: 'pre-wrap' }}
              >
                {message}
              </Typography>
            </Grid>
          )}

          {(cancelTitle || confirmTitle) && (
            <Grid item container justifyContent="center" sx={{ mt: '30px' }} xs={12}>
              <Box>
                {Boolean(cancelTitle) && (
                  <Button
                    color="inherit"
                    {...cancelButtonProps}
                    sx={{ minWidth: 100, mx: 1, textTransform: 'none', ...(cancelButtonProps?.sx || {}) }}
                    onClick={onCancel}
                  >
                    {cancelTitle}
                  </Button>
                )}
                {Boolean(confirmTitle) && (
                  <Button
                    {...confirmButtonProps}
                    sx={{ minWidth: 100, mx: 1, textTransform: 'none', ...(confirmButtonProps?.sx || {}) }}
                    onClick={onConfirm}
                  >
                    {confirmTitle}
                  </Button>
                )}
              </Box>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default MPConfirmDialog;

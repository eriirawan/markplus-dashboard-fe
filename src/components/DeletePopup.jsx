import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Grid, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import React from 'react';

const GeneralDeletePopup = ({ open, title, message, handleCancel, handleSave, sxMessage = {} }) => (
  <Dialog
    fullWidth
    maxWidth="sm"
    PaperProps={{
      style: { borderRadius: 10, width: 468 },
    }}
    open={open}
    disableEscapeKeyDown
  >
    <DialogContent>
      <Grid container sx={{ p: 3 }}>
        <Grid item container justifyContent="center" xs={12}>
          <DeleteIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
        </Grid>
        <Grid item container justifyContent="center" xs={12} sx={{ mb: 2 }}>
          <Typography variant="h2" fontWeight="600" color="#000">
            {title}
          </Typography>
        </Grid>
        <Grid item container display="flex" justifyContent="center" xs={12} gap={0.4}>
          <Typography
            variant="body1"
            color="neutral.greyScale02"
            fontWeight="bold"
            sx={{ fontSize: 14, textAlign: 'center', ...sxMessage }}
          >
            {message}
          </Typography>
        </Grid>
        <Grid item container justifyContent="center" sx={{ mt: '30px' }} xs={12}>
          <Box>
            <Button data-testid="btnClose" variant="outlined" color="error" onClick={handleCancel} sx={{ mx: 1 }}>
              Cancel
            </Button>
            <Button data-testid="btnSave" variant="contained" color="error" onClick={handleSave} sx={{ mx: 1 }}>
              Delete
            </Button>
          </Box>
        </Grid>
      </Grid>
    </DialogContent>
  </Dialog>
);

export default GeneralDeletePopup;

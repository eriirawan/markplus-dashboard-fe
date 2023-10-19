import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, Grid, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

const DialogConfirmation = ({
  open,
  header,
  text,
  confrimButtonText,
  cancelButonText,
  IconConfrim,
  setOpen,
  typeButtonConfrim,
  onConfrimOk,
}) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          width: '100%',
          maxWidth: '320px',
          padding: '32px',
        },
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        // paddingX={'32px'}
        // paddingTop={'32px'}
        marginBottom={'16px'}
        minWidth={'252px'}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '18px', lineHeight: '27px' }}>{header}</Typography>
        <IconButton
          aria-label="close"
          onClick={() => setOpen((prev) => !prev)}
          sx={{ border: 1.5, color: 'primary.main', height: '44px', width: '44px' }}
        >
          <Close />
        </IconButton>
      </Stack>
      <DialogContent sx={{ padding: 0 }}>
        <Stack display={'flex'} direction="column" gap={'32px'}>
          <Typography>{text}</Typography>
          {/* {getLayoutContentAction()} */}
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
              <Button fullWidth onClick={onConfrimOk} sx={{ gap: '5px' }} color={typeButtonConfrim}>
                <IconConfrim />
                <Typography color={'white'}>{confrimButtonText}</Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
              <Button fullWidth onClick={() => setOpen((prev) => ({ ...prev, success: false }))} variant="outlined">
                {cancelButonText}
              </Button>
            </Grid>
          </Grid>
          {/* <Box display={'flex'} flexDirection={'row'} gap={'16px'}></Box> */}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DialogConfirmation;

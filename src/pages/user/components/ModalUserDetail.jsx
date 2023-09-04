import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
  Stack,
  Box,
  Button,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';

import CheckBox from '@/components/CheckBox';
import MPTextField from '@/components/TextField';
import DefaultImg from '@/assets/images/default-image.png';

const ModalUserDetail = ({ openPopup = false, action = 'detail', setOpenPopup, methods }) => {
  const imgUrl = methods.watch('imgUrl');

  const handleClose = () => {
    setOpenPopup(false);
    setTimeout(() => {
      setAction('');
      methods.reset(defaultForm);
    }, 500);
  };

  const handleClick = () => {
    methods.handleSubmit(() => onSubmit(option, withNotif), onErrorSubmit)();
  };

  return (
    <Dialog maxWidth="md" open={openPopup} PaperProps={{ sx: { p: 3 } }} transitionDuration={500}>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h1" color="primary.main">
            {action === 'detail' ? 'View User Details' : action === 'edit' ? 'Edit User' : 'Add New User'}
          </Typography>
          <IconButton
            aria-label="delete"
            sx={{ border: 1.5, color: 'primary.main', height: '44px', width: '44px' }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <Stack direction="row" spacing={2}>
            {action === 'detail' ? (
              <Grid container width={380}>
                <Grid item xs={6}>
                  <Stack spacing={0.5}>
                    <Typography variant="h4" color="primary.main">
                      User ID
                    </Typography>
                    <Typography>{methods?.getValues('id') || '-'}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={0.5}>
                    <Typography variant="h4" color="primary.main">
                      Role
                    </Typography>
                    <Typography>{methods?.getValues('role') || '-'}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={0.5}>
                    <Typography variant="h4" color="primary.main">
                      Username
                    </Typography>
                    <Typography>{methods?.getValues('username') || '-'}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={0.5}>
                    <Typography variant="h4" color="primary.main">
                      Email
                    </Typography>
                    <Typography>{methods?.getValues('email') || '-'}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={0.5}>
                    <Typography variant="h4" color="primary.main">
                      First Name
                    </Typography>
                    <Typography>{methods?.getValues('firstName') || '-'}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={0.5}>
                    <Typography variant="h4" color="primary.main">
                      Last Name
                    </Typography>
                    <Typography>{methods?.getValues('lastName') || '-'}</Typography>
                  </Stack>
                </Grid>
              </Grid>
            ) : (
              <Stack spacing={3}>
                <Typography variant="h3" color="primary.main">
                  User Details
                </Typography>
                <Stack direction="row" spacing={2}>
                  <MPTextField required label="Username" name="username" placeholder="Company Name" size="normal" />
                  <MPTextField label="Role" name="role" />
                </Stack>
                <MPTextField label="Email" name="email" placeholder="companyemail@emaildomain.com" sx={{ my: 2 }} />
                <Stack direction="row" spacing={2}>
                  <MPTextField label="First Name" name="firstName" placeholder="PT AAA" />
                  <MPTextField label="Last Name" name="lastName" placeholder="Tbk" />
                </Stack>
              </Stack>
            )}
            <Divider flexItem orientation="vertical" sx={{ borderColor: 'primary.main', borderWidth: 1 }} />
            <Stack spacing={2}>
              <Typography variant="h3" color="primary.main" sx={{ textAlign: 'center' }}>
                Company Logo
              </Typography>
              <Box px={1} component="img" src={imgUrl || DefaultImg} height={169} />
              {action !== 'detail' && <Button>Select Image</Button>}
            </Stack>
          </Stack>
          {!action && <CheckBox name="isSendEmail" label="Send email confirmation" />}
          {action !== 'detail' && (
            <Stack direction="row" spacing={2} width="62%" sx={{ mt: 2 }}>
              <Button fullWidth onClick={handleClick}>
                {action === 'edit' ? 'Save Changes' : 'Add User'}
              </Button>
              <Button fullWidth variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Stack>
          )}
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUserDetail;

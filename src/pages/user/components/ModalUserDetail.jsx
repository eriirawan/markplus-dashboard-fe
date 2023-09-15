import { useContext } from 'react';
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
import { styled } from '@mui/material/styles';
import { FormProvider, useForm } from 'react-hook-form';

import CheckBox from '@/components/CheckBox';
import MPTextField from '@/components/TextField';
import DefaultImg from '@/assets/images/default-image.png';
import useAxios from '@/hooks/useAxios';
import MPSelect from '@/components/form/mp-select/MPSelect';
import { AppContext } from '@/context/AppContext';
import { UserContext } from '../UserContext';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const ModalUserDetail = ({}) => {
  const { roles } = useContext(AppContext);
  const { methods, handleFileInputChange, handleClose, handleClick, openPopup, action, isLoading } =
    useContext(UserContext);

  const imgUrl = methods.watch('company_logo_url');

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
                    <Typography>{methods?.getValues('first_name') || '-'}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={0.5}>
                    <Typography variant="h4" color="primary.main">
                      Last Name
                    </Typography>
                    <Typography>{methods?.getValues('last_name') || '-'}</Typography>
                  </Stack>
                </Grid>
              </Grid>
            ) : (
              <Stack spacing={3}>
                <Typography variant="h3" color="primary.main">
                  User Details
                </Typography>
                <Stack direction="row" spacing={2}>
                  <MPTextField
                    fullWidth
                    required
                    label="Username"
                    name="username"
                    placeholder="Company Name"
                    size="normal"
                  />
                  <MPSelect
                    options={roles}
                    label="Role"
                    name="role_id"
                    id="id"
                    valueKey="id"
                    labelKey="role"
                    size="medium"
                    placeholder="Select Role"
                    customborderradius="5px 0px 0px 5px"
                    fullWidth
                  />
                </Stack>
                <MPTextField label="Email" name="email" placeholder="companyemail@emaildomain.com" sx={{ my: 2 }} />
                <Stack direction="row" spacing={2}>
                  <MPTextField label="First Name" name="first_name" placeholder="PT AAA" />
                  <MPTextField label="Last Name" name="last_name" placeholder="Tbk" />
                </Stack>
              </Stack>
            )}
            <Divider flexItem orientation="vertical" sx={{ borderColor: 'primary.main', borderWidth: 1 }} />
            <Stack spacing={2}>
              <Typography variant="h3" color="primary.main" sx={{ textAlign: 'center' }}>
                Company Logo
              </Typography>
              <Box
                px={1}
                component="img"
                src={imgUrl || DefaultImg}
                height={169}
                width={220}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = DefaultImg;
                }}
              />
              {action !== 'detail' && (
                <Button component="label" variant="contained" href="#file-upload">
                  Select
                  <VisuallyHiddenInput type="file" onChange={handleFileInputChange} />
                </Button>
              )}
            </Stack>
          </Stack>
          {!action && <CheckBox name="isSendEmail" label="Send email confirmation" />}
          {action !== 'detail' && (
            <Stack direction="row" spacing={2} width="62%" sx={{ mt: 2 }}>
              <Button fullWidth onClick={handleClick} disabled={isLoading}>
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

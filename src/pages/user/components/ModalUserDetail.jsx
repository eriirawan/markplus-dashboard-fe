// @ts-nocheck
import React, { useContext, useState } from 'react';
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
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Close, ArrowBack } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { FormProvider } from 'react-hook-form';
import MPlusIcon from '@/components/Icon';

import CheckBox from '@/components/CheckBox';
import MPTextField from '@/components/TextField';
import DefaultImg from '@/assets/images/default-image.png';
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

const MobileHeader = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  display: 'flex',
  padding: theme.spacing(2),
  position: 'sticky',
  top: 0,
  width: '100%',
  zIndex: 1100,
}));

const MobileContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100%',
}));

const MobileContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  gap: theme.spacing(3),
  overflowY: 'auto',
  padding: theme.spacing(3, 2),
}));

const MobileFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  bottom: 0,
  padding: theme.spacing(2),
  position: 'sticky',
  width: '100%',
}));

const ModalUserDetail = () => {
  const { roles } = useContext(AppContext);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState({ newPass: false });
  const { methods, handleFileInputChange, handleClose, handleClick, openPopup, action, isLoading } =
    useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onChangeNewPass = (val) => {
    const passValue = val.replace(/\s/g, ''); // remove whitespace
    const passCheck = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    setError(passCheck.test(passValue) ? '' : 'invalid');
    methods?.setValue('password', passValue);
  };
  const imgUrl = methods?.watch('company_logo_url');
  const password = methods?.watch('password');

  // Render different layouts based on screen size
  if (isMobile) {
    return (
      <Dialog
        fullScreen
        open={openPopup}
        transitionDuration={300}
        PaperProps={{
          sx: {
            borderRadius: 0,
            m: 0,
            p: 0,
          },
        }}
      >
        <MobileContainer>
          <MobileHeader>
            <IconButton edge="start" color="inherit" onClick={handleClose} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h2" color="text.main" sx={{ fontWeight: 400 }}>
              {action === 'detail' ? 'View User Details' : action === 'edit' ? 'Edit User' : 'Add New User'}
            </Typography>
          </MobileHeader>

          <MobileContent>
            <FormProvider {...methods}>
              <Typography variant="h3" color="primary.main" sx={{ mb: 1 }}>
                User Details
              </Typography>

              {action === 'detail' ? (
                <Stack spacing={3}>
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle2" color="primary.main">
                      User ID
                    </Typography>
                    <Typography>{methods?.getValues('id') || '-'}</Typography>
                  </Stack>
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle2" color="primary.main">
                      Username
                    </Typography>
                    <Typography>{methods?.getValues('username') || '-'}</Typography>
                  </Stack>
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle2" color="primary.main">
                      Role
                    </Typography>
                    <Typography>{methods?.getValues('role') || '-'}</Typography>
                  </Stack>
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle2" color="primary.main">
                      Email
                    </Typography>
                    <Typography>{methods?.getValues('email') || '-'}</Typography>
                  </Stack>
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle2" color="primary.main">
                      First Name
                    </Typography>
                    <Typography>{methods?.getValues('first_name') || '-'}</Typography>
                  </Stack>
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle2" color="primary.main">
                      Last Name
                    </Typography>
                    <Typography>{methods?.getValues('last_name') || '-'}</Typography>
                  </Stack>
                </Stack>
              ) : (
                <Stack spacing={3}>
                  <MPTextField required label="Username" name="username" placeholder="Company Name" fullWidth />
                  <MPSelect
                    options={roles}
                    label="Role"
                    name="role_id"
                    id="id"
                    valueKey="id"
                    labelKey="role"
                    size="medium"
                    placeholder="Select Role"
                    fullWidth
                    required
                  />
                  <MPTextField
                    required
                    label="Email"
                    name="email"
                    placeholder="companyemail@emaildomain.com"
                    fullWidth
                  />
                  {action !== 'edit' && (
                    <TextField
                      error={error !== '' && error !== 'unmatch'}
                      helperText={
                        error === 'invalid'
                          ? 'Password must consist of at least 8 characters, capital letter and number.'
                          : null
                      }
                      FormHelperTextProps={{ style: { margin: '4px 0px 0px' } }}
                      size="small"
                      label="Password"
                      placeholder="Your new password"
                      type={showPassword.newPass ? 'text' : 'password'}
                      value={password}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Box
                              width={24}
                              height={24}
                              sx={{ cursor: 'pointer' }}
                              onClick={() => setShowPassword({ ...showPassword, newPass: !showPassword.newPass })}
                            >
                              <MPlusIcon name={showPassword.newPass ? 'EyeHide' : 'EyeShow'} />
                            </Box>
                          </InputAdornment>
                        ),
                        style: {
                          height: '44px',
                        },
                      }}
                      InputLabelProps={{ shrink: true }}
                      sx={(theme) => ({
                        '& .Mui-focused': {
                          color: theme.palette.primary.lightBlue,
                        },
                      })}
                      onChange={(e) => onChangeNewPass(e.target.value)}
                    />
                  )}
                  <MPTextField required label="First Name" name="first_name" placeholder="PT AAA" fullWidth />
                  <MPTextField required label="Last Name" name="last_name" placeholder="Tbk" fullWidth />
                </Stack>
              )}
              <Typography variant="h6" color="primary.main" sx={{ mb: 1, mt: 2 }}>
                Company Logo
              </Typography>
              <Stack spacing={2} alignItems="center">
                <Box
                  component="img"
                  src={imgUrl || DefaultImg}
                  height={160}
                  sx={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1,
                    maxWidth: 220,
                    objectFit: 'contain',
                    width: '100%',
                  }}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = DefaultImg;
                  }}
                />
                {action !== 'detail' && (
                  <Button component="label" variant="contained" href="#file-upload" fullWidth sx={{ maxWidth: 220 }}>
                    Select Image
                    <VisuallyHiddenInput type="file" onChange={handleFileInputChange} />
                  </Button>
                )}
              </Stack>
              {/* {action !== 'detail' && <CheckBox name="isSendEmail" label="Send email confirmation" sx={{ mt: 2 }} />} */}
            </FormProvider>
          </MobileContent>
          {action !== 'detail' && (
            <MobileFooter>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" fullWidth onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" fullWidth onClick={handleClick} disabled={isLoading}>
                  {action === 'edit' ? 'Save Changes' : 'Add User'}
                </Button>
              </Stack>
            </MobileFooter>
          )}
        </MobileContainer>
      </Dialog>
    );
  }

  // Desktop version
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
              <Box sx={{ width: 380 }}>
                <Stack direction="row" flexWrap="wrap" sx={{ width: '100%' }}>
                  <Box sx={{ width: '50%', mb: 2 }}>
                    <Stack spacing={0.5}>
                      <Typography variant="h4" color="primary.main">
                        User ID
                      </Typography>
                      <Typography>{methods?.getValues('id') || '-'}</Typography>
                    </Stack>
                  </Box>
                  <Box sx={{ width: '50%', mb: 2 }}>
                    <Stack spacing={0.5}>
                      <Typography variant="h4" color="primary.main">
                        Role
                      </Typography>
                      <Typography>{methods?.getValues('role') || '-'}</Typography>
                    </Stack>
                  </Box>
                  <Box sx={{ width: '50%', mb: 2 }}>
                    <Stack spacing={0.5}>
                      <Typography variant="h4" color="primary.main">
                        Username
                      </Typography>
                      <Typography>{methods?.getValues('username') || '-'}</Typography>
                    </Stack>
                  </Box>
                  <Box sx={{ width: '50%', mb: 2 }}>
                    <Stack spacing={0.5}>
                      <Typography variant="h4" color="primary.main">
                        Email
                      </Typography>
                      <Typography>{methods?.getValues('email') || '-'}</Typography>
                    </Stack>
                  </Box>
                  <Box sx={{ width: '50%', mb: 2 }}>
                    <Stack spacing={0.5}>
                      <Typography variant="h4" color="primary.main">
                        First Name
                      </Typography>
                      <Typography>{methods?.getValues('first_name') || '-'}</Typography>
                    </Stack>
                  </Box>
                  <Box sx={{ width: '50%', mb: 2 }}>
                    <Stack spacing={0.5}>
                      <Typography variant="h4" color="primary.main">
                        Last Name
                      </Typography>
                      <Typography>{methods?.getValues('last_name') || '-'}</Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            ) : (
              <Stack spacing={3}>
                <Typography variant="h3" color="primary.main">
                  User Details
                </Typography>
                <MPTextField required label="Email" name="email" placeholder="companyemail@emaildomain.com" />
                <TextField
                  error={error !== '' && error !== 'unmatch'}
                  helperText={
                    error === 'invalid'
                      ? 'Password must consist of at least 8 characters, capital letter and number.'
                      : null
                  }
                  FormHelperTextProps={{ style: { margin: '4px 0px 0px' } }}
                  size="small"
                  label={action === 'edit' ? 'New Password' : 'Password'}
                  placeholder="Your new password"
                  type={showPassword.newPass ? 'text' : 'password'}
                  value={password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box
                          width={24}
                          height={24}
                          sx={{ cursor: 'pointer' }}
                          onClick={() => setShowPassword({ ...showPassword, newPass: !showPassword.newPass })}
                        >
                          <MPlusIcon name={showPassword.newPass ? 'EyeHide' : 'EyeShow'} />
                        </Box>
                      </InputAdornment>
                    ),
                    style: {
                      height: '44px',
                      textAlign: 'center',
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  sx={(theme) => ({
                    '& .Mui-focused': {
                      color: theme.palette.primary.lightBlue,
                    },
                  })}
                  onChange={(e) => onChangeNewPass(e.target.value)}
                />
                <Stack direction="row" spacing={2} sx={{ py: 2 }}>
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
                    required
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <MPTextField required label="First Name" name="first_name" placeholder="PT AAA" />
                  <MPTextField required label="Last Name" name="last_name" placeholder="Tbk" />
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

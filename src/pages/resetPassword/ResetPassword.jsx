import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Card, TextField, Typography, InputAdornment, CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';

import { useAuth } from '@/hooks/useAuth';
import MPlusIcon from '@/components/Icon';
import Logo from '../../assets/logo-light.png';
import media from '../../helpers/MediaQueries';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { setPassword, isLoading } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [error, setError] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPassword, setShowPassword] = useState({ newPass: false, confirmPass: false });

  const onChangeNewPass = (val) => {
    const passValue = val.replace(/\s/g, ''); // remove whitespace
    const passCheck = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    setError(passCheck.test(passValue) ? '' : 'invalid');
    setNewPass(passValue);
  };

  const checkSetPassword = async () => {
    try {
      setError('');
      await setPassword({
        forgot_password_token: token,
        password: newPass,
        confirm_password: confirmPass,
      });
      enqueueSnackbar('Password updated successfully', {
        variant: 'successSnackbar',
      });
      navigate('/login', { replace: true });
    } catch (e) {
      setError('error');
      enqueueSnackbar(e?.message, {
        variant: 'errorSnackbar',
      });
    }
  };

  const handleSetNewPass = () => {
    if (newPass !== confirmPass) {
      setError('unmatch');
    } else {
      checkSetPassword();
    }
  };

  return (
    <Container
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.lightMain,
      })}
    >
      <CardContainer>
        <Image src={Logo} />
        <HeaderCard>Update Password</HeaderCard>
        <Form>
          <NewPassword
            error={error !== '' && error !== 'unmatch'}
            helperText={
              error === 'invalid' ? 'Password must consist of at least 8 characters, capital letter and number.' : null
            }
            FormHelperTextProps={{ style: { margin: '4px 0px 0px' } }}
            size="small"
            label="New password"
            placeholder="Your new password"
            type={showPassword.newPass ? 'text' : 'password'}
            value={newPass}
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
          <ConfirmPassword
            error={error !== '' && error !== 'invalid'}
            helperText={error === 'unmatch' ? 'Passwords do not match. Try Again.' : null}
            FormHelperTextProps={{ style: { margin: '4px 0px 0px' } }}
            size="small"
            label="Confirm password"
            placeholder="Retype your new password"
            type={showPassword.confirmPass ? 'text' : 'password'}
            value={confirmPass}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box
                    width={24}
                    height={24}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setShowPassword({ ...showPassword, confirmPass: !showPassword.confirmPass })}
                  >
                    <MPlusIcon name={showPassword.confirmPass ? 'EyeHide' : 'EyeShow'} />
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
            onChange={(e) => setConfirmPass(e.target.value.replace(/\s/g, ''))}
          />

          <ButtonSetPassword
            loading={isLoading}
            disabled={isLoading || error === 'invalid' || !(confirmPass && newPass)}
            color="primary"
            variant="contained"
            onClick={() => handleSetNewPass()}
            {...(isLoading && {
              loadingPosition: 'start',
              startIcon: <CircularProgress size={16} />,
            })}
          >
            Set new password
          </ButtonSetPassword>
        </Form>
      </CardContainer>
    </Container>
  );
};

export default ResetPassword;

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.phone`
    padding: 32px;
    `}
  padding: 64px;
`;
const Image = styled.img`
  margin-bottom: 32px;
`;
const HeaderCard = styled(Typography)`
  ${media.phone`
    font-size: 24px;
    line-height: 31px;
    `}
  font-weight: 700;
  font-size: 30px;
  line-height: 39px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 41px;
  color: #2e459a;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 256px;
  width: 100%;
`;

const NewPassword = styled(TextField)`
  margin-bottom: 41px !important;
  max-width: 256px;
  width: 100%;
`;

const ConfirmPassword = styled(TextField)`
  max-width: 256px;
  width: 100%;
  margin-bottom: 51px !important;
`;

const ButtonSetPassword = styled(LoadingButton)`
  max-width: 256px;
  width: 100%;
`;

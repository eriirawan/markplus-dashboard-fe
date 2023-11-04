import React, { useEffect, useState } from 'react';
import { Button, TextField, Card, Box, Typography, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import Logo from '@/assets/logo-light.png';
import { ChevronLeft } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import media from '@/helpers/MediaQueries';
import { useAuth } from '../../hooks/useAuth';

const ForgotPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { resetPassword, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false);

  const handleForgetPassword = async () => {
    try {
      if (email) {
        await resetPassword(email);
        navigate('/forgot-password-success');
      } else {
        setIsError(true);
      }
    } catch (e) {
      setIsError(true);
      enqueueSnackbar(e?.message, {
        variant: 'errorSnackbar',
      });
    }
  };

  return (
    <Container
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.lightMain,
      })}
    >
      <Box sx={{ maxWidth: '640px' }}>
        <Button
          variant="text"
          startIcon={<ChevronLeft />}
          sx={{ marginBottom: '32px', maxWidth: '54px' }}
          onClick={() => navigate('/login', { replace: true })}
        >
          Back
        </Button>
        <CardContainer>
          <Image src={Logo} />
          <HeaderCard>Recover your password</HeaderCard>
          <DescriptionCard>
            <Box component="span" fontWeight="700">
              Enter the email{' '}
            </Box>
            that you used when register to recover your password. You will receive a
            <Box component="span" fontWeight="700">
              {' '}
              password reset link.
            </Box>
          </DescriptionCard>
          <EmailField
            value={email}
            size="small"
            label="Email"
            placeholder="Your registered email"
            error={isError}
            InputProps={{
              style: {
                height: '44px',
                textAlign: 'center',
              },
            }}
            sx={(theme) => ({
              '& .Mui-focused': {
                color: theme.palette.primary.lightBlue,
              },
            })}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsError(false);
            }}
          />
          <SendLinkButton
            loading={isLoading}
            disabled={isLoading}
            color="primary"
            variant="contained"
            onClick={() => handleForgetPassword()}
            {...(isLoading && {
              loadingPosition: 'start',
              startIcon: <CircularProgress size={16} />,
            })}
          >
            Send Link
          </SendLinkButton>
        </CardContainer>
      </Box>
    </Container>
  );
};
const Container = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 640px;
  ${media.phone`
  padding: 32px;
  `}
  padding: 64px;
`;
const Image = styled.img`
  margin-bottom: 32;
  height: 63px;
  width: 99px;
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
  color: #2e459a;
  margin-top: 0;
  margin-bottom: 16px;
`;

const DescriptionCard = styled(Typography)`
  ${media.phone`
    font-size: 12px;
    line-height: 18px;
  `}
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #000000;
  width: 100%;
  margin: 0;
  margin-bottom: 41px;
`;

const EmailField = styled(TextField)`
  width: 100%;
  height: 44px;
  margin-bottom: 35px !important;
`;

const SendLinkButton = styled(LoadingButton)`
  width: 100%;
`;

export default ForgotPassword;

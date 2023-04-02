import { Button, Card, TextField } from '@mui/material';
import { Box, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../../assets/icons/graphics/Logo-Light.svg';
import { Link } from 'react-router-dom';
import MPlusIcon from '@/components/Icon';
import media from '../../helpers/MediaQueries';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.lightMain,
      })}
    >
      <CardContainer>
        <Image src={Logo} />
        <HeaderCard>Log in</HeaderCard>
        <Content>
          <TextField
            label="Username"
            placeholder="Your Username"
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
          />
          <TextField
            label="Password"
            placeholder="Your Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              style: {
                height: '44px',
                textAlign: 'center',
              },
              endAdornment: (
                <InputAdornment position="end">
                  <Box width={24} height={24} sx={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                    <MPlusIcon name={showPassword ? 'EyeHide' : 'EyeShow'}></MPlusIcon>
                  </Box>
                </InputAdornment>
              ),
            }}
          />
          <LoginButton variant="contained" color="primary">
            Log in
          </LoginButton>
        </Content>
        <ForgotPassword to="/forgot-password">Forgot Password?</ForgotPassword>
      </CardContainer>
    </Container>
  );
}

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.phone`
    padding: 32px;
  `}
  padding: 64px;
  max-height: 577px;
  max-width: 384px;
  width: 100%;
`;

const LoginButton = styled(Button)``;

const ForgotPassword = styled(Link)`
  margin-top: 32px;
  color: #2e459a;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
`;

const Image = styled.img`
  margin-bottom: 32;
`;
const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: 41px;
  max-width: 256px;
  width: 100%;
`;

const HeaderCard = styled.p`
  font-family: 'Poppins';
  font-weight: 700;
  font-size: 30px;
  line-height: 39px;
  text-align: center;
  color: #2e459a;
`;

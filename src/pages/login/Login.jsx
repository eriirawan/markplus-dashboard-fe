import { Box, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import Logo from '@/assets/logo-light.png';
import MPlusIcon from '@/components/Icon';
import { Container, CardContainer, LoginButton, ForgotPassword, Image, Content, HeaderCard } from './Login.style';

const Login = () => {
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
            InputLabelProps={{ shrink: true }}
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
              endAdornment: (
                <InputAdornment position="end">
                  <Box width={24} height={24} sx={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                    <MPlusIcon name={showPassword ? 'EyeHide' : 'EyeShow'} />
                  </Box>
                </InputAdornment>
              ),
              style: {
                height: '44px',
                textAlign: 'center',
              },
            }}
            InputLabelProps={{ shrink: true }}
          />
          <LoginButton variant="contained" color="primary">
            Log in
          </LoginButton>
        </Content>
        <ForgotPassword to="/forgot-password">Forgot Password?</ForgotPassword>
      </CardContainer>
    </Container>
  );
};

export default Login;

import { Box, InputAdornment, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Logo from '@/assets/logo-light.png';
import MPlusIcon from '@/components/Icon';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Container, CardContainer, LoginButton, ForgotPassword, Image, Content, HeaderCard } from './Login.style';

const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogin = async (data) => {
    try {
      await login(data);
    } catch (e) {
      console.warn('error login');
    }
  };

  useEffect(() => {
    if (user) navigate('/home');
  }, []);

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
          <LoginButton variant="contained" color="primary" onClick={handleLogin}>
            Log in
          </LoginButton>
        </Content>
        <ForgotPassword to="/forgot-password">Forgot Password?</ForgotPassword>
      </CardContainer>
    </Container>
  );
};

export default Login;

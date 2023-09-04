import { Box, InputAdornment, TextField, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Logo from '@/assets/logo-light.png';
import MPlusIcon from '@/components/Icon';
import AuthLayout from '@/components/layout/AuthLayout';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Container, CardContainer, LoginButton, ForgotPassword, Image, Content, HeaderCard } from './Login.style';

const Login = () => {
  const { login, user, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    userName: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError(false);
      await login(data);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    if (user) navigate('/home');
  }, []);

  return (
    <AuthLayout>
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
              error={error}
              label="Username"
              placeholder="Your Username"
              value={data?.userName}
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
              onChange={(e) => setData({ ...data, userName: e.target.value })}
            />
            <TextField
              error={error}
              label="Password"
              value={data?.password}
              placeholder="Your Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      width={24}
                      height={24}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
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
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <LoginButton
              loading={isLoading}
              disabled={isLoading}
              variant="contained"
              color="primary"
              onClick={handleLogin}
              {...(isLoading && {
                loadingPosition: 'start',
                startIcon: <CircularProgress size={16} />,
              })}
            >
              Log in
            </LoginButton>
          </Content>
          <ForgotPassword to="/forgot-password">Forgot Password?</ForgotPassword>
        </CardContainer>
      </Container>
    </AuthLayout>
  );
};

export default Login;

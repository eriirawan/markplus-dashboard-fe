import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { capitalizeString, generatePageTitle, getWindowDimensions } from '@/helpers/Utils';
import { useAuth } from '@/hooks/useAuth';

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const locationKeys = location.pathname.split('/');
  const windowDimensions = getWindowDimensions();
  const navigate = useNavigate();
  const { user } = useAuth();

  generatePageTitle(`${capitalizeString(locationKeys[locationKeys.length - 1].replaceAll('-', ' '))}`);

  useEffect(() => {
    if (user) navigate('/home');
  }, []);

  return <Box sx={{ height: windowDimensions.height }}>{children}</Box>;
};

export default AuthLayout;

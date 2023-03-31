import { Box, Grid, Typography } from '@mui/material';
import { getYear } from 'date-fns';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { capitalizeString, generatePageTitle, getWindowDimensions } from '@/helpers/Utils';
import { useAuth } from '@/hooks/useAuth';
import AuthCarousel from '../AuthCarousel';

const AuthLayout = ({ children }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const locationKeys = location.pathname.split('/');
  const windowDimensions = getWindowDimensions();
  const navigate = useNavigate();
  const { user } = useAuth();

  generatePageTitle(`${capitalizeString(locationKeys[locationKeys.length - 1].replaceAll('-', ' '))}`);

  useEffect(() => {
    if (user) navigate('/home');
  }, []);

  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={7} sx={{ px: 20, py: 6 }}>
        <Box sx={{ height: 0.8 * windowDimensions.height }}>{children}</Box>
        <Box
          sx={{
            height: 0.05 * windowDimensions.height,
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" align="center">
            {t('#.login.footer', { year: getYear(new Date()) })}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={5}>
        <AuthCarousel />
      </Grid>
    </Grid>
  );
};

export default AuthLayout;

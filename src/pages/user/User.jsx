import { Paper, Typography, Breadcrumbs, Stack, Box } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const User = () => {
  const location = useLocation();

  return (
    <Paper sx={{ borderRadius: 1.25, display: 'flex', height: '100%', mt: 1, p: 4 }}>
      <Stack>
        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon sx={{ fontSize: 11 }} />}>
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="text.primary">
              Home
            </Typography>
          </Link>
          <Typography variant="body2" color="primary.main" textTransform="capitalize">
            {location.pathname.replace(/[^a-z0-9]/g, ' ').trim()}
          </Typography>
        </Breadcrumbs>
        <Box pt={2}>
          <Typography variant="h1" textTransform="capitalize" color="primary.main">
            {location.pathname.replace(/[^a-z0-9]/g, ' ').trim()}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default User;

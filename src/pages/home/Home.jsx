import { AppContext } from '@/context/AppContext';
import { sideBarContentWidth } from '@/helpers/Constants';
import { Stack, Box, Typography } from '@mui/material';
import { useContext } from 'react';

const Home = () => {
  const { me } = useContext(AppContext);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        height: '100%',
        overflow: 'auto',
        position: 'fixed',
        width: `calc(100% - ${sideBarContentWidth + 60}px)`,
      }}
    >
      <Box sx={{ height: 768, my: 'auto', p: 2, width: 1024 }}>
        <Stack direction="row" mb={4}>
          <Typography fontWeight={800} fontSize={32} mr={2}>
            Hi{' '}
          </Typography>
          <Typography
            fontSize={32}
            fontWeight={800}
            sx={(theme) => ({
              textDecoration: 'underline',
              textDecorationColor: theme.palette.primary[200],
              textDecorationThickness: 4,
            })}
            display="inline"
          >
            {me?.firstName || me?.lastName || ''}.
          </Typography>
          <Typography variant="body1" fontSize={32}>
            Welcome to MarkPlus.
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Home;

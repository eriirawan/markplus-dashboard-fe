import { AppContext } from '@/context/AppContext';
import { AccountCircle, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Stack, Box, IconButton, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useContext } from 'react';

const ProfileBarButton = ({
  openProfileBar,
  setOpenNotification,
  setOpenTaskList,
  setOpenProfileBar,
  setShowDrawerBackground,
}) => {
  const { me } = useContext(AppContext);

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: openProfileBar ? alpha(theme.palette.primary.main, 0.08) : 'none',
        borderRadius: 1,
        cursor: 'pointer',
      })}
    >
      <IconButton
        size="small"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={() => {
          setShowDrawerBackground(true);
          setOpenProfileBar((prev) => !prev);
          setOpenTaskList(false);
          setOpenNotification(false);
        }}
        disableRipple
        sx={{ m: 0, p: 0 }}
      >
        <Stack alignItems="end">
          <Typography color="white" variant="body1" fontWeight={600} sx={{ mx: 1 }}>
            {me ? `${me?.firstName} ${me?.lastName}` : ''}
          </Typography>
          <Typography color="white" variant="body2" sx={{ mx: 1 }}>
            Admin
          </Typography>
        </Stack>
        <AccountCircle sx={{ color: openProfileBar ? 'primary.main' : 'white', fontSize: 25 }} />
      </IconButton>
    </Box>
  );
};

export default ProfileBarButton;

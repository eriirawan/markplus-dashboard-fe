import { AppContext } from '@/context/AppContext';
import { AccountCircle } from '@mui/icons-material';
import { Stack, Box, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const ProfileBarButton = ({
  openProfileBar,
  setOpenNotification,
  setOpenTaskList,
  setOpenProfileBar,
  setShowDrawerBackground,
}) => {
  const { logout } = useAuth();
  const { me } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
    setOpenProfileBar((prev) => !prev);
  };

  return (
    <Box
      component="div"
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
        onClick={(e) => {
          setShowDrawerBackground(true);
          setOpenProfileBar((prev) => !prev);
          setOpenTaskList(false);
          setOpenNotification(false);
          setAnchorEl(e.currentTarget);
        }}
        disableRipple
        sx={{ m: 0, p: 0 }}
      >
        <Stack alignItems="end">
          <Typography color="white" variant="body1" fontWeight={600} sx={{ mx: 1 }}>
            {me ? `${me?.firstName} ${me?.lastName}` : ''}
          </Typography>
        </Stack>
        <AccountCircle sx={{ color: openProfileBar ? 'black' : 'white', fontSize: 25 }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>Change Password</MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileBarButton;

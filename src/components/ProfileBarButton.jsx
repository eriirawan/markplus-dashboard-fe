import { AppContext } from '@/context/AppContext';
import { AccountCircle } from '@mui/icons-material';
import { Stack, Box, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ProfileBarButton = ({
  openProfileBar,
  setOpenNotification,
  setOpenTaskList,
  setOpenProfileBar,
  setShowDrawerBackground,
}) => {
  const { logout } = useAuth();
  const { me } = useContext(AppContext);
  const navigate = useNavigate();
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
          setAnchorEl(e?.currentTarget);
        }}
        disableRipple
        sx={{ m: 0, px: 2, py: 1 }}
      >
        <Stack alignItems="end">
          <Typography variant="body1" fontWeight={600} sx={{ mx: 1, textTransform: 'capitalize' }}>
            {me ? `${me?.first_name?.toLowerCase()} ${me?.last_name?.toLowerCase()}` : ''}
          </Typography>
          <Typography variant="body2" sx={{ mx: 1 }}>
            {me ? me.role : ''}
          </Typography>
        </Stack>
        <AccountCircle sx={{ color: openProfileBar ? 'black' : 'primary.main', fontSize: 30 }} />
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
        <MenuItem onClick={() => navigate('/reset-password', { replace: true })}>Change Password</MenuItem>
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

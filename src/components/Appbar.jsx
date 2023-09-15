import { Stack, Typography } from '@mui/material';
import ProfileBarButton from '@/components/ProfileBarButton';
// import NotificationButton from './notification/NotificationButton';

const Appbar = ({
  title,
  openProfileBar,
  setOpenNotification,
  setOpenTaskList,
  setOpenProfileBar,
  setShowDrawerBackground,
}) => (
  <Stack flexDirection="row" alignItems="center" justifyContent="space-between" sx={{ py: 1, width: '100%' }}>
    <Stack flexDirection="row" justifyContent="flex-start" display="flex">
      <Typography variant="h2" sx={{ textTransform: 'uppercase' }}>
        {title}
      </Typography>
    </Stack>
    <Stack flexDirection="row" justifyContent="flex-start" display="flex">
      <ProfileBarButton
        openProfileBar={openProfileBar}
        setOpenNotification={setOpenNotification}
        setOpenTaskList={setOpenTaskList}
        setOpenProfileBar={setOpenProfileBar}
        setShowDrawerBackground={setShowDrawerBackground}
      />
    </Stack>
  </Stack>
);

export default Appbar;

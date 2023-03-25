import ProfileBarButton from '@/components/ProfileBarButton';
import { Box, Stack, Typography } from '@mui/material';
// import NotificationButton from './notification/NotificationButton';

const Appbar = ({
  openNotification,
  openProfileBar,
  setOpenNotification,
  setOpenTaskList,
  setOpenProfileBar,
  setShowDrawerBackground,
}) => (
  <Stack flexDirection="row" justifyContent="space-between" sx={{ width: '100%' }}>
    <Stack flexDirection="row" justifyContent="flex-start" display="flex">
      <Box height={25} sx={{ mr: 5, mt: 1 }}>
        <Typography>MARKPLUS DASHBOARD</Typography>
      </Box>
    </Stack>
    <Stack flexDirection="row" justifyContent="flex-start" display="flex">
      <ProfileBarButton
        openProfileBar={openProfileBar}
        setOpenNotification={setOpenNotification}
        setOpenTaskList={setOpenTaskList}
        setOpenProfileBar={setOpenProfileBar}
        setShowDrawerBackground={setShowDrawerBackground}
      />
      {/* <NotificationButton
        openNotification={openNotification}
        setOpenNotification={setOpenNotification}
        setOpenTaskList={setOpenTaskList}
        setOpenProfileBar={setOpenProfileBar}
        setShowDrawerBackground={setShowDrawerBackground}
      /> */}
    </Stack>
  </Stack>
);

export default Appbar;

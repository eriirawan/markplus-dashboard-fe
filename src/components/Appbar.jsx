import { MenuItem, Select, Stack, Typography, Paper } from '@mui/material';
import ProfileBarButton from '@/components/ProfileBarButton';
import { ExpandMore } from '@mui/icons-material';
// import NotificationButton from './notification/NotificationButton';

const Appbar = ({
  title,
  openProfileBar,
  setOpenNotification,
  setOpenTaskList,
  setOpenProfileBar,
  setShowDrawerBackground,
  setShowDialogClient,
}) => (
  <Stack flexDirection="row" alignItems="center" justifyContent="space-between" sx={{ py: 1, width: '100%' }}>
    <Stack flexDirection="row" justifyContent="flex-start" display="flex" maxWidth={'403px'} width={'100%'}>
      {/* <Select>
        <MenuItem disabled value=""></MenuItem>
      </Select> */}
      <Paper
        sx={{
          width: '100%',
          maxWidth: '403px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          cursor: 'pointer',
        }}
        onClick={(e) => setShowDialogClient((prev) => !prev)}
      >
        <Typography variant="h2" sx={{ textTransform: 'uppercase', color: 'primary.main' }}>
          {title}
        </Typography>
        <ExpandMore />
      </Paper>
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

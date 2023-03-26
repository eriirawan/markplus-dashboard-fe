import { Box, ClickAwayListener, Grid, Stack } from '@mui/material';
// import { alpha } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
// import TaskListDrawer from '@/components/TaskListDrawer';
// import ProfileBarDrawer from '@/components/ProfileBarDrawer';
// import NotificationDrawer from '@/components/notification/NotificationDrawer';
import { getWindowDimensions } from '@/helpers/Utils';
import { AppContext } from '@/context/AppContext';
import { AppBarContext, useStore } from '@/context/AppBarContext';
import { useAuth } from '@/hooks/useAuth';
import { appBarHeight } from '../../../helpers/Constants';
import Appbar from '../../Appbar';
import useSidebarMenus from '../SidebarMenu';
import Sidebar from './Sidebar';
import SidebarSmall from './SidebarSmall';

const ProtectedLayout = () => {
  const { refreshMeData } = useAuth();
  const { userToken: token } = useContext(AppContext);
  const store = useStore();
  const menus = useSidebarMenus();
  const outlet = useOutlet();
  const location = useLocation();
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);
  const [openSideBar, setOpenSidebar] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openTaskList, setOpenTaskList] = useState(false);
  const [openProfileBar, setOpenProfileBar] = useState(false);
  const [showDrawerBackground, setShowDrawerBackground] = useState(false);
  const windowDimensions = getWindowDimensions();

  const styles = {
    appBarContainer: {
      alignItems: 'center',
      bgcolor: 'primary.main',
      borderBottom: '1px solid #C7D5EA',
      borderRadius: 1.25,
      layout: 'fixed',
      m: 0,
      overflow: 'hidden',
      pl: 2.5,
      pr: 1.5,
      py: 1,
      // width: `calc(100% - ${sideBarContentWidth}px)`
    },
    appContainer: { height: '100%', layout: 'fixed' },
    outletContainer: {
      height: windowDimensions.height - appBarHeight - 64,
      overflow: 'auto',
      pt: 3,
      // width: `calc(100% - ${sideBarContentWidth}px)`,
    },
  };

  const handleOpenSidebar = (state) => setOpenSidebar(state);

  window.onload = async () => {
    if (token) {
      await refreshMeData();
    } else {
      window.location.href = `/login`;
    }
  };

  return (
    <AppBarContext.Provider value={store} style={{ padding: '32px' }}>
      <Grid container>
        {/* <Grid item container xs={12} sx={styles.appBarContainer}>
        </Grid> */}
        <Grid item container direction="row" xs={12} sx={styles.appContainer}>
          <Stack direction="row" width="100%" spacing={4}>
            <ClickAwayListener onClickAway={() => handleOpenSidebar(false)}>
              <Box position="relative">
                <Sidebar openSidebar={openSideBar} handleOpenSidebar={handleOpenSidebar} menus={menus} />
                <SidebarSmall height="100%" handleOpenSidebar={handleOpenSidebar} menus={menus} />
              </Box>
            </ClickAwayListener>
            <Stack flex={1} width="100%">
              <Box sx={styles.appBarContainer}>
                <Appbar
                  openNotification={openNotification}
                  openTaskList={openTaskList}
                  openProfileBar={openProfileBar}
                  setOpenNotification={setOpenNotification}
                  setOpenTaskList={setOpenTaskList}
                  setOpenProfileBar={setOpenProfileBar}
                  setShowDrawerBackground={setShowDrawerBackground}
                />
              </Box>
              <Box sx={styles.outletContainer}>
                <Stack sx={{ ':-webkit-scrollbar': { display: 'none' }, height: '100%', overflow: 'auto' }}>
                  {outlet}
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Grid>
        {/* <Box
          justifyContent="flex-end"
          alignItems="flex-end"
          flexDirection="row"
          sx={(theme) => ({
            backgroundColor: alpha(theme.palette.text.primary, 0.1),
            display: showDrawerBackground ? 'block' : 'none',
            height: windowDimensions.height - appBarHeight,
            marginLeft: `${sideBarContentWidth}px`,
            marginTop: `${appBarHeight}px`,
            position: 'fixed',
            width: `calc(100% - ${sideBarContentWidth}px)`,
            zIndex: 900,
          })}
        >
          <NotificationDrawer
            openNotification={openNotification}
            setOpenNotification={setOpenNotification}
            setShowDrawerBackground={setShowDrawerBackground}
          />
          <TaskListDrawer
            openTaskList={openTaskList}
            setOpenTaskList={setOpenTaskList}
            setShowDrawerBackground={setShowDrawerBackground}
          />
          <ProfileBarDrawer
            openProfileBar={openProfileBar}
            setOpenProfileBar={setOpenProfileBar}
            setShowDrawerBackground={setShowDrawerBackground}
          />
        </Box> */}
      </Grid>
    </AppBarContext.Provider>
  );
};

export default ProtectedLayout;

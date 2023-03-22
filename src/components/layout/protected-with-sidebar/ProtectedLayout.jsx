import { Box, ClickAwayListener, Grid, Stack, Typography } from '@mui/material';
// import { alpha } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
// import TaskListDrawer from '@/components/TaskListDrawer';
// import ProfileBarDrawer from '@/components/ProfileBarDrawer';
// import NotificationDrawer from '@/components/notification/NotificationDrawer';
import { appBarHeight, protectedContentWidth, sideBarContentWidth } from '../../../helpers/Constants';
import { getWindowDimensions } from '@/helpers/Utils';
import { useAuth } from '@/hooks/useAuth';
import { AppContext } from '@/context/AppContext';
import { AppBarContext, useStore } from '@/context/AppBarContext';
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
      borderBottom: '1px solid #C7D5EA',
      height: appBarHeight,
      layout: 'fixed',
      m: 0,
      overflow: 'hidden',
      pl: 2.5,
      pr: 1.5,
      py: 1,
    },
    appContainer: { height: `calc(100% - ${appBarHeight}px)`, layout: 'fixed' },
    outletContainer: {
      height: windowDimensions.height - appBarHeight,
      overflow: 'auto',
      p: 3,
      pt: 3,
      width: `calc(100% - ${sideBarContentWidth}px)`,
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
    <AppBarContext.Provider value={store}>
      <Grid container>
        <Grid item container xs={12} sx={styles.appBarContainer}>
          <Appbar
            openNotification={openNotification}
            openTaskList={openTaskList}
            openProfileBar={openProfileBar}
            setOpenNotification={setOpenNotification}
            setOpenTaskList={setOpenTaskList}
            setOpenProfileBar={setOpenProfileBar}
            setShowDrawerBackground={setShowDrawerBackground}
          />
        </Grid>
        <Grid item container direction="row" xs={12} sx={styles.appContainer}>
          <ClickAwayListener onClickAway={() => handleOpenSidebar(false)}>
            <Box>
              <Sidebar openSidebar={openSideBar} handleOpenSidebar={handleOpenSidebar} menus={menus} />
              <SidebarSmall
                height={windowDimensions.height - appBarHeight}
                handleOpenSidebar={handleOpenSidebar}
                menus={menus}
              />
            </Box>
          </ClickAwayListener>
          <Box sx={styles.outletContainer}>
            <Stack sx={{ minWidth: protectedContentWidth, overflow: 'auto' }}>
              {outlet}
            </Stack>
          </Box>
        </Grid>
        {location.pathname === '/home' && (
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              borderTopColor: 'neutral.lightGrey',
              borderTopStyle: 'solid',
              borderTopWidth: 1,
              bottom: 0,
              height: 40,
              position: 'fixed',
              pt: 1.5,
              px: 3,
              right: 0,
              width: `calc(100% - ${sideBarContentWidth}px)`,
            }}
          >
            <Box> </Box>
            <Typography variant="body2" sx={{ color: 'neutral.greyScale02' }}>
              © 2023 MarkPlus. All Right Reserved.
            </Typography>
          </Stack>
        )}
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

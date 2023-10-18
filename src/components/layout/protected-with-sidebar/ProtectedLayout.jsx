import {
  Box,
  ClickAwayListener,
  Grid,
  Stack,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
} from '@mui/material';
// import { alpha } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
// import TaskListDrawer from '@/components/TaskListDrawer';
// import ProfileBarDrawer from '@/components/ProfileBarDrawer';
// import NotificationDrawer from '@/components/notification/NotificationDrawer';
import { getWindowDimensions } from '@/helpers/Utils';
import { AppContext } from '@/context/AppContext';
import { AppBarContext, useStore } from '@/context/AppBarContext';
import { useAuth } from '@/hooks/useAuth';
import { appBarHeight, sideBarContentWidth } from '../../../helpers/Constants';
import Appbar from '../../Appbar';
import useSidebarMenus from '../SidebarMenu';
import Sidebar from './Sidebar';
import SidebarSmall from './SidebarSmall';
import useAfterLoginStartup from '@/hooks/useAfterLogin';
import DialogFormContainer from '../../Dialog/DialogForm';
import useAxios from '@/hooks/useAxios';
import { useUserStore } from '../../../pages/user/UserContext';
const ProtectedLayout = () => {
  const { refreshMeData } = useAuth();
  const { userToken: token, me } = useContext(AppContext);
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
  const [showDialogClient, setShowDialogClient] = useState(false);
  const windowDimensions = getWindowDimensions();
  const { refreshMasterData } = useAfterLoginStartup();
  const [clientValue, setClientValue] = useState(null);
  const [pageClientList, setPageClientList] = useState(1);
  const styles = {
    appBarContainer: {
      alignItems: 'center',
      bgcolor: '#F5F5F5',
      height: appBarHeight,
      layout: 'fixed',
      m: 0,
      overflow: 'hidden',
      pl: 2.5,
      pr: 1.5,
      py: 0.5,
      mb: 1,
      // width: `calc(100% - ${sideBarContentWidth}px)`,
    },
    appContainer: { height: '100%', layout: 'fixed', bgcolor: '#F5F5F5' },
    outletContainer: {
      height: windowDimensions.height,
      overflow: 'auto',
      // p: 3,
      position: 'relative',
      // pt: 3,
      width: `calc(100% - ${sideBarContentWidth}px)`,
    },
  };

  const handleOpenSidebar = (state) => setOpenSidebar(state);
  const [{ response, loading }, reFetch] = useAxios({
    url: `/dashboard/v1/users/list?page=${pageClientList}&page_size=${10}&sort_by=${'id'}&sort_dir=${'ASC'}`,
    method: 'get',
  });
  useEffect(() => {
    if (response?.meta?.totalData > 10) setPageClientList(response?.meta?.totalData);
  }, [response]);
  window.onload = async () => {
    if (token) {
      await refreshMeData();
      await refreshMasterData();
    } else {
      window.location.href = `/login`;
    }
  };
  const onSaveClient = () => {
    store.setClientSelected(clientValue);
    store.setOpenPopupClient(false);
  };
  return (
    <AppBarContext.Provider value={store}>
      <Grid container>
        {/* <Grid item container xs={12} sx={styles.appBarContainer}>
          <Appbar
            openNotification={openNotification}
            openTaskList={openTaskList}
            openProfileBar={openProfileBar}
            setOpenNotification={setOpenNotification}
            setOpenTaskList={setOpenTaskList}
            setOpenProfileBar={setOpenProfileBar}
            setShowDrawerBackground={setShowDrawerBackground}
          />
        </Grid> */}
        <Grid item container direction="row" xs={12} sx={styles.appContainer}>
          <Stack direction="row" width="100%">
            <ClickAwayListener onClickAway={() => handleOpenSidebar(false)}>
              <Box position="relative">
                {/* <Sidebar openSidebar={openSideBar} handleOpenSidebar={handleOpenSidebar} menus={menus} /> */}
                <SidebarSmall height="100%" handleOpenSidebar={handleOpenSidebar} menus={menus} />
              </Box>
            </ClickAwayListener>
            <Box sx={styles.outletContainer}>
              <Stack sx={{ ':-webkit-scrollbar': { display: 'none' } }}>
                <Box sx={styles.appBarContainer} width="100%">
                  <Appbar
                    title={store.clientSelected?.company_name ? store.clientSelected?.company_name : 'Choose a Client'}
                    openNotification={openNotification}
                    openTaskList={openTaskList}
                    openProfileBar={openProfileBar}
                    setOpenNotification={setOpenNotification}
                    setOpenTaskList={setOpenTaskList}
                    setOpenProfileBar={setOpenProfileBar}
                    setShowDrawerBackground={setShowDrawerBackground}
                    setShowDialogClient={store.setOpenPopupClient}
                  />
                </Box>
                <Stack sx={{ px: 2, overflow: 'auto' }}>{outlet}</Stack>
              </Stack>
            </Box>
          </Stack>
          <DialogFormContainer
            open={store.openPopupClient}
            setOpen={store.setOpenPopupClient}
            option={response?.data}
            onSave={onSaveClient}
          >
            <FormControl variant="standard">
              <RadioGroup
                aria-labelledby="demo-error-radios"
                name="client"
                value={clientValue?.id || null}
                onChange={(e, value) => {
                  setClientValue(response?.data?.find((el) => el.id === +value));
                }}
              >
                {response?.data?.map((el) => (
                  <FormControlLabel
                    value={el.id}
                    control={<Radio sx={{ p: 2 }} />}
                    label={<Typography sx={{}}>{el.company_name} </Typography>}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </DialogFormContainer>
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

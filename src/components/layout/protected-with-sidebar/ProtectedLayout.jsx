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
import useAxios from 'axios-hooks';
import DialogFormContainer from '../../Dialog/DialogForm';
import { useUserStore } from '../../../pages/user/UserContext';

const ProtectedLayout = () => {
  const { refreshMeData } = useAuth();
  const { userToken: token, me, setClientSelected, isUserRole } = useContext(AppContext);
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
      bgcolor: 'bgcolor.header',
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
    appContainer: { height: '100%', layout: 'fixed', bgcolor: 'bgcolor.main' },
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
  const [{ data, loading }, reFetch] = useAxios(
    {
      url: `/dashboard/v1/users/list?page=${pageClientList}&page_size=${10}&sort_by=${'id'}&sort_dir=${'ASC'}`,
      method: 'get',
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    if (!isUserRole && me?.id) {
      reFetch();
    }
  }, [isUserRole, me?.id]);

  useEffect(() => {
    if (data?.meta?.totalData > 10) setPageClientList(data?.meta?.totalData);
  }, [data]);

  window.onload = async () => {
    if (token) {
      const me = await refreshMeData();
      if (me?.role?.toLowerCase() !== 'user') {
        await refreshMasterData();
      } else {
        store.setClientSelected(me);
        setClientSelected(me);
      }
    } else {
      window.location.href = `/login`;
    }
  };
  const onSaveClient = () => {
    store.setClientSelected(clientValue);
    setClientSelected(clientValue);
    store.setOpenPopupClient(false);
  };

  return (
    <AppBarContext.Provider value={store}>
      <Grid container>
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
                    title={
                      me?.role?.toLowerCase() === 'user'
                        ? `${me.first_name} ${me?.last_name}`
                        : store.clientSelected?.company_name
                        ? store.clientSelected?.company_name
                        : 'Choose a Client'
                    }
                    openNotification={openNotification}
                    openTaskList={openTaskList}
                    openProfileBar={openProfileBar}
                    setOpenNotification={setOpenNotification}
                    setOpenTaskList={setOpenTaskList}
                    setOpenProfileBar={setOpenProfileBar}
                    setShowDrawerBackground={setShowDrawerBackground}
                    setShowDialogClient={store.setOpenPopupClient}
                    isUser={me?.role?.toLowerCase() === 'user'}
                  />
                </Box>
                <Stack sx={{ px: 2, overflow: 'auto' }}>{outlet}</Stack>
              </Stack>
            </Box>
          </Stack>
          <DialogFormContainer
            open={store.openPopupClient}
            setOpen={store.setOpenPopupClient}
            option={data?.data}
            onSave={onSaveClient}
          >
            <FormControl variant="standard">
              <RadioGroup
                aria-labelledby="demo-error-radios"
                name="client"
                value={clientValue?.id || null}
                onChange={(e, value) => {
                  setClientValue(data?.data?.find((el) => el.id === +value));
                }}
              >
                {data?.data?.map((el) => (
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
      </Grid>
    </AppBarContext.Provider>
  );
};

export default ProtectedLayout;

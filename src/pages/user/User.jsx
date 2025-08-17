/* eslint-disable react/no-unstable-nested-components */
import { Search } from '@mui/icons-material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ModalUserDetail from './components/ModalUserDetail';
import Loading from '../../components/Loading';
import UserThemeSettings from './components/UserThemeSettings';
import GeneralDeletePopup from '../../components/DeletePopup';
import { useUserStore, UserContext } from './UserContext';
import MobileUserList from './MobileUserList';
import UserTable from './UserTable';
import useColumnDef from './useColDef';

export const defaultForm = {
  // imgName: '',
  company_logo_url: '',

  email: '',

  // username: '',
  filename: '',

  first_name: undefined,

  last_name: undefined,

  role_id: '',
};

const User = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const store = useUserStore();
  const {
    methods,
    setUserId,
    setSortDir,
    setSortBy,
    userDetail,
    loadingUser,
    loading,
    setSearch: setSearchCtx,
    handleSaveColorway,
    openPopupTheme,
    setOpenPopupTheme,
    handleOpenActionSheet,
  } = store;
  const location = useLocation();
  const [openPopupDelete, setOpenPopupDelete] = useState(false);
  const [sort, setSort] = useState('DESC');
  const [search, setSearch] = useState(undefined);

  const columns = useColumnDef({ handleOpenActionSheet, setOpenPopupDelete, store });

  useEffect(() => {
    if (!loadingUser && userDetail) {
      methods.reset(userDetail, { keepDirty: false, keepTouched: false });
      store?.setOpenPopup(!!store?.action);
    }
  }, [loadingUser, userDetail]);

  const handleChange = (event) => {
    if (event.target.value === 'ASC' || event.target.value === 'DESC') {
      setSortDir(event.target.value);
      setSortBy(null);
    }
    if (event.target.value === 'OLDTONEW') {
      setSortBy('created_at');
      setSortDir('DESC');
    }
    if (event.target.value === 'NEWTOOLD') {
      setSortBy('created_at');
      setSortDir('ASC');
    }
    if (event.target.value === 'updated_at') {
      setSortDir('ASC');
      setSortBy('updated_at');
    }
    setSort(event.target.value);
  };

  return (
    <UserContext.Provider value={store}>
      <ModalUserDetail />
      <UserThemeSettings
        openPopup={openPopupTheme}
        setOpenPopup={setOpenPopupTheme}
        username={`${methods.getValues('first_name')} ${methods.getValues('last_name')}`}
        userId={store.userId}
        colorway={userDetail?.colorway}
        handleSaveColorway={handleSaveColorway}
      />
      <GeneralDeletePopup
        open={openPopupDelete}
        handleCancel={() => setOpenPopupDelete(false)}
        handleSave={() => store.handleDelete(setOpenPopupDelete)}
        title="Confirm Delete?"
        message="Do you want to delete user"
      />
      <Loading open={loading || store?.isLoading} />

      {isMobile ? (
        <MobileUserList>
          <UserTable columns={columns} />
        </MobileUserList>
      ) : (
        <Paper sx={{ display: 'flex', height: '100%', p: 4 }}>
          <Stack width="100%" height="max-content">
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon sx={{ fontSize: 11 }} />}>
              <Link to="/home" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="text.primary">
                  Home
                </Typography>
              </Link>
              <Typography variant="body2" color="primary.main" textTransform="capitalize">
                {location.pathname.replace(/[^a-z0-9]/g, ' ').trim()}
              </Typography>
            </Breadcrumbs>
            <Box pt={2}>
              <Typography variant="h1" textTransform="capitalize" color="primary.main">
                {location.pathname.replace(/[^a-z0-9]/g, ' ').trim()}
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{ pt: 4.25, alignItems: 'center' }}>
              <Grid size={4}>
                <Button
                  size="medium"
                  sx={{ fontWeight: 500 }}
                  onClick={() => {
                    store?.setAction('create');
                    store?.setOpenPopup(true);
                    methods.reset(defaultForm);
                    setUserId(null);
                  }}
                >
                  + Add New User
                </Button>
              </Grid>
              <Grid size={8}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    value={search}
                    label="Search"
                    placeholder="Search by ID/Username/Email/First Name/Last Name/Role"
                    sx={{ mr: 2, width: '100%' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setSearchCtx(search);
                      }
                    }}
                  />
                  <TextField
                    value={sort}
                    onChange={handleChange}
                    select
                    label="Sort by"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: 256 }}
                  >
                    <MenuItem key={1} value="ASC">
                      A to Z
                    </MenuItem>
                    <MenuItem key={2} value="DESC">
                      Z to A
                    </MenuItem>
                    <MenuItem key={3} value="OLDTONEW">
                      Oldest to Newest
                    </MenuItem>
                    <MenuItem key={4} value="NEWTOOLD">
                      Newest to Oldest
                    </MenuItem>
                    <MenuItem key={5} value="updated_at">
                      Recently updated
                    </MenuItem>
                  </TextField>
                </Stack>
              </Grid>
            </Grid>
            <UserTable columns={columns} />
          </Stack>
        </Paper>
      )}
    </UserContext.Provider>
  );
};

export default User;

import { Delete, Edit, InfoOutlined, Search, SettingsOutlined } from '@mui/icons-material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Box,
  Breadcrumbs,
  Button,
  InputAdornment,
  MenuItem,
  Pagination,
  PaginationItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MaterialReactTable } from 'material-react-table';

import ModalUserDetail from './components/ModalUserDetail';
import Loading from '../../components/Loading';
import UserThemeSettings from './components/UserThemeSettings';
import { ISODateToLuxon } from '../../helpers/Utils';
import GeneralDeletePopup from '../../components/DeletePopup';
import { useUserStore, UserContext } from './UserContext';

const defaultForm = {
  email: '',
  first_name: undefined,
  // imgName: '',
  company_logo_url: '',
  last_name: undefined,
  role_id: '',
  // username: '',
  filename: '',
};

const User = () => {
  const store = useUserStore();
  const {
    methods,
    setUserId,
    setSortDir,
    setSortBy,
    userDetail,
    loadingUser,
    userList,
    loading,
    page,
    setPage,
    pageSize,
    setPageSize,
    search: searchCtx,
    setSearch: setSearchCtx,
    handleSaveColorway,
    metaList,
    openPopupTheme,
    setOpenPopupTheme,
  } = store;
  const location = useLocation();
  const [openPopupDelete, setOpenPopupDelete] = useState(false);
  const [sort, setSort] = useState('DESC');
  const [search, setSearch] = useState(undefined);

  useEffect(() => {
    if (!loadingUser && userDetail) {
      methods.reset(userDetail, { keepDirty: false, keepTouched: false });
      store?.setOpenPopup(store?.action ? true : false);
    }
  }, [loadingUser, userDetail]);

  const columns = [
    {
      accessorKey: 'nanoId',
      header: 'ID',
      size: 50,
      muiTableHeadCellProps: { align: 'center' },
      muiTableBodyCellProps: { align: 'center' },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      muiTableHeadCellProps: { align: 'center' },
      muiTableBodyCellProps: { align: 'center' },
    },
    {
      accessorKey: 'first_name',
      header: 'First Name',
      size: 142,
      muiTableHeadCellProps: { align: 'center' },
      muiTableBodyCellProps: { align: 'center' },
    },
    {
      accessorKey: 'last_name',
      header: 'Last Name',
      size: 141,
      muiTableHeadCellProps: { align: 'center' },
      muiTableBodyCellProps: { align: 'center' },
    },
    {
      accessorKey: 'company_logo_url',
      header: 'Profile Picture',
      muiTableHeadCellProps: { align: 'center' },
      muiTableBodyCellProps: { align: 'center' },
    },
    { accessorKey: 'role', header: 'Role', size: 127 },
    {
      accessorKey: 'created_at',
      header: 'Active Date',
      size: 171,
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: (params) => ISODateToLuxon(params?.cell?.getValue())?.toFormat('dd MMMM yyyy') || '-',
    },
    {
      accessorKey: 'updated_at',
      header: 'Last Modified',
      size: 171,
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: (params) => ISODateToLuxon(params?.cell?.getValue())?.toFormat('dd MMMM yyyy') || '-',
    },
    {
      accessorKey: 'action',
      header: 'Action',
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: (params) => (
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5}>
          <InfoOutlined
            sx={{ cursor: 'pointer', fontSize: 20 }}
            onClick={() => {
              if (userDetail?.id === params?.row?.original?.id) {
                store?.setAction('detail');
                store?.setOpenPopup(true);
              } else {
                setUserId(params?.row?.original?.id);
                store?.setAction('detail');
              }
            }}
          />
          <Edit
            sx={{ cursor: 'pointer', fontSize: 20 }}
            onClick={() => {
              if (userDetail?.id === params?.row?.original?.id) {
                store?.setAction('edit');
                store?.setOpenPopup(true);
              } else {
                setUserId(params?.row?.original?.id);
                store?.setAction('edit');
              }
            }}
          />
          <SettingsOutlined
            onClick={() => {
              setOpenPopupTheme(true);
              store?.setAction('');
              setUserId(params?.row?.original?.id);
            }}
            sx={{ cursor: 'pointer', fontSize: 20 }}
          />
          <Delete
            sx={{ color: '#E56363', fontSize: 20, cursor: 'pointer' }}
            onClick={() => {
              setUserId(params?.row?.original?.id);
              setOpenPopupDelete(true);
            }}
          />
        </Stack>
      ),
    },
  ];

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
          <Stack direction="row" pt={4.25} justifyContent="space-between" width="100%">
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
            <Box>
              <TextField
                value={search}
                label="Search"
                placeholder="Search by ID/Username/Email/First Name/Last Name/Role"
                sx={{ mr: 2, width: 528 }}
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
            </Box>
          </Stack>
          <Box sx={{ pt: 4, width: '100%' }}>
            <Box sx={{ display: 'flex', minHeight: 400 }}>
              <MaterialReactTable
                columns={columns}
                data={userList ? userList?.map((item) => ({ ...item, nanoId: item?.id })) : []}
                enablePagination={false}
                enableSorting={false}
                enableFilters={false}
                enablePinning
                enableColumnActions={false}
                enableColumnFilters={false}
                enableBottomToolbar={false}
                enableTopToolbar={false}
                muiTableHeadCellProps={{
                  sx: {
                    border: 1,
                    fontWeight: 'bold',
                    bgcolor: 'primary.container',
                    borderColor: 'white',
                    color: 'white',
                  },
                }}
                muiTableBodyCellProps={{
                  sx: {
                    bgcolor: '#EEF0F5',
                    border: 1,
                    borderColor: 'white',
                    color: 'secondary.main',
                  },
                }}
                initialState={{ columnPinning: { right: ['action'] } }}
              />
            </Box>
          </Box>
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              page={page || 1}
              count={metaList?.total_page || 1}
              color="primary"
              sx={{ display: 'flex', flex: 1, justifyContent: 'right', color: 'primary.main' }}
              onChange={(e, val) => setPage(val)}
            />
            <Box
              sx={{ alignItems: 'center', flex: 1, display: 'flex', justifyContent: 'right', color: 'primary.main' }}
            >
              Show
              <Select
                size="small"
                value={pageSize}
                sx={{ mx: 1, color: 'inherit' }}
                onChange={(e) => {
                  setPageSize(e.target.value);
                  setPage(
                    page > Math.ceil(metaList?.total_data / e.target.value)
                      ? Math.ceil(metaList?.total_data / e.target.value)
                      : page
                  );
                }}
              >
                {[5, 10, 20, 50, 100].map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {`of ${metaList?.total_data || 0} entries`}
            </Box>
          </Box>
        </Stack>
      </Paper>
    </UserContext.Provider>
  );
};

export default User;

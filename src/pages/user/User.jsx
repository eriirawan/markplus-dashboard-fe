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
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import useAxios from '@/hooks/useAxios';
import ModalUserDetail from './components/ModalUserDetail';
import Loading from '../../components/Loading';
import UserThemeSettings from './components/UserThemeSettings';
import { ISODateToLuxon } from '../../helpers/Utils';

const defaultForm = {
  email: '',
  firstName: '',
  imgName: '',
  imgUrl: '',
  lastName: '',
  role: '',
  username: '',
};

const User = () => {
  const location = useLocation();
  const [age, setAge] = useState('test');
  const [openPopup, setOpenPopup] = useState(false);
  const [action, setAction] = useState('');
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [openPopupTheme, setOpenPopupTheme] = useState(false);

  const [{ response, loading }, reFetch] = useAxios({
    url: `/dashboard/v1/users/list?page=${page}&page_size=${pageSize}&sort_by=id&sort_dir=DESC&search=${
      search || '%20'
    }`,
    method: 'get',
  });

  const methods = useForm({
    defaultValues: { ...defaultForm },
    mode: 'onChange',
  });

  // useEffect(() => {
  //   reFetch();
  // }, [search, pageSize, page])

  const { data } = useDemoData({
    dataSet: 'Commodity',
    maxColumns: 6,
    rowLength: 5,
    sortable: false,
  });

  const columns = [
    { field: 'nanoId', headerAlign: 'center', sortable: false, headerName: 'ID', width: 100, align: 'center' },
    { field: 'username', headerAlign: 'center', sortable: false, headerName: 'Username', flex: 1 },
    { field: 'email', headerAlign: 'center', sortable: false, headerName: 'Email', flex: 1 },
    { field: 'firstName', headerAlign: 'center', sortable: false, headerName: 'First Name', width: 142 },
    { field: 'lastName', headerAlign: 'center', sortable: false, headerName: 'Last Name', width: 141 },
    { field: 'imgName', headerAlign: 'center', sortable: false, headerName: 'Profile Picture', flex: 1 },
    { field: 'role', headerAlign: 'center', sortable: false, headerName: 'Role', width: 127 },
    {
      field: 'created_at',
      headerAlign: 'center',
      sortable: false,
      headerName: 'Active Date',
      width: 171,
      valueGetter: (params) => ISODateToLuxon(params?.value)?.toFormat('dd MMMM yyyy') || '-',
      align: 'center',
    },
    {
      field: 'action',
      flex: 1,
      headerAlign: 'center',
      sortable: false,
      headerName: 'Action',
      align: 'center',
      renderCell: (params) => (
        <Stack direction="row" spacing={2.5}>
          <SettingsOutlined
            onClick={() => {
              setOpenPopupTheme(true);
            }}
            sx={{ color: '#000000', cursor: 'pointer', fontSize: 20 }}
          />
          <InfoOutlined
            sx={{ cursor: 'pointer', fontSize: 20 }}
            onClick={() => {
              setAction('detail');
              setOpenPopup(true);
              methods.reset({
                ...params.row,
                imgUrl:
                  'https://1.bp.blogspot.com/-tR59_3q2Z2Y/YIJ62ioh6NI/AAAAAAAACkc/W5JTyrlwi7oQGKYb1XWDtZySUbBM_THiQCNcBGAsYHQ/s2048/Pertamina.png',
              });
            }}
          />
          <Edit
            sx={{ cursor: 'pointer', fontSize: 20 }}
            onClick={() => {
              methods.reset(
                {
                  ...params?.row,
                  imgUrl:
                    'https://1.bp.blogspot.com/-tR59_3q2Z2Y/YIJ62ioh6NI/AAAAAAAACkc/W5JTyrlwi7oQGKYb1XWDtZySUbBM_THiQCNcBGAsYHQ/s2048/Pertamina.png',
                },
                { keepDirty: false, keepTouched: false }
              );
              setAction('edit');
              setOpenPopup(true);
            }}
          />
          <Delete sx={{ color: '#E56363', fontSize: 20 }} />
        </Stack>
      ),
    },
  ];

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <ModalUserDetail openPopup={openPopup} setOpenPopup={setOpenPopup} action={action} methods={methods} />
      <UserThemeSettings
        openPopup={openPopupTheme}
        setOpenPopup={setOpenPopupTheme}
        username={methods.getValues('username')}
      />
      <Loading open={loading} />
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
                setOpenPopup(true);
                methods.reset(defaultForm);
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
              />
              <TextField
                value={age}
                onChange={handleChange}
                select
                label="Sort by"
                InputLabelProps={{ shrink: true }}
                sx={{ width: 256 }}
              >
                <MenuItem key={1} value="test">
                  A to Z
                </MenuItem>
                <MenuItem key={2} value="test2">
                  Z to A
                </MenuItem>
                <MenuItem key={3} value="test3">
                  Oldest to Newest
                </MenuItem>
                <MenuItem key={4} value="test4">
                  Newest to Oldest
                </MenuItem>
                <MenuItem key={5} value="test5">
                  Recently updated
                </MenuItem>
              </TextField>
            </Box>
          </Stack>
          <Box sx={{ pt: 4, width: '100%' }}>
            <Box sx={{ display: 'flex', minHeight: 400 }}>
              <DataGrid
                {...data}
                columns={columns}
                rows={response?.data ? response?.data?.map((item) => ({ ...item, nanoId: item?.id })) : []}
                getRowId={(row) => row.id}
                sx={{
                  '& .MuiDataGrid-cell': {
                    bgcolor: '#EEF0F5',
                    border: 1,
                    borderColor: 'white',
                  },
                  '& .MuiDataGrid-columnHeader': {
                    border: 1,
                  },
                  '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold',
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    bgcolor: '#2E459A',
                    borderColor: 'white',
                    color: 'white',
                  },
                  '& > .MuiDataGrid-columnSeparator': {
                    visibility: 'hidden',
                  },
                  border: 0,
                  overflowX: 'auto',
                }}
                hideFooter
                autoHeight
                disableColumnMenu
                disableColumnFilter
                disableColumnSelector
              />
            </Box>
          </Box>
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              page={page || 1}
              count={response?.meta?.total_page || 1}
              color="primary"
              sx={{ display: 'flex', flex: 1, justifyContent: 'right' }}
              onChange={(e, val) => setPage(val)}
            />
            <Box sx={{ alignItems: 'center', flex: 1, display: 'flex', justifyContent: 'right' }}>
              Show
              <Select
                size="small"
                value={pageSize}
                sx={{ mx: 1 }}
                onChange={(e) => {
                  setPageSize(e.target.value);
                  setPage(
                    page > Math.ceil(response?.meta?.total_data / e.target.value)
                      ? Math.ceil(response?.meta?.total_data / e.target.value)
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
              {`of ${response?.meta?.total_data || 0} entries`}
            </Box>
          </Box>
        </Stack>
      </Paper>
    </>
  );
};

export default User;

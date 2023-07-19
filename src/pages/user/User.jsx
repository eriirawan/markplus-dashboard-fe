import CheckBox from '@/components/CheckBox';
import MPTextField from '@/components/TextField';
import { Close, Delete, Edit, InfoOutlined, Search } from '@mui/icons-material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
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
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';

import DefaultImg from '@/assets/images/default-image.png';

import dummyData from './dummy';

const defaultForm = {
  email: '',
  firstName: '',
  imgName: '',
  imgUrl: '',
  lastName: '',
  role: '',
  userName: '',
};

const User = () => {
  const location = useLocation();
  const [age, setAge] = useState('test');
  const [openPopup, setOpenPopup] = useState(false);
  const [action, setAction] = useState('');
  const { data } = useDemoData({
    dataSet: 'Commodity',
    maxColumns: 6,
    rowLength: 5,
    sortable: false,
  });

  const methods = useForm({
    defaultValues: { ...defaultForm },
    mode: 'onChange',
  });

  const imgUrl = methods.watch('imgUrl');

  const columns = [
    { field: 'userId', headerAlign: 'center', headerName: 'ID', width: 111 },
    { field: 'username', headerAlign: 'center', headerName: 'Username', width: 171 },
    { field: 'email', headerAlign: 'center', headerName: 'Email', width: 219 },
    { field: 'firstName', headerAlign: 'center', headerName: 'First Name', width: 142 },
    { field: 'lastName', headerAlign: 'center', headerName: 'Last Name', width: 141 },
    { field: 'imgName', headerAlign: 'center', headerName: 'Profile Picture', width: 164 },
    { field: 'role', headerAlign: 'center', headerName: 'Role', width: 127 },
    { field: 'activeDate', headerAlign: 'center', headerName: 'Active Date', width: 171 },
    {
      field: 'action',
      flex: 1,
      headerAlign: 'center',
      headerName: 'Action',
      renderCell: () => (
        <Stack direction="row" spacing={2.5}>
          <InfoOutlined
            sx={{ cursor: 'pointer', fontSize: 20 }}
            onClick={() => {
              setAction('detail');
              setOpenPopup(true);
              methods.setValue(
                'imgUrl',
                'https://1.bp.blogspot.com/-tR59_3q2Z2Y/YIJ62ioh6NI/AAAAAAAACkc/W5JTyrlwi7oQGKYb1XWDtZySUbBM_THiQCNcBGAsYHQ/s2048/Pertamina.png'
              );
            }}
          />
          <Edit
            sx={{ cursor: 'pointer', fontSize: 20 }}
            onClick={() => {
              methods.reset(
                {
                  email: 'pcc135@pertamina.com',
                  firstName: 'Pertamina',
                  id: 111,
                  imgName: 'Pertamina.jpg',
                  imgUrl:
                    'https://1.bp.blogspot.com/-tR59_3q2Z2Y/YIJ62ioh6NI/AAAAAAAACkc/W5JTyrlwi7oQGKYb1XWDtZySUbBM_THiQCNcBGAsYHQ/s2048/Pertamina.png',
                  lastName: 'Indonesia',
                  role: 'View',
                  username: 'pertaminaindonesia',
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

  const handleClose = () => {
    setOpenPopup(false);
    setTimeout(() => {
      setAction('');
      methods.reset(defaultForm);
    }, 500);
  };

  return (
    <>
      <Dialog maxWidth="md" open={openPopup} PaperProps={{ sx: { p: 3 } }} transitionDuration={500}>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h1" color="primary.main">
              {action === 'detail' ? 'View User Details' : action === 'edit' ? 'Edit User' : 'Add New User'}
            </Typography>
            <IconButton
              aria-label="delete"
              sx={{ border: 1.5, color: 'primary.main', height: '44px', width: '44px' }}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <FormProvider {...methods}>
            <Stack direction="row" spacing={2}>
              {action === 'detail' ? (
                <Grid container width={380}>
                  <Grid item xs={6}>
                    <Stack spacing={0.5}>
                      <Typography variant="h4" color="primary.main">
                        User ID
                      </Typography>
                      <Typography>000000002</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={0.5}>
                      <Typography variant="h4" color="primary.main">
                        Role
                      </Typography>
                      <Typography>Viewer</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={0.5}>
                      <Typography variant="h4" color="primary.main">
                        Username
                      </Typography>
                      <Typography>pertaminaindonesia</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={0.5}>
                      <Typography variant="h4" color="primary.main">
                        Email
                      </Typography>
                      <Typography>pcc135@pertamina.com</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={0.5}>
                      <Typography variant="h4" color="primary.main">
                        First Name
                      </Typography>
                      <Typography>Pertamina</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={0.5}>
                      <Typography variant="h4" color="primary.main">
                        Last Name
                      </Typography>
                      <Typography>Indonesia</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ) : (
                <Stack spacing={3}>
                  <Typography variant="h3" color="primary.main">
                    User Details
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <MPTextField label="Username" name="username" placeholder="Company Name" size="normal" />
                    <MPTextField label="Role" name="role" />
                  </Stack>
                  <MPTextField label="Email" name="email" placeholder="companyemail@emaildomain.com" sx={{ my: 2 }} />
                  <Stack direction="row" spacing={2}>
                    <MPTextField label="First Name" name="firstName" placeholder="PT AAA" />
                    <MPTextField label="Last Name" name="lastName" placeholder="Tbk" />
                  </Stack>
                </Stack>
              )}
              <Divider flexItem orientation="vertical" sx={{ borderColor: 'primary.main', borderWidth: 1 }} />
              <Stack spacing={2}>
                <Typography variant="h3" color="primary.main" sx={{ textAlign: 'center' }}>
                  Company Logo
                </Typography>
                <Box px={1} component="img" src={imgUrl || DefaultImg} height={169} />
                {action !== 'detail' && <Button>Select Image</Button>}
              </Stack>
            </Stack>
            {!action && <CheckBox name="isSendEmail" label="Send email confirmation" />}
            {action !== 'detail' && (
              <Stack direction="row" spacing={2} width="62%" sx={{ mt: 2 }}>
                <Button fullWidth>{action === 'edit' ? 'Save Changes' : 'Add User'}</Button>
                <Button fullWidth variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
              </Stack>
            )}
          </FormProvider>
        </DialogContent>
      </Dialog>
      <Paper sx={{ display: 'flex', height: '100%', p: 4 }}>
        <Stack width="100%">
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
            <Button size="medium" sx={{ fontWeight: 500 }} onClick={() => setOpenPopup(true)}>
              + Add New User
            </Button>
            <Box>
              <TextField
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
          <Box sx={{ overflowX: 'auto', pt: 4, width: '100%' }}>
            <Box style={{ overflowX: 'auto', width: '1440px' }}>
              <DataGrid
                {...data}
                columns={columns}
                rows={dummyData}
                getRowId={(row) => row.userId}
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
            <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                page={1}
                count={10}
                color="primary"
                sx={{ display: 'flex', flex: 2, justifyContent: 'right' }}
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
                    {...item}
                  />
                )}
              />
              <Box sx={{ alignItems: 'center', display: 'flex', flex: 1, justifyContent: 'right' }}>
                Show
                <Select size="small" value={10} sx={{ mx: 1 }} onChange={(e) => console.log(e)}>
                  {[5, 10, 20, 50, 100].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                {`of ${dummyData?.length} entries`}
              </Box>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </>
  );
};

export default User;

import {
  Paper,
  Typography,
  Breadcrumbs,
  Stack,
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
} from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Delete, Edit, InfoOutlined, Search } from '@mui/icons-material';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const dummyData = [
  {
    activeDate: '2021-09-17 19:09:10',
    email: 'info@markplusinc.com',
    firstName: 'Mark',
    imgName: 'markplus.jpeg',
    imgUrl: '/',
    lastName: 'Plus',
    role: 'Admin',
    userId: '000000001',
    userName: 'markplus.inc',
  },
  {
    activeDate: '2021-09-17 19:09:10',
    email: 'info@markplusinc.com',
    firstName: 'Pertamina',
    imgName: 'markplus.jpeg',
    imgUrl: '/',
    lastName: 'Indonesia',
    role: 'Admin',
    userId: '000000002',
    userName: 'markplus.inc',
  },
  {
    activeDate: '2021-09-17 19:09:10',
    email: 'info@markplusinc.com',
    firstName: 'PLN',
    imgName: 'markplus.jpeg',
    imgUrl: '/',
    lastName: 'Indonesia',
    role: 'Admin',
    userId: '000000003',
    userName: 'markplus.inc',
  },
  {
    activeDate: '2021-09-17 19:09:10',
    email: 'info@markplusinc.com',
    firstName: 'Bank',
    imgName: 'markplus.jpeg',
    imgUrl: '/',
    lastName: 'BCA',
    role: 'Admin',
    userId: '000000004',
    userName: 'markplus.inc',
  },
];

const UserManagement = () => {
  const location = useLocation();
  const [age, setAge] = useState('test');
  const { data } = useDemoData({
    dataSet: 'Commodity',
    maxColumns: 6,
    rowLength: 5,
    sortable: false,
  });

  const columns = [
    { field: 'userId', headerName: 'ID', width: 111 },
    { field: 'userName', headerName: 'Username', width: 171 },
    { field: 'email', headerName: 'Email', width: 219 },
    { field: 'firstName', headerName: 'First Name', width: 142 },
    { field: 'lastName', headerName: 'Last Name', width: 141 },
    { field: 'imgName', headerName: 'Profile Picture', width: 164 },
    { field: 'role', headerName: 'Role', width: 127 },
    { field: 'activeDate', headerName: 'Active Date', width: 171 },
    {
      field: 'action',
      flex: 1,
      headerName: 'Action',
      renderCell: () => (
        <Stack direction="row" spacing={2.5}>
          <InfoOutlined sx={{ fontSize: 20 }} />
          <Edit sx={{ fontSize: 20 }} />
          <Delete sx={{ color: '#E56363', fontSize: 20 }} />
        </Stack>
      ),
    },
  ];

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Paper sx={{ borderRadius: 1.25, display: 'flex', height: '100%', mt: 1, p: 4 }}>
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
        <Stack direction="row" pt={4.25} justifyContent="end" width="100%">
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
              size="medium"
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
          <div style={{ width: '100%' }}>
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
              }}
              hideFooter
              autoHeight
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
            />
          </div>
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
              {`of ${dummyData.length} entries`}
            </Box>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

export default UserManagement;

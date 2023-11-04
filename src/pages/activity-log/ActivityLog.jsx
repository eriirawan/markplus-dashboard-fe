import { FileOpenOutlined, PanoramaOutlined, Search, SettingsOutlined } from '@mui/icons-material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Box,
  Breadcrumbs,
  InputAdornment,
  MenuItem,
  Pagination,
  PaginationItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ISODateToLuxon } from '../../helpers/Utils';
import dummyData from './dummy';
import { useActivityStore, ActivityContext } from './ActivityContext';

const ActivityLog = () => {
  const store = useActivityStore();
  const location = useLocation();
  const [sort, setSort] = useState('DESC');

  const columns = [
    {
      accessorKey: 'nanoId',
      header: 'ID',
      size: 50,
      muiTableHeadCellProps: { align: 'center' },
      muiTableBodyCellProps: { align: 'center' },
    },
    {
      id: 'user',
      accessorFn: (row) => `${row?.user?.first_name} ${row?.user?.last_name}`,
      header: 'user',
      muiTableHeadCellProps: { align: 'center' },
      muiTableBodyCellProps: { align: 'center' },
    },
    {
      // accessorKey: 'action',
      accessorFn: (row) => row?.action,
      header: 'Activity',
      size: 142,
      muiTableHeadCellProps: { align: 'center' },
      muiTableBodyCellProps: { align: 'center' },
    },
    {
      accessorKey: 'target_type',
      header: 'Action Target',
      size: 141,
      muiTableHeadCellProps: { align: 'center' },
      muiTableBodyCellProps: { align: 'center' },
    },
    // { accessorKey: 'role',
    //   header: 'Role',
    //   size: 127,
    //   muiTableHeadCellProps: { align: 'center' },
    //   muiTableBodyCellProps: { align: 'center' },
    // },
    {
      accessorKey: 'created_at',
      header: 'Created Date',
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
  ];

  const handleChange = (event) => {
    if (event.target.value === 'ASC' || event.target.value === 'DESC') {
      store?.setSortDir(event.target.value);
      store?.setSortBy(null);
    }
    if (event.target.value === 'OLDTONEW') {
      store?.setSortBy('created_at');
      store?.setSortDir('DESC');
    }
    if (event.target.value === 'NEWTOOLD') {
      store?.setSortBy('created_at');
      store?.setSortDir('ASC');
    }
    if (event.target.value === 'updated_at') {
      store?.setSortDir('ASC');
      store?.setSortBy('updated_at');
    }
    setSort(event.target.value);
  };

  return (
    <ActivityContext.Provider value={store}>
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
          <Stack direction="row" pt={4.25} justifyContent="end" width="100%">
            <Box>
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
                data={store?.activityList ? store?.activityList?.map((item) => ({ ...item, nanoId: item?.id })) : []}
                enablePagination={false}
                enableSorting={false}
                enableFilters={false}
                enablePinning
                enableColumnActions={false}
                enableColumnFilters={false}
                enableBottomToolbar={false}
                enableTopToolbar={false}
                renderEmptyRowsFallback={() => (
                  <Stack minHeight={400} justifyContent="center" fontStyle="italic">
                    <Typography sx={{ textAlign: 'center' }}>No records to display</Typography>
                  </Stack>
                )}
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
                    color: 'primary.table',
                  },
                }}
                muiTableProps={{
                  sx: {
                    tableLayout: 'fixed',
                  },
                }}
                initialState={{ columnPinning: { right: ['action'] } }}
              />
            </Box>
            <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                page={store?.page || 1}
                count={store?.metaList?.total_page || 1}
                color="primary"
                sx={{ display: 'flex', flex: 1, justifyContent: 'right', color: 'primary.main' }}
                onChange={(e, val) => store?.setPage(val)}
              />
              <Box
                sx={{ alignItems: 'center', flex: 1, display: 'flex', justifyContent: 'right', color: 'primary.main' }}
              >
                Show
                <Select
                  size="small"
                  value={store?.pageSize}
                  sx={{ mx: 1, color: 'inherit' }}
                  onChange={(e) => {
                    setPageSize(e.target.value);
                    setPage(
                      store?.page > Math.ceil(store?.metaList?.total_data / e.target.value)
                        ? Math.ceil(store?.metaList?.total_data / e.target.value)
                        : store?.page
                    );
                  }}
                >
                  {[5, 10, 20, 50, 100].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                {`of ${store?.metaList?.total_data || 0} entries`}
              </Box>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </ActivityContext.Provider>
  );
};

export default ActivityLog;

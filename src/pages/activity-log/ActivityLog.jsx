import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Box,
  Breadcrumbs,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';
import { Header } from '@/components/layout/MobileLayout';
import { ISODateToLuxon } from '../../helpers/Utils';
import { useActivityStore, ActivityContext } from './ActivityContext';

const ActivityLog = () => {
  const { isMobile } = useContext(AppContext);
  const store = useActivityStore();
  const location = useLocation();
  const [sort, setSort] = useState('DESC');

  const columns = [
    {
      accessorKey: 'nanoId',
      header: 'ID',
      muiTableBodyCellProps: { align: 'center' },
      muiTableHeadCellProps: { align: 'center' },
      size: 50,
    },
    {
      accessorFn: (row) => `${row?.user?.first_name} ${row?.user?.last_name}`,
      header: 'user',
      id: 'user',
      muiTableBodyCellProps: { align: 'center' },
      muiTableHeadCellProps: { align: 'center' },
    },
    {
      // accessorKey: 'action',
      accessorFn: (row) => row?.action,
      header: 'Activity',
      muiTableBodyCellProps: { align: 'center' },
      muiTableHeadCellProps: { align: 'center' },
      size: 142,
    },
    {
      accessorKey: 'target_type',
      header: 'Action Target',
      muiTableBodyCellProps: { align: 'center' },
      muiTableHeadCellProps: { align: 'center' },
      size: 141,
    },
    // { accessorKey: 'role',
    //   header: 'Role',
    //   size: 127,
    //   muiTableHeadCellProps: { align: 'center' },
    //   muiTableBodyCellProps: { align: 'center' },
    // },
    {
      Cell: (params) => ISODateToLuxon(params?.cell?.getValue())?.toFormat('dd MMMM yyyy') || '-',
      accessorKey: 'created_at',
      header: 'Created Date',
      muiTableBodyCellProps: {
        align: 'center',
      },
      muiTableHeadCellProps: {
        align: 'center',
      },
      size: 171,
    },
    {
      Cell: (params) => ISODateToLuxon(params?.cell?.getValue())?.toFormat('dd MMMM yyyy') || '-',
      accessorKey: 'updated_at',
      header: 'Last Modified',
      muiTableBodyCellProps: {
        align: 'center',
      },
      muiTableHeadCellProps: {
        align: 'center',
      },
      size: 171,
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
      <Paper sx={{ display: 'flex', height: '100%', p: isMobile ? 0 : 4 }}>
        <Stack width="100%">
          {!isMobile && (
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
          )}
          {isMobile ? (
            <Header>{location.pathname.replace(/[^a-z0-9]/g, ' ').trim()}</Header>
          ) : (
            <Box pt={isMobile ? 0 : 2}>
              <Typography variant="h1" textTransform="capitalize" color="primary.main">
                {location.pathname.replace(/[^a-z0-9]/g, ' ').trim()}
              </Typography>
            </Box>
          )}
          <Stack
            direction="row"
            pt={isMobile ? 3 : 4.25}
            px={isMobile ? 1 : 0}
            justifyContent={isMobile ? 'center' : 'end'}
            width="100%"
          >
            <TextField
              value={sort}
              onChange={handleChange}
              select
              label="Sort by"
              InputLabelProps={{ shrink: true }}
              sx={{ width: isMobile ? '100%' : 256 }}
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
          <Box sx={{ pt: 4, width: '100%', px: isMobile ? 0.5 : 0 }}>
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
                    bgcolor: 'primary.container',
                    border: 1,
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 'bold',
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
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                mb: isMobile ? 2 : 0,
                mt: 4,
              }}
            >
              <Pagination
                page={store?.page || 1}
                count={store?.metaList?.total_page || 1}
                color="primary"
                sx={{
                  '& .MuiPagination-ul': { justifyContent: 'center', width: isMobile ? '100%' : 'auto' },
                  color: 'primary.main',
                  width: isMobile ? '100%' : 'auto',
                }}
                onChange={(e, val) => store?.setPage(val)}
              />
              <Box
                sx={{
                  alignItems: 'center',
                  color: 'primary.main',
                  display: 'flex',
                  justifyContent: 'center',
                  mt: isMobile ? 2 : 0,
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                Show
                <Select
                  size="small"
                  value={store?.pageSize}
                  sx={{ color: 'inherit', mx: 1 }}
                  onChange={(e) => {
                    store?.setPageSize(e.target.value);
                    store?.setPage(
                      store?.page > Math.ceil((store?.metaList?.total_data || 0) / e.target.value)
                        ? Math.ceil((store?.metaList?.total_data || 0) / e.target.value)
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

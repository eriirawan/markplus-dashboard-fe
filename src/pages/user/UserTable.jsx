import React, { useContext } from 'react';
import { Box, Typography, Pagination, Select, MenuItem, Stack } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { AppContext } from '@/context/AppContext';
import { UserContext } from './UserContext';

/**
 * UserTable component for displaying user data in a table
 * @param {Object} props - Component props
 * @param {Array} props.columns - Column definitions for the table
 * @returns {React.ReactElement} UserTable component
 */
const UserTable = ({ columns }) => {
  const store = useContext(UserContext);
  const { isMobile } = useContext(AppContext);

  // Safe access to store properties with defaults
  const userList = store?.userList || [];
  const page = store?.page || 1;
  const pageSize = store?.pageSize || 10;
  const totalPages = store?.metaList?.total_page || 1;
  const totalData = store?.metaList?.total_data || 0;

  /**
   * Handle page size change with safe calculations
   * @param {Object} e - Event object
   */
  const handlePageSizeChange = (e) => {
    const newPageSize = e.target.value;

    // Safely set the page size
    if (store && store.setPageSize) {
      store.setPageSize(newPageSize);
    }

    // Calculate the new maximum page number based on the new page size
    const maxPage = Math.ceil(totalData / newPageSize);

    // If current page exceeds the new maximum, adjust it
    if (store && store.setPage) {
      store.setPage(page > maxPage ? maxPage : page);
    }
  };

  return (
    <>
      <Box sx={{ pt: 4, width: '100%', px: isMobile ? 0.5 : 0 }}>
        <Box sx={{ display: 'flex' }}>
          <MaterialReactTable
            columns={columns}
            data={userList.length > 0 ? userList.map((item) => ({ ...item, nanoId: item?.id })) : []}
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
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 4,
          mb: isMobile ? 2 : 0,
          width: '100%',
          gap: isMobile ? 2 : 0,
        }}
      >
        <Pagination
          page={page}
          count={totalPages}
          color="primary"
          sx={{
            justifyContent: isMobile ? 'center' : 'right',
            color: 'primary.main',
            display: 'flex',
            flex: 1,
          }}
          onChange={(e, val) => store?.setPage(val)}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'flex-end',
            color: 'primary.main',
            flex: 1,
          }}
        >
          Show
          <Select size="small" value={pageSize} sx={{ color: 'inherit', mx: 1 }} onChange={handlePageSizeChange}>
            {[5, 10, 20, 50, 100].map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          {`of ${totalData} entries`}
        </Box>
      </Box>
    </>
  );
};

export default UserTable;

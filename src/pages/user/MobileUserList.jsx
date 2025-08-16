import React, { useContext, useState } from 'react';
import { Box, TextField, InputAdornment, Stack, Button } from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import { Header } from '@/components/layout/MobileLayout';
import { useLocation } from 'react-router-dom';
import MobileActionSheet from '@/components/MobileActionSheet';
import { UserContext } from './UserContext';
import { defaultForm } from './User';

const MobileUserList = ({ children }) => {
  const store = useContext(UserContext);
  const { setUserId, setSearch: setSearchCtx, actionSheetOpen, setActionSheetOpen, selectedUserId } = store;
  const location = useLocation();

  const [search, setSearch] = useState('');

  const handleCloseActionSheet = () => {
    setActionSheetOpen(false);
  };

  const handleViewDetails = () => {
    setUserId(selectedUserId);
    store.setAction('detail');
    handleCloseActionSheet();
  };

  const handleEdit = () => {
    setUserId(selectedUserId);
    store.setAction('edit');
    handleCloseActionSheet();
  };

  const handleDelete = () => {
    setUserId(selectedUserId);
    store.setOpenPopupDelete(true);
    handleCloseActionSheet();
  };

  const actionSheetMenuItems = [
    {
      label: 'View User Details',
      onClick: handleViewDetails,
    },
    {
      label: 'Edit User',
      onClick: handleEdit,
    },
    {
      color: 'error',
      label: 'Delete User',
      onClick: handleDelete,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      }}
    >
      {/* Header */}
      <Header>{location.pathname.replace(/[^a-z0-9]/g, ' ').trim()}</Header>

      {/* Search Bar */}
      <Stack
        direction="row"
        spacing={2}
        pt={4.25}
        px={1}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Button
          size="medium"
          sx={{ '& .MuiButton-root': { minWidth: '50px' }, '& .MuiButton-startIcon': { mr: 0 } }}
          onClick={() => {
            store?.setAction('create');
            store?.setOpenPopup(true);
            store?.methods.reset(defaultForm);
            setUserId(null);
          }}
          startIcon={<Add />}
        />
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
      </Stack>

      {/* Action Sheet */}
      <MobileActionSheet
        open={actionSheetOpen}
        onClose={handleCloseActionSheet}
        title="Action"
        menuItems={actionSheetMenuItems}
      />

      {children}
    </Box>
  );
};

export default MobileUserList;

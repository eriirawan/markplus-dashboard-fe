import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, useMediaQuery, useTheme } from '@mui/material';

/**
 * Client selector component for dashboard
 * @param {Object} props - Component props
 * @param {Array} props.clients - List of available clients
 * @param {string} props.selectedClient - Currently selected client
 * @param {Function} props.handleClientChange - Handler for client change
 * @returns {React.ReactElement} ClientSelector component
 */
const ClientSelector = ({ clients, selectedClient, handleClientChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        alignItems: isMobile ? 'flex-start' : 'center',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 2,
        mb: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontSize: isMobile ? '1.1rem' : '1.25rem', fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel id="client-select-label">Client</InputLabel>
        <Select
          labelId="client-select-label"
          id="client-select"
          value={selectedClient || ''}
          label="Client"
          onChange={(e) => handleClientChange(e.target.value)}
        >
          {clients?.map((client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ClientSelector;

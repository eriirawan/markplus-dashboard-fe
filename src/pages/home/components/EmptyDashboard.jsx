import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

/**
 * Empty dashboard component shown when no charts are available
 * @param {Object} props - Component props
 * @param {Function} props.handleAddChart - Handler for add chart button click
 * @returns {React.ReactElement} EmptyDashboard component
 */
const EmptyDashboard = ({ handleAddChart }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        width: '100%',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        No charts available for this client
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, maxWidth: '600px' }}>
        Create your first chart by clicking the button below
      </Typography>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddChart}>
        Add Chart
      </Button>
    </Box>
  );
};

export default EmptyDashboard;

import React from 'react';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import ChartRenderer from './ChartRenderer';
import { getGridNumber } from '../utils/chartUtils';

/**
 * Dashboard grid component for rendering charts in a responsive layout
 * @param {Object} props - Component props
 * @param {Array} props.charts - List of charts to render
 * @returns {React.ReactElement} DashboardGrid component
 */
const DashboardGrid = ({ charts }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <Grid container spacing={2}>
        {charts?.map((chart, index) => (
          <Grid
            item
            xs={getGridNumber(chart.layout, isMobile)}
            key={`chart-${index}`}
            sx={{ minHeight: '300px', height: isMobile ? '350px' : '400px' }}
          >
            <ChartRenderer chart={chart} chartId={`chart-${index}`} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardGrid;

import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {charts?.map((chart, index) => (
          <Box
            key={`chart-${index}`}
            sx={{
              flexBasis: `calc(${100 / getGridNumber(chart.layout, isMobile)}% - ${isMobile ? '8px' : '16px'})`,
              minHeight: '300px',
              height: isMobile ? '350px' : '400px',
            }}
          >
            <ChartRenderer chart={chart} chartId={`chart-${index}`} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardGrid;

import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import { downloadChartAsPDF, downloadChartAsExcelTabular, downloadAllCharts } from '../utils/exportUtils';

/**
 * Header container for charts with title and download options
 * @param {Object} props - Component props
 * @param {Object} props.data - Chart data object
 * @param {Object} props.store - Store with action handlers
 * @param {React.ReactNode} props.chartElement - Chart component to render
 * @param {Object} props.indexContent - Index information for the chart
 * @param {boolean} props.useButtonGroupAxis - Whether to show axis button group
 * @param {string} props.className - CSS class name for the container
 * @returns {React.ReactElement} HeaderContainerChart component
 */
const HeaderContainerChart = ({ data, store, chartElement, indexContent, useButtonGroupAxis, className }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadPDF = () => {
    downloadChartAsPDF(`chart-${data.chart.id}`, data.chart.title, null);
    handleClose();
  };

  const handleDownloadExcel = () => {
    if (data.chart) {
      downloadChartAsExcelTabular(data.chart, data.chart.title, null);
    }
    handleClose();
  };

  const handleDownloadAll = () => {
    if (data.chart) {
      downloadAllCharts(`chart-${data.chart.id}`, data.chart.title, null, data.chart, true);
    }
    handleClose();
  };

  const handleEdit = () => {
    if (store && store.handleClick) {
      store.handleClick({ id: data.chart.id, action: 'edit' });
    }
    handleClose();
  };

  return (
    <Box
      className={className}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">{data.chart.title}</Typography>
        <div>
          <IconButton
            aria-label="more"
            id={`chart-menu-button-chart-${data.chart.id}`}
            aria-controls={open ? `chart-menu-chart-${data.chart.id}` : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id={`chart-menu-chart-${data.chart.id}`}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': `chart-menu-button-chart-${data.chart.id}`,
            }}
          >
            <MenuItem onClick={handleDownloadPDF}>
              <FileDownloadIcon sx={{ mr: 1 }} />
              Download as PDF
            </MenuItem>
            <MenuItem onClick={handleDownloadExcel}>
              <FileDownloadIcon sx={{ mr: 1 }} />
              Download as Excel
            </MenuItem>
            <MenuItem onClick={handleDownloadAll}>
              <FileDownloadIcon sx={{ mr: 1 }} />
              Download All
            </MenuItem>
            <MenuItem onClick={handleEdit}>
              <EditIcon sx={{ mr: 1 }} />
              Edit Chart
            </MenuItem>
          </Menu>
        </div>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px 0',
        }}
        id={`chart-${data.chart.id}`}
      >
        {chartElement}
      </Box>
    </Box>
  );
};

export default HeaderContainerChart;

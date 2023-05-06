import { Stack, Box, Typography, Paper, IconButton, Button, TextField, Autocomplete } from '@mui/material';
import { useState, createContext, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BarChart from '../../components/chart/BarChart';
import LineChart from '../../components/chart/LineChart';
import { BarData, LineData } from '../../helpers/DummyDataChart';
import { ChevronDownRed, DragIndicator, ExportFiles, Gear } from '../../helpers/Icons';
import { useDashboard } from '../../hooks/useDashboard';
import DonutChart from '../../components/chart/DonutChart';
import TableChart from '../../components/chart/TableChart';

export const DashboardContext = createContext({});

const Home = () => {
  const [lineData, setLineData] = useState({
    datasets: [
      {
        borderColor: 'rgb(75, 192, 192)',
        data: [100, 65, 59, 80, 81, 56, 55, 40, 100],
        fill: false,
        label: 'Category',
        tension: 0.1,
      },
      {
        data: LineData.map((data) => Math.floor(Math.random() * 100)),
        label: 'Category',
      },
      {
        data: LineData.map((data) => Math.floor(Math.random() * 100)),
        label: 'Category',
      },
      {
        data: LineData.map((data) => Math.floor(Math.random() * 100)),
        label: 'Category',
      },
    ],
    labels: LineData.map((data) => data.category),
  });
  const navigate = useNavigate();
  const [barData, setBarData] = useState({
    datasets: [
      {
        borderColor: 'rgb(75, 192, 192)',
        data: BarData.map((data) => data.value),
        fill: false,
        label: 'Category',
        tension: 0.1,
      },
      {
        borderColor: 'rgb(75, 192, 192)',
        data: BarData.map((data) => data.value),
        fill: false,
        label: 'Category',
        tension: 0.1,
      },
      {
        borderColor: 'rgb(75, 192, 192)',
        data: BarData.map((data) => data.value),
        fill: false,
        label: 'Category',
        tension: 0.1,
      },
      {
        borderColor: 'rgb(75, 192, 192)',
        data: BarData.map((data) => data.value),
        fill: false,
        label: 'Category',
        tension: 0.1,
      },
      // {
      //   label: 'Category',
      //   data: LineData.map((data) => data.value),
      // },
      // {
      //   label: 'Category',
      //   data: LineData.map((data) => data.value),
      // },
      // {
      //   label: 'Category',
      //   data: LineData.map((data) => data.value),
      // },
    ],
    labels: BarData.map((data) => data.category),
  });

  const { dashboardContent } = useDashboard();
  const [isFullChart, setIsFullChart] = useState(false);
  const setWidthChart = useCallback(
    (index, type) => {
      switch (type) {
        case 'Line': {
          if (dashboardContent.length === 1) {
            return 1173;
          }
          if (dashboardContent?.[index + 1] && dashboardContent?.[index + 1].chartType === 'Donut') {
            setIsFullChart(true);
            return 752;
          }
          if (dashboardContent?.[index - 1] && dashboardContent?.[index - 1]?.chartType === 'Donut') {
            if (
              (dashboardContent?.[index - 1]?.chartType === 'Donut' ||
                dashboardContent?.[index - 2]?.chartType === 'Donut') &&
              (dashboardContent[index - 2]?.chartType === 'Line' || dashboardContent?.[index - 1]?.chartType === 'Line')
            ) {
              return 1173;
            }
            return 752;
          }
          if (dashboardContent?.[index - 1] && dashboardContent?.[index - 1]?.chartType === 'Line') {
            if (
              (dashboardContent?.[index - 1]?.chartType === 'Donut' ||
                dashboardContent?.[index - 2]?.chartType === 'Donut') &&
              (dashboardContent[index - 2]?.chartType === 'Line' || dashboardContent?.[index - 1]?.chartType === 'Line')
            ) {
              return 1173;
            }
            return 540;
          }
          if (dashboardContent?.[index + 1] && dashboardContent?.[index + 1]?.chartType === 'Line') {
            return 540;
          }
          return 1173;
        }
        case 'Information Card': {
        }
      }
    },
    [dashboardContent, isFullChart, setIsFullChart]
  );
  const renderDashboard = useMemo(
    () => (
      <Box display="flex" gap="32px" flexWrap="wrap" sx={{ maxWidth: '1264px' }} id="container-charts">
        {dashboardContent.map((data, index) => {
          switch (data.chartType) {
            case 'Donut': {
              return (
                <Paper
                  sx={{
                    borderRadius: 1.25,
                    display: 'flex',
                    justifyContent: 'center',
                    maxHeight: '512px',
                    maxWidth: '400px',
                    mt: 1,
                    width: '100%',
                    // padding: '25px 32px',
                  }}
                >
                  <Box sx={{ my: 'auto', p: 4 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: '40px' }}>
                      <Box display="flex" gap="16px" justifyContent="center">
                        <IconButton sx={{ padding: 0 }}>
                          <DragIndicator />
                        </IconButton>
                        <Typography
                          // sx={(theme) => ({
                          //   color: theme.palette.text.primary,
                          // })}
                          color="primary"
                          fontSize={24}
                          fontWeight="700"
                          lineHeight="31px"
                        >
                          {data.chartLabel}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton>
                          <ExportFiles />
                        </IconButton>
                        <IconButton>
                          <Gear />
                        </IconButton>
                      </Box>
                    </Stack>
                    <Box>
                      <DonutChart chartData={data.chartData} />
                    </Box>
                  </Box>
                </Paper>
              );
            }
            case 'Line': {
              return (
                <Paper
                  sx={{
                    borderRadius: 1.25,
                    display: 'flex',
                    maxHeight: '512px',
                    mt: 1,
                  }}
                >
                  <Box sx={{ my: 'auto', p: 4 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: '40px' }}>
                      <Box display="flex" gap="16px" justifyContent="center">
                        <IconButton sx={{ padding: 0 }}>
                          <DragIndicator />
                        </IconButton>
                        <Typography
                          // sx={(theme) => ({
                          //   color: theme.palette.text.primary,
                          // })}
                          color="primary"
                          fontSize={24}
                          fontWeight="700"
                          lineHeight="31px"
                        >
                          {data.chartLabel}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton>
                          <ExportFiles />
                        </IconButton>
                        <IconButton>
                          <Gear />
                        </IconButton>
                      </Box>
                    </Stack>
                    <Box>
                      <LineChart chartData={data.chartData} width={setWidthChart(index, data.chartType)} height={309} />
                    </Box>
                  </Box>
                </Paper>
              );
            }
            case 'Horizontal Bar': {
              return (
                <Paper
                  sx={{
                    borderRadius: 1.25,
                    display: 'flex',
                    maxHeight: '512px',
                    maxWidth: '400px',
                    mt: 1,
                    // padding: '25px 32px',
                  }}
                >
                  <BarChart chartData={data.chartData} width={1173} height={309} />
                </Paper>
              );
            }
            case 'Vertical Bar': {
              return (
                <Paper
                  sx={{
                    borderRadius: 1.25,
                    display: 'flex',
                    maxHeight: '512px',
                    maxWidth: '400px',
                    mt: 1,
                    // padding: '25px 32px',
                  }}
                >
                  <BarChart chartData={data.chartData} width={1173} height={309} />
                </Paper>
              );
            }
            case 'Table': {
              return (
                <Paper
                  sx={{
                    borderRadius: 1.25,
                    display: 'flex',
                    maxHeight: '512px',
                    mt: 1,
                    width: '100%',
                  }}
                >
                  <Box sx={{ my: 'auto', p: 4, width: '100%' }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: '40px' }}>
                      <Box display="flex" gap="16px" justifyContent="center">
                        <IconButton sx={{ padding: 0 }}>
                          <DragIndicator />
                        </IconButton>
                        <Typography
                          // sx={(theme) => ({
                          //   color: theme.palette.text.primary,
                          // })}
                          color="primary"
                          fontSize={24}
                          fontWeight="700"
                          lineHeight="31px"
                        >
                          {data.chartLabel}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton>
                          <ExportFiles />
                        </IconButton>
                        <IconButton>
                          <Gear />
                        </IconButton>
                      </Box>
                    </Stack>
                    <TableChart />
                  </Box>
                </Paper>
              );
            }
            case 'Area': {
              return (
                <Paper
                  sx={{
                    borderRadius: 1.25,
                    display: 'flex',
                    maxHeight: '512px',
                    mt: 1,
                  }}
                >
                  <Box sx={{ my: 'auto', p: 4 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: '40px' }}>
                      <Box display="flex" gap="16px" justifyContent="center">
                        <IconButton sx={{ padding: 0 }}>
                          <DragIndicator />
                        </IconButton>
                        <Typography
                          // sx={(theme) => ({
                          //   color: theme.palette.text.primary,
                          // })}
                          color="primary"
                          fontSize={24}
                          fontWeight="700"
                          lineHeight="31px"
                        >
                          {data.chartLabel}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton>
                          <ExportFiles />
                        </IconButton>
                        <IconButton>
                          <Gear />
                        </IconButton>
                      </Box>
                    </Stack>
                    <Box>
                      <LineChart chartData={data.chartData} width={1173} height={309} />
                    </Box>
                  </Box>
                </Paper>
              );
            }
            case 'Information Card': {
              return (
                <Paper
                  sx={{
                    borderRadius: 1.25,
                    display: 'flex',
                    maxHeight: '512px',
                    maxWidth: '400px',
                    mt: 1,
                    width: '100%',
                  }}
                >
                  <Box sx={{ my: 'auto', p: 4 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: '16px' }}>
                      <Box display="flex" gap="16px" justifyContent="center">
                        <IconButton sx={{ padding: 0 }}>
                          <DragIndicator />
                        </IconButton>
                        <Typography
                          // sx={(theme) => ({
                          //   color: theme.palette.text.primary,
                          // })}
                          color="primary"
                          fontSize={24}
                          fontWeight="700"
                          lineHeight="31px"
                        >
                          {data.chartLabel}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton>
                          <ExportFiles />
                        </IconButton>
                        <IconButton>
                          <Gear />
                        </IconButton>
                      </Box>
                    </Stack>
                    <Box>
                      <Typography fontSize="36px" fontWeight={400} lineHeight="47px">
                        10.638
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <ChevronDownRed />
                        <Typography fontSize="24px" fontWeight={400} lineHeight="31px">
                          {' '}
                          1045
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              );
            }
            default:
          }
        })}
      </Box>
    ),
    [dashboardContent]
  );
  return (
    <Stack
      direction="column"
      sx={{
        height: '100%',
        // overflow: 'auto',
        // position: 'fixed',
        width: '100%',
      }}
    >
      <Paper sx={{ borderRadius: 1.25, display: 'flex', maxHeight: '512px', mt: 1, padding: '25px 32px' }}>
        <Stack direction="row" alignItems="center" gap="30px">
          <Typography fontSize="18px" lineHeight="27px" fontWeight="700" color="primary">
            Set dashboard for
          </Typography>
          <Autocomplete
            disablePortal
            options={[
              { label: 'pertaminaindonesia', value: 'pertaminaIndonesia' },
              { label: 'pln', value: 'pln' },
            ]}
            PaperComponent={(props) => (
              <Paper
                sx={(theme) => ({
                  border: `${theme.palette.primary.main} 1px solid`,
                  borderRadius: '10px',
                  marginTop: '4px',
                })}
                {...props}
              />
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{ style: { height: '44px' }, ...params.InputProps }}
                InputLabelProps={{ shrink: true, ...params.InputLabelProps }}
                label="User"
              />
            )}
            sx={{ width: '528px' }}
          />
        </Stack>
      </Paper>
      {renderDashboard}

      <Paper
        sx={{
          backgroundColor: 'transparent',
          borderRadius: 1.25,
          display: 'flex',
          maxHeight: '512px',
          mt: 4,
          p: 1,
          width: '100%',
        }}
      >
        <Box
          display="flex"
          gap="16px"
          justifyContent="center"
          alignItems="center"
          sx={{ border: '3px dashed #2E459A', height: '512px', width: '100%' }}
        >
          <Button color="primary" onClick={() => navigate('/add-chart')}>
            Add Chart
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
};

export default Home;

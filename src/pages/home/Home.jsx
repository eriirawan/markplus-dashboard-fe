import { AppContext } from '@/context/AppContext';
import { sideBarContentWidth } from '@/helpers/Constants';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  Stack,
  Box,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  tableCellClasses,
  IconButton,
  TablePagination,
  Button,
  Pagination,
  TextField,
  Autocomplete,
  Dialog,
  DialogContent,
  Radio,
  FormControlLabel,
  Grid,
  RadioGroup,
  Backdrop,
} from '@mui/material';
import { useState, createContext, useMemo, Fragment, useCallback, useEffect } from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import BarChart from '../../components/chart/BarChart';
import LineChart from '../../components/chart/LineChart';
import { BarData, LineData } from '../../helpers/DummyDataChart';
import { BarChartIcon, ChevronDownRed, DragIndicator, ExportFiles, Gear } from '../../helpers/Icons';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';
import DonutChart from '../../components/chart/DonutChart';
import PieChart from '../../components/chart/PieChart';

import TableChart from '../../components/chart/TableChart';
import AreaChart from '../../components/chart/AreaChart';
// import { useDashboard } from '../../hooks/useDashboard';

export const DashboardContext = createContext({});

const Home = () => {
  const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);
  const [lineData, setLineData] = useState({
    labels: LineData.map((data) => data.category),
    datasets: [
      {
        label: 'Category',
        data: [100, 65, 59, 80, 81, 56, 55, 40, 100],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Category',
        data: LineData.map((data) => Math.floor(Math.random() * 100)),
      },
      {
        label: 'Category',
        data: LineData.map((data) => Math.floor(Math.random() * 100)),
      },
      {
        label: 'Category',
        data: LineData.map((data) => Math.floor(Math.random() * 100)),
      },
    ],
  });
  const navigate = useNavigate();
  const [barData, setBarData] = useState({
    labels: BarData.map((data) => data.category),
    datasets: [
      {
        label: 'Category',
        data: BarData.map((data) => data.value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Category',
        data: BarData.map((data) => data.value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Category',
        data: BarData.map((data) => data.value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Category',
        data: BarData.map((data) => data.value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
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
  });

  const { dashboardContent, setDashboardContent } = useDashboard();
  const [isFullChart, setIsFullChart] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState(null);
  // const { setDashboardContent, dashboardContent } = useDashboard();
  const sizeLayoutData = [[12], [6, 6], [9, 3], [3, 9], [3, 3, 3, 3]];

  const setWidthChart = useCallback(
    (index, type) => {
      switch (type) {
        case 'Line': {
          if (dashboardContent.length === 1) {
            return '100%';
          }
          if (dashboardContent?.[index + 1] && dashboardContent?.[index + 1].chartType === 'Donut') {
            setIsFullChart(true);
            return 752;
          } else if (dashboardContent?.[index - 1] && dashboardContent?.[index - 1]?.chartType === 'Donut') {
            if (
              (dashboardContent?.[index - 1]?.chartType === 'Donut' ||
                dashboardContent?.[index - 2]?.chartType === 'Donut') &&
              (dashboardContent[index - 2]?.chartType === 'Line' || dashboardContent?.[index - 1]?.chartType === 'Line')
            ) {
              return '100%';
            } else {
              return 752;
            }
          } else if (dashboardContent?.[index - 1] && dashboardContent?.[index - 1]?.chartType === 'Line') {
            if (
              (dashboardContent?.[index - 1]?.chartType === 'Donut' ||
                dashboardContent?.[index - 2]?.chartType === 'Donut') &&
              (dashboardContent[index - 2]?.chartType === 'Line' || dashboardContent?.[index - 1]?.chartType === 'Line')
            ) {
              return 1173;
            } else {
              return 540;
            }
          } else if (dashboardContent?.[index + 1] && dashboardContent?.[index + 1]?.chartType === 'Line') {
            return 540;
          } else {
            return 1173;
          }
        }
        case 'Information Card': {
        }
      }
    },
    [dashboardContent, isFullChart, setIsFullChart]
  );
  const getTextLayout = (data) => {
    switch (data) {
      case 12:
        return '100%';
      case 9:
        return '75%';
      case 6:
        return '50%';
      case 3:
        return '25%';
    }
  };
  const renderDashboard = useMemo(
    (data) => {
      const renderChart = (data, indexParent, indexChild) => {
        switch (data.chartType) {
          case 'Donut Chart': {
            return (
              <Paper
                sx={{
                  borderRadius: 1.25,
                  p: 4,
                  height: '100%',
                }}
              >
                <Box display={'flex'} gap={'16px'} justifyContent="space-between" marginBottom={'24px'}>
                  {/* <IconButton sx={{ padding: 0 }}>
                        <DragIndicator />
                      </IconButton> */}
                  <Typography
                    // sx={(theme) => ({
                    //   color: theme.palette.text.primary,
                    // })}
                    color={'primary'}
                    fontSize={24}
                    fontWeight="700"
                    lineHeight="31px"
                  >
                    {data.chartLabel}
                  </Typography>
                  {/* </Box> */}
                  <Box>
                    <IconButton>
                      <ExportFiles />
                    </IconButton>
                    <IconButton>
                      <Gear />
                    </IconButton>
                  </Box>
                  {/* </Grid> */}
                </Box>
                {/* <Box sx={{ width: '100%', height: '100%' }}> */}
                {/* <Grid item lg={12}> */}
                <DonutChart
                  chartData={data.chartData}
                  labelX={data.verticalAxisLabel}
                  labelY={data.horizontalAxisLabel}
                  legendClassName={`legend-container-donut-${indexParent}${indexChild}`}
                  options={{
                    maintainAspectRatio: false,
                  }}
                  isWidth25={data.width === 3 ? true : false}

                  // labelX={data}
                  // width={setWidthChart(index, data.chartType)}
                  // height={309}
                ></DonutChart>
                {/* </Grid> */}
                {/* </Box> */}
                {/* </Box> */}
                {/* </Grid> */}
              </Paper>
              // <Paper
              //   sx={{
              //     borderRadius: 1.25,
              //     display: 'flex',
              //     maxHeight: '512px',
              //     maxWidth: '400px',
              //     width: '100%',
              //     mt: 1,
              //     justifyContent: 'center',
              //     // padding: '25px 32px',
              //   }}
              // >
              //   <Box sx={{ my: 'auto', p: 4 }}>
              //     <Stack direction="row" justifyContent={'space-between'} sx={{ marginBottom: '40px' }}>
              //       <Box display={'flex'} gap={'16px'} justifyContent="center">
              //         <IconButton sx={{ padding: 0 }}>
              //           <DragIndicator />
              //         </IconButton>
              //         <Typography
              //           // sx={(theme) => ({
              //           //   color: theme.palette.text.primary,
              //           // })}
              //           color={'primary'}
              //           fontSize={24}
              //           fontWeight="700"
              //           lineHeight="31px"
              //         >
              //           {data.chartLabel}
              //         </Typography>
              //       </Box>
              //       <Box>
              //         <IconButton>
              //           <ExportFiles />
              //         </IconButton>
              //         <IconButton>
              //           <Gear />
              //         </IconButton>
              //       </Box>
              //     </Stack>
              //     <Box>
              //       <DonutChart chartData={data.chartData}></DonutChart>
              //     </Box>
              //   </Box>
              // </Paper>
            );
          }
          case 'Pie Chart': {
            return (
              <Paper
                sx={{
                  borderRadius: 1.25,
                  p: 4,
                  height: '100%',
                }}
              >
                <Box display={'flex'} gap={'16px'} justifyContent="space-between" marginBottom={'24px'}>
                  {/* <IconButton sx={{ padding: 0 }}>
                        <DragIndicator />
                      </IconButton> */}
                  <Typography
                    // sx={(theme) => ({
                    //   color: theme.palette.text.primary,
                    // })}
                    color={'primary'}
                    fontSize={24}
                    fontWeight="700"
                    lineHeight="31px"
                  >
                    {data.chartLabel}
                  </Typography>
                  {/* </Box> */}
                  <Box>
                    <IconButton>
                      <ExportFiles />
                    </IconButton>
                    <IconButton>
                      <Gear />
                    </IconButton>
                  </Box>
                  {/* </Grid> */}
                </Box>
                {/* <Box sx={{ width: '100%', height: '100%' }}> */}
                {/* <Grid item lg={12}> */}
                <PieChart
                  chartData={data.chartData}
                  labelX={data.verticalAxisLabel}
                  labelY={data.horizontalAxisLabel}
                  legendClassName={`legend-container-pie-${indexParent}${indexChild}`}
                  options={{
                    maintainAspectRatio: false,
                  }}
                  isWidth25={data.width === 3 ? true : false}
                  // labelX={data}
                  // width={setWidthChart(index, data.chartType)}
                  // height={309}
                ></PieChart>
                {/* </Grid> */}
                {/* </Box> */}
                {/* </Box> */}
                {/* </Grid> */}
              </Paper>
              // <Paper
              //   sx={{
              //     borderRadius: 1.25,
              //     display: 'flex',
              //     maxHeight: '512px',
              //     maxWidth: '400px',
              //     width: '100%',
              //     mt: 1,
              //     justifyContent: 'center',
              //     // padding: '25px 32px',
              //   }}
              // >
              //   <Box sx={{ my: 'auto', p: 4 }}>
              //     <Stack direction="row" justifyContent={'space-between'} sx={{ marginBottom: '40px' }}>
              //       <Box display={'flex'} gap={'16px'} justifyContent="center">
              //         <IconButton sx={{ padding: 0 }}>
              //           <DragIndicator />
              //         </IconButton>
              //         <Typography
              //           // sx={(theme) => ({
              //           //   color: theme.palette.text.primary,
              //           // })}
              //           color={'primary'}
              //           fontSize={24}
              //           fontWeight="700"
              //           lineHeight="31px"
              //         >
              //           {data.chartLabel}
              //         </Typography>
              //       </Box>
              //       <Box>
              //         <IconButton>
              //           <ExportFiles />
              //         </IconButton>
              //         <IconButton>
              //           <Gear />
              //         </IconButton>
              //       </Box>
              //     </Stack>
              //     <Box>
              //       <DonutChart chartData={data.chartData}></DonutChart>
              //     </Box>
              //   </Box>
              // </Paper>
            );
          }
          case 'Line Chart': {
            return (
              <Paper
                sx={{
                  borderRadius: 1.25,
                  p: 4,
                  height: '100%',
                }}
              >
                <Box display={'flex'} gap={'16px'} justifyContent="space-between" marginBottom={'24px'}>
                  {/* <IconButton sx={{ padding: 0 }}>
                        <DragIndicator />
                      </IconButton> */}
                  <Typography
                    // sx={(theme) => ({
                    //   color: theme.palette.text.primary,
                    // })}
                    color={'primary'}
                    fontSize={24}
                    fontWeight="700"
                    lineHeight="31px"
                  >
                    {data.chartLabel}
                  </Typography>
                  {/* </Box> */}
                  <Box>
                    <IconButton>
                      <ExportFiles />
                    </IconButton>
                    <IconButton>
                      <Gear />
                    </IconButton>
                  </Box>
                  {/* </Grid> */}
                </Box>
                {/* <Box sx={{ width: '100%', height: '100%' }}> */}
                {/* <Grid item lg={12}> */}
                <LineChart
                  chartData={data.chartData}
                  labelX={data.verticalAxisLabel}
                  labelY={data.horizontalAxisLabel}
                  legendClassName={`legend-container-line-${indexParent}${indexChild}`}
                  options={{
                    maintainAspectRatio: false,
                  }}
                  // labelX={data}
                  // width={setWidthChart(index, data.chartType)}
                  // height={309}
                ></LineChart>
                {/* </Grid> */}
                {/* </Box> */}
                {/* </Box> */}
                {/* </Grid> */}
              </Paper>
            );
          }
          case 'Bar Chart': {
            return (
              <Paper
                sx={{
                  borderRadius: 1.25,
                  // display: 'flex',
                  // maxHeight: '512px',
                  // maxWidth: '400px',
                  // mt: 1,
                  p: 4,
                  height: '100%',
                  // padding: '25px 32px',
                }}
              >
                <Box display={'flex'} gap={'16px'} justifyContent="space-between" marginBottom={'24px'}>
                  {/* <IconButton sx={{ padding: 0 }}>
                        <DragIndicator />
                      </IconButton> */}
                  <Typography
                    // sx={(theme) => ({
                    //   color: theme.palette.text.primary,
                    // })}
                    color={'primary'}
                    fontSize={24}
                    fontWeight="700"
                    lineHeight="31px"
                  >
                    {data.chartLabel}
                  </Typography>
                  {/* </Box> */}
                  <Box>
                    <IconButton>
                      <ExportFiles />
                    </IconButton>
                    <IconButton>
                      <Gear />
                    </IconButton>
                  </Box>
                  {/* </Grid> */}
                </Box>
                <BarChart
                  chartData={data.chartData}
                  options={{
                    maintainAspectRatio: false,
                  }}
                  indexAxis={'y'}
                  labelX={data.verticalAxisLabel}
                  legendClassName={`legend-container-bar-chart-${indexParent}${indexChild}`}
                  labelY={data.horizontalAxisLabel}
                ></BarChart>
              </Paper>
            );
          }
          case 'Column Bar': {
            return (
              <Paper
                sx={{
                  borderRadius: 1.25,
                  // display: 'flex',
                  // maxHeight: '512px',
                  // maxWidth: '400px',
                  // mt: 1,
                  p: 4,
                  height: '100%',
                  // padding: '25px 32px',
                }}
              >
                <Box display={'flex'} gap={'16px'} justifyContent="space-between" marginBottom={'24px'}>
                  {/* <IconButton sx={{ padding: 0 }}>
                        <DragIndicator />
                      </IconButton> */}
                  <Typography
                    // sx={(theme) => ({
                    //   color: theme.palette.text.primary,
                    // })}
                    color={'primary'}
                    fontSize={24}
                    fontWeight="700"
                    lineHeight="31px"
                  >
                    {data.chartLabel}
                  </Typography>
                  {/* </Box> */}
                  <Box>
                    <IconButton>
                      <ExportFiles />
                    </IconButton>
                    <IconButton>
                      <Gear />
                    </IconButton>
                  </Box>
                  {/* </Grid> */}
                </Box>
                <BarChart
                  chartData={data.chartData}
                  options={{
                    maintainAspectRatio: false,
                  }}
                  // indexAxis={'y'}
                  labelX={data.verticalAxisLabel}
                  legendClassName={`legend-container-column-chart-${indexParent}${indexChild}`}
                  labelY={data.horizontalAxisLabel}
                ></BarChart>
              </Paper>
            );
          }
          case 'Stacked Chart': {
            return (
              <Paper
                sx={{
                  borderRadius: 1.25,
                  // display: 'flex',
                  // maxHeight: '512px',
                  // maxWidth: '400px',
                  // mt: 1,
                  p: 4,
                  height: '100%',
                  // padding: '25px 32px',
                }}
              >
                <Box display={'flex'} gap={'16px'} justifyContent="space-between" marginBottom={'24px'}>
                  {/* <IconButton sx={{ padding: 0 }}>
                        <DragIndicator />
                      </IconButton> */}
                  <Typography
                    // sx={(theme) => ({
                    //   color: theme.palette.text.primary,
                    // })}
                    color={'primary'}
                    fontSize={24}
                    fontWeight="700"
                    lineHeight="31px"
                  >
                    {data.chartLabel}
                  </Typography>
                  {/* </Box> */}
                  <Box>
                    <IconButton>
                      <ExportFiles />
                    </IconButton>
                    <IconButton>
                      <Gear />
                    </IconButton>
                  </Box>
                  {/* </Grid> */}
                </Box>
                <BarChart
                  chartData={data.chartData}
                  options={{
                    maintainAspectRatio: false,
                  }}
                  isStackedChart={true}
                  labelX={data.verticalAxisLabel}
                  legendClassName={`legend-container-stacked-chart-${indexParent}${indexChild}`}
                  labelY={data.horizontalAxisLabel}
                ></BarChart>
              </Paper>
            );
          }
          case '100% Stacked Chart': {
            return (
              <Paper
                sx={{
                  borderRadius: 1.25,
                  // display: 'flex',
                  // maxHeight: '512px',
                  // maxWidth: '400px',
                  // mt: 1,
                  p: 4,
                  height: '100%',
                  // padding: '25px 32px',
                }}
              >
                <Box display={'flex'} gap={'16px'} justifyContent="space-between" marginBottom={'24px'}>
                  {/* <IconButton sx={{ padding: 0 }}>
                        <DragIndicator />
                      </IconButton> */}
                  <Typography
                    // sx={(theme) => ({
                    //   color: theme.palette.text.primary,
                    // })}
                    color={'primary'}
                    fontSize={24}
                    fontWeight="700"
                    lineHeight="31px"
                  >
                    {data.chartLabel}
                  </Typography>
                  {/* </Box> */}
                  <Box>
                    <IconButton>
                      <ExportFiles />
                    </IconButton>
                    <IconButton>
                      <Gear />
                    </IconButton>
                  </Box>
                  {/* </Grid> */}
                </Box>
                <BarChart
                  chartData={data.chartData}
                  options={{
                    maintainAspectRatio: false,
                  }}
                  isFullStackedChart={true}
                  isStackedChart={true}
                  labelX={data.verticalAxisLabel}
                  legendClassName={`legend-container-stacked-full-chart-${indexParent}${indexChild}`}
                  labelY={data.horizontalAxisLabel}
                ></BarChart>
              </Paper>
            );
          }
          case 'Table Chart': {
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
                  <Stack direction="row" justifyContent={'space-between'} sx={{ marginBottom: '40px' }}>
                    <Box display={'flex'} gap={'16px'} justifyContent="center" marginBottom={'24px'}>
                      <IconButton sx={{ padding: 0 }}>
                        <DragIndicator />
                      </IconButton>
                      <Typography
                        // sx={(theme) => ({
                        //   color: theme.palette.text.primary,
                        // })}
                        color={'primary'}
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
                  <TableChart></TableChart>
                </Box>
              </Paper>
            );
          }
          case 'Area Chart': {
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
                  <Stack direction="row" justifyContent={'space-between'} sx={{ marginBottom: '40px' }}>
                    <Box display={'flex'} gap={'16px'} justifyContent="center">
                      <IconButton sx={{ padding: 0 }}>
                        <DragIndicator />
                      </IconButton>
                      <Typography
                        // sx={(theme) => ({
                        //   color: theme.palette.text.primary,
                        // })}
                        color={'primary'}
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
                    <LineChart
                      legendClassName={`legend-container-area-chart-${indexParent}${indexChild}`}
                      chartData={{ datasets: '' }}
                      width={1173}
                      height={309}
                    ></LineChart>
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
                  width: '100%',
                  mt: 1,
                }}
              >
                <Box sx={{ my: 'auto', p: 4 }}>
                  <Stack direction="row" justifyContent={'space-between'} sx={{ marginBottom: '16px' }}>
                    <Box display={'flex'} gap={'16px'} justifyContent="center">
                      <IconButton sx={{ padding: 0 }}>
                        <DragIndicator />
                      </IconButton>
                      <Typography
                        // sx={(theme) => ({
                        //   color: theme.palette.text.primary,
                        // })}
                        color={'primary'}
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
                    <Typography fontSize={'36px'} fontWeight={400} lineHeight="47px">
                      10.638
                    </Typography>
                    <Box display="flex" alignItems={'center'}>
                      <ChevronDownRed />
                      <Typography fontSize={'24px'} fontWeight={400} lineHeight="31px">
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
      };
      return (
        <Stack direction="column" gap="20px">
          {dashboardContent.map((data, index) => {
            return (
              <Grid container gap={'20px'} flexWrap={'nowrap'}>
                {data.map((el, indexChild) => {
                  return (
                    <Grid
                      item
                      xl={typeof el === 'number' ? el : el?.width}
                      lg={typeof el === 'number' ? el : el?.width}
                      sx={{
                        border: typeof el === 'number' ? '3px dashed #7E3399' : 0,
                        width: getTextLayout(el),
                        ...(typeof el === 'number'
                          ? {
                              maxHeight: '434px',
                              height: '100vh',
                            }
                          : {}),
                      }}
                      // display={'flex'}
                      // justifyContent={'center'}
                      // alignItems={'center'}
                      // flexDirection={'column'}
                      gap="24px"
                    >
                      {typeof el === 'number' ? (
                        <Box
                          display={'flex'}
                          flexDirection={'column'}
                          justifyContent={'center'}
                          alignItems={'center'}
                          sx={{ height: '100%' }}
                        >
                          <Button
                            onClick={() => {
                              localStorage.setItem('indexChart', `{parent: "${index}", child: "${indexChild}"}`);
                              localStorage.setItem('optionChart', getTextLayout(el));
                              // if (el === 3) {
                              //   localStorage.setItem('option25', true);
                              // } else {
                              //   if (localStorage.option25) {
                              //     localStorage.removeItem('option25');
                              //   }
                              // }
                              navigate('/home/add-chart');
                            }}
                          >
                            <BarChartIcon></BarChartIcon>
                            <Typography fontWeight={400} fontSize={'14px'} lineHeight={'21px'} color={'white'}>
                              Add Chart
                            </Typography>
                          </Button>
                          <Box display={'flex'} gap="4px">
                            <Typography fontWeight={400} fontSize="12px" lineHeight={'18px'}>
                              or{' '}
                            </Typography>
                            <Typography
                              fontWeight={400}
                              fontSize="12px"
                              lineHeight={'18px'}
                              sx={{ textDecoration: 'underline', color: '#E56363' }}
                            >
                              delete this section
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        renderChart(el, index, indexChild)
                      )}
                    </Grid>
                  );
                })}
              </Grid>
            );
          })}
        </Stack>
      );
    },
    [dashboardContent]
  );
  const DialogLayoutChart = useMemo(() => {
    return (
      <Dialog
        open={isLayoutModalOpen}
        sx={{ minWidth: '656px' }}
        PaperProps={{ style: { minWidth: '656px' } }}
        onClose={() => setIsLayoutModalOpen((prev) => !prev)}
      >
        <Stack direction={'column'} padding="64px" minWidth={'656px'} sx={{ overflowX: 'hidden' }}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            // padding={'64px'}
            // paddingTop={'32px'}
            // maxWidth={'656px'}
            minWidth={'528px'}
            marginBottom={'24px'}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '30px', lineHeight: '39px' }}>Choose Layout</Typography>
            <IconButton
              aria-label="close"
              onClick={() => setIsLayoutModalOpen((prev) => !prev)}
              sx={{
                // position: 'absolute',
                // right: 8,
                // top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CancelOutlinedIcon />
            </IconButton>
          </Stack>
          {/* <DialogContent> */}
          {/* <Grid container> */}
          {/* <Grid item xl={2}>
              <RadioGroup aria-labelledby="demo-error-radios" name="quiz" value={''} onChange={() => {}}>
                <FormControlLabel value="best" control={<Radio />} />
                <FormControlLabel value="worst" control={<Radio />} />
                <FormControlLabel value="worst" control={<Radio />} />
                <FormControlLabel value="worst" control={<Radio />} />
                <FormControlLabel value="worst" control={<Radio />} />
              </RadioGroup>
            </Grid> */}
          {/* <Grid item xl={12}> */}
          {sizeLayoutData.map((container, index) => {
            return (
              <Stack
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                minWidth={'528px'}
                padding={'16px'}
                // columnGap="32px"
                rowGap="32px"
                flexWrap={'nowrap'}
                flexDirection={'row'}
                onClick={(e) => setSelectedLayout(index)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: index === selectedLayout ? '#F9F5FA' : '#fff',
                  '&:hover': {
                    background: '#F9F5FA',
                  },
                }}
              >
                <Radio
                  sx={{
                    '& .MuiRadio-root.': {
                      padding: '0 !important',
                    },
                  }}
                  checked={index === selectedLayout}
                  value={index}
                  onChange={(e) => {
                    setSelectedLayout(+e.target.value);
                  }}
                />
                <Stack
                  display={'flex'}
                  flexDirection={'row'}
                  sx={{
                    // border: '1px #7E3399 solid',
                    // borderRadius: '10px',
                    width: '100%',
                    // minHeight: '72px',
                    // padding: '16px',
                  }}
                  gap="8px"
                >
                  {container.map((data) => {
                    return (
                      // <Grid container>
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        sx={{
                          border: '1px #7E3399 solid',
                          borderRadius: '10px',
                          width: '100%',
                          minHeight: '72px',
                          padding: '16px',
                        }}
                        gap="8px"
                      >
                        <Typography>{getTextLayout(data)}</Typography>
                      </Box>
                      // </Grid>
                    );
                  })}
                </Stack>
              </Stack>
            );
          })}
          {/* <Grid></Grid> */}
          {/* </Grid> */}
          {/* </Grid> */}
          {/* </DialogContent> */}
          <Stack display={'flex'} flexDirection={'row'} marginTop="40px" gap="16px">
            <Button sx={{ width: '50%' }} variant="outlined" onClick={() => setIsLayoutModalOpen((prev) => !prev)}>
              Cancel
            </Button>
            <Button
              sx={{ width: '50%' }}
              onClick={() => {
                onSaveLayoutOption();
                // setDashboardContent((prev) => [...prev, sizeLayoutData[selectedLayout]]);
                // setIsLayoutModalOpen(false);
              }}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    );
  }, [isLayoutModalOpen, selectedLayout]);
  const onSaveLayoutOption = () => {
    const content = [...dashboardContent];
    content.push(sizeLayoutData[selectedLayout]);

    setDashboardContent(content);
    setIsLayoutModalOpen(false);
  };
  return (
    <Stack
      direction={'column'}
      sx={{
        height: '100%',
        // overflow: 'auto',
        // position: 'fixed',
        width: '100%',
      }}
    >
      {/* <Paper sx={{ borderRadius: 1.25, display: 'flex', maxHeight: '512px', mt: 1, padding: '25px 32px' }}>
        <Stack direction={'row'} alignItems={'center'} gap="30px">
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
                  marginTop: '4px',
                  borderRadius: '10px',
                })}
                {...props}
              ></Paper>
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
          ></Autocomplete>
        </Stack>
      </Paper> */}
      {renderDashboard}
      {DialogLayoutChart}
      {!dashboardContent?.length && (
        <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} height={'100%'} gap={'8px'}>
          <Typography fontSize="16px" fontWeight={400} lineHeight={'24px'}>
            No chart created yet.
          </Typography>
          <Button color={'primary'} onClick={() => setIsLayoutModalOpen(true)}>
            Create Chart
          </Button>
        </Stack>
      )}
      {dashboardContent?.length ? (
        <Paper
          sx={{
            borderRadius: 1.25,
            display: 'flex',
            maxHeight: '512px',
            width: '100%',
            mt: 4,
            p: 1,
            backgroundColor: 'transparent',
          }}
        >
          <Box
            display={'flex'}
            gap={'16px'}
            justifyContent="center"
            alignItems={'center'}
            sx={{ height: '434px', width: '100%', border: '3px dashed #2E459A' }}
          >
            <Button
              variant="outlined"
              sx={{ borderColor: '#7E3399', color: '#7E3399', '&:hover': { borderColor: '#7E3399' } }}
              onClick={() => setIsLayoutModalOpen((prev) => !prev)}
            >
              Add New Section
            </Button>
          </Box>
        </Paper>
      ) : null}
    </Stack>
  );
};

export default Home;

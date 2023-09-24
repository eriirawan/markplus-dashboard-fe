import React, { useMemo, useState, useContext, useEffect, useRef } from 'react';
import { DashboardContext } from '../home/Home';
import {
  Breadcrumbs,
  Paper,
  Stack,
  Typography,
  Link,
  TextField,
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Checkbox,
  OutlinedInput,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
  Divider,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import { Saturation } from 'react-color/lib/components/common';
import { CustomPicker, SketchPicker } from 'react-color';
import { Box } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import LineChart from '../../components/chart/LineChart';
import { defaultColorChart, defaultDataChartBar, defaultDataChartLine } from '../../helpers/DummyDataChart';
import BarChart from '../../components/chart/BarChart';
import DonutChart from '../../components/chart/DonutChart';
import PieChart from '@/components/chart/PieChart.jsx';
import AreaChart from '../../components/chart/AreaChart';
import { useDashboard } from '../../hooks/useDashboard';
import { LinkOffTwoTone } from '@mui/icons-material';
import MPlusIcon from '@/components/Icon';
import SuccessImage from '@/assets/images/success-image.png';
import ErrorImage from '@/assets/images/error-image.png';
import * as XLSX from 'xlsx';
import tinycolor from 'tinycolor2';
import CustomColorPicker from '@/components/Dialog/CustomColorPicker.jsx';
import DialogColorPicker from '@/components/Dialog/DialogColorPicker.jsx';
import TableChart from '../../components/chart/TableChart';
import { BarChartIcon, ChevronDownRed, DeleteFill, DragIndicator, ExportFiles, Gear } from '../../helpers/Icons';
import DefaultImageInformationCard from '@/assets/images/default-image-infomation-card.png';
const optionData = [
  {
    id: 3,
    name: 'Technology',
  },
  {
    id: 1,
    name: 'Finance',
  },
  {
    id: 2,
    name: 'Product',
  },
  {
    id: 12,
    name: 'Marketing',
  },
  {
    id: 11,
    name: 'Human Resource',
  },
  {
    id: 14,
    name: 'Design',
  },
  {
    id: 13,
    name: 'Software',
  },
];
// const optionDataChartType = [
//   { label: 'Area Chart', value: 'Area' },
//   { label: 'Bar Chart', value: 'Bar Chart' },
//   { label: 'Column Bar', value: 'Column Bar' },
//   { label: 'Line', value: 'Line' },
//   { label: 'Stacked Chart', value: 'Stacked Chart' },
//   { label: '100% Stacked Chart', value: '100% Stacked Chart' },
//   { label: 'Table', value: 'Table' },
//   { label: 'Donut Chart', value: 'Donut' },
//   { label: 'Pie Chart', value: 'Pie' },
//   { label: 'Information Card', value: 'Information Card' },
// ];
// const optionDataChartType25 = [
//   { label: 'Donut Chart', value: 'Donut' },
//   { label: 'Pie Chart', value: 'Pie' },
//   { label: 'Information Card', value: 'Information Card' },
// ];
const AddChart = (props) => {
  const [optionDataChartType, setOptionDataChartType] = useState([
    { label: 'Area Chart', value: 'Area Chart' },
    { label: 'Bar Chart', value: 'Bar Chart' },
    { label: 'Column Bar', value: 'Column Bar' },
    { label: 'Line', value: 'Line Chart' },
    { label: 'Stacked Chart', value: 'Stacked Chart' },
    { label: '100% Stacked Chart', value: '100% Stacked Chart' },
    { label: 'Table', value: 'Table Chart' },
    { label: 'Donut Chart', value: 'Donut Chart' },
    { label: 'Pie Chart', value: 'Pie Chart' },
    { label: 'Information Card', value: 'Information Card' },
  ]);
  const { setDashboardContent, dashboardContent } = useDashboard();
  const [displayInputLabel, setDisplayInputLabel] = useState(true);
  const [colorSelected, setColorSelected] = useState('#FFFFFF');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const chartRef = useRef();
  const [codeColor, setCodeColor] = useState({
    hsv: {
      h: 0,
      s: 0,
      v: 0,
    },
    hsl: {
      h: 0,
      s: 0,
      l: 0,
    },
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    chartType: '',
    chartLabel: '',
    chartData: [],
    verticalAxisLabel: '',
    horizontalAxisLabel: '',
  });
  const [openDialogStatusImport, setOpenDialogStatusImport] = useState({
    loading: false,
    success: false,
    error: false,
  });
  const [typeDialog, setTypeDialog] = useState('loading');
  const refInputFileImport = useRef(null);
  const [fileImport, setFileImport] = useState(null);
  const [errorImportForm, setErrorImportForm] = useState({
    linkField: false,
  });
  const [dataChart, setDataChart] = useState({});
  const [openDialogColorPicker, setOpenDialogColorPicker] = useState(false);
  //   const [chartData, setChartData] = useState({
  //     labels: ['Jan'],
  //     datasets: []
  //   })
  //   useEffect(() =>{
  //     setChartData({ })
  //   },[formData])
  // const [dataParseFile, setDataParseFile] = useState([])
  const [dataChartDonutOrPie, setDataChartDonutOrPie] = useState({});
  const dataChartDonut = useMemo(
    () => ({
      labels: formData.chartData.map((el) => el.name),
      datasets: [
        {
          data: formData.chartData.map((el, index) => defaultDataChartBar[index]),
          //   borderColor: defaultColorChart[index],
          backgroundColor: formData.chartData.map((el, index) => defaultColorChart[index]),
        },
      ],
    }),
    [formData]
  );
  // const dataChart = useMemo(
  //   () => ({
  //     labels: ['Jan'],
  //     datasets: formData.chartData.map((data, index) => ({
  //       label: data.name,
  //       data: [defaultDataChartBar[index]],
  //       borderColor: defaultColorChart[index],
  //       backgroundColor: defaultColorChart[index],
  //     })),
  //   }),
  //   [formData]
  // );
  const dataChartLine = useMemo(
    () => ({
      labels: formData.chartData.map((el) => el.name),
      datasets: formData.chartData.map((data, index) => ({
        label: data.name,
        data: formData.chartData.map((_, idx) => defaultDataChartLine[index][idx]),
        borderColor: defaultColorChart[index],
        backgroundColor: defaultColorChart[index],
      })),
    }),
    [formData]
  );
  const handleClickCover = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleChangeForm = (key, value) => {
    // if (key === 'chartType' && fileImport) {
    //   parseFile(fileImport);
    // }
    // if (key === 'chartData') {
    //   let duplicateRemoved = [];

    //   value.forEach((item) => {
    //     if (duplicateRemoved.findIndex((o) => o.id === item.id) >= 0) {
    //       duplicateRemoved = duplicateRemoved.filter((x) => x.id === item.id);
    //     } else {
    //       duplicateRemoved.push(item);
    //     }
    //   });
    // if(key === 'chartType'){
    //   setFormData({...formData, [key]: {...value}})
    // }
    setFormData({ ...formData, [key]: value });
    // } else {
    // setFormData({ ...formData, [key]: value });
    // }
  };
  // useEffect(() => {
  //   console.info('useEffect');
  //   return function cleanUp() {
  //     console.info('useEffect return');
  //     localStorage?.removeItem('indexChart');
  //   };
  // }, [localStorage]);
  const submitChart = () => {
    let content = [...dashboardContent];
    // const temp = []
    // content.forEach(el => {
    //   const temp = []
    //   if(el.chartType){

    //   } else if(el.chartType) {

    //   }
    // })
    let jsonStr = localStorage.indexChart.replace(/(\w+:)|(\w+ :)/g, function (matchedStr) {
      return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
    });
    const indexChart = JSON.parse(jsonStr);
    const widthSectionChart = JSON.parse(JSON.stringify(content[+indexChart.parent]))[+indexChart.child];
    let indexColor = 0;
    const defaultColor = ['#F54D3D', '#E95670', '#B34270', '#713770'];
    const changeToneColorDefault = {
      ...dataChart,
      datasets: [...dataChart.datasets].map((el, i) => {
        if (i !== 0 && i !== defaultColorChart.length - 1) {
          indexColor += 1;
        } else {
          indexColor = 0;
        }
        return {
          ...el,
          borderColor: defaultColor[indexColor],
          backgroundColor: defaultColor[indexColor],
          ...(formData.chartType === 'Area Chart' ? { fill: true } : {}),
        };
      }),
    };
    // console.info(changeToneColorDefault, '<<<< apa sih');
    const newValue = {
      ...formData,
      chartData:
        formData.chartType === 'Donut Chart' || formData.chartType === 'Pie Chart'
          ? dataChartDonutOrPie
          : changeToneColorDefault,
      width: widthSectionChart,
    };
    if (formData.chartType === 'Bar Chart') {
      newValue.chartData = {
        axis: 'y',
        ...newValue.chartData,
      };
    }
    content[+indexChart.parent][+indexChart.child] = {
      ...newValue,
    };
    // switch (formData.chartType) {
    //   case 'Line Chart':
    //     content[+indexChart.parent][+indexChart.child] = {
    //       ...newValue,
    //     };
    //     break;
    //   case 'Donut Chart':
    //     content[+indexChart.parent][+indexChart.child] = {
    //       ...newValue,
    //     };
    //     // content.push({ ...formData, chartData: dataChartDonut, width: '400px' });
    //     break;
    //   case 'Pie Chart':
    //     content[+indexChart.parent][+indexChart.child] = {
    //       ...newValue,
    //     };
    //     // content.push({ ...formData, chartData: dataChartDonut, width: '400px' });
    //     break;
    //   case 'Bar Chart':
    //     content[+indexChart.parent][+indexChart.child] = {
    //       ...newValue,
    //     };
    //     break;
    //   case 'Column Bar':
    //     content[+indexChart.parent][+indexChart.child] = {
    //       ...newValue,
    //     };
    //     break;
    //   case 'Table Chart': {
    //     content.push({ ...formData });
    //     break;
    //   }
    //   case 'Area Chart': {
    //     content[+indexChart.parent][+indexChart.child] = {
    //       ...newValue,
    //     };
    //     break;
    //   }
    //   case 'Information Card': {
    //     content[+indexChart.parent][+indexChart.child] = {
    //       ...newValue,
    //     };
    //     break;
    //   }
    //   default:
    // }
    setDashboardContent(content);
    navigate('/home');
  };
  const breadcrumbs = useMemo(() => {
    return [
      <Link underline="hover" key="1" color="inherit" onClick={() => navigate('/home')} sx={{ cursor: 'pointer' }}>
        Dashboard
      </Link>,
      <Typography key="2" color="text.lightPrimary">
        {id ? 'Edit Chart' : 'Add Chart'}
      </Typography>,
    ];
  }, [id]);
  const SettingContent = useMemo(() => {
    if (formData.chartType && formData.chartData.length) {
      switch (formData.chartType) {
        case 'Line Chart': {
          setDisplayInputLabel(true);
          return (
            <Box>
              <Typography fontSize={'18px'} lineHeight={'27px'} fontWeight={700} marginBottom={'24px'}>
                {formData.chartLabel}
              </Typography>
              <LineChart
                refChart={chartRef}
                width={'549px'}
                height={'335px'}
                maxWidthLegend={'369px'}
                labelX={formData.verticalAxisLabel}
                // legendClassName={'legend-container-bar-chart'}
                labelY={formData.horizontalAxisLabel}
                legendClassName={'legend-container-line'}
                options={
                  {
                    // onClick: (evt, elements, chart) => {
                    //   if (elements.length) {
                    //     setSelected(elements);
                    //     setColorSelected(elements[0]?.element?.options.backgroundColor);
                    //     setCodeColor((prev) => ({
                    //       ...prev,
                    //       hsl: tinycolor(elements[0]?.element?.options.backgroundColor).toHsl(),
                    //     }));
                    //     setCodeColor((prev) => ({
                    //       ...prev,
                    //       hsv: tinycolor(elements[0]?.element?.options.backgroundColor).toHsv(),
                    //     }));
                    //     setDisplayColorPicker(true);
                    //   }
                    // },
                  }
                }
                chartData={dataChart}
              ></LineChart>
            </Box>
          );
        }
        case 'Column Bar': {
          setDisplayInputLabel(true);
          return (
            <Box>
              <Typography fontSize={'18px'} lineHeight={'27px'} fontWeight={700} marginBottom={'24px'}>
                {formData.chartLabel}
              </Typography>
              <BarChart
                refChart={chartRef}
                // width={'549px'}
                // height={'335px'}
                maxWidthLegend={'369px'}
                chartData={dataChart}
                labelX={formData.verticalAxisLabel}
                labelY={formData.horizontalAxisLabel}
                // indexAxis={'y'}
                legendClassName={'legend-container-column-chart'}
                options={
                  {
                    // maintainAspectRatio: false,
                    // onClick(evt, elements, chart) {
                    //   if (elements.length) {
                    //     setSelected(elements);
                    //     setColorSelected(elements[0]?.element?.options.backgroundColor);
                    //     setDisplayColorPicker(true);
                    //   }
                    // },
                  }
                }
              />
            </Box>
          );
        }
        case 'Bar Chart': {
          setDisplayInputLabel(true);
          return (
            <Box>
              <Typography fontSize={'18px'} lineHeight={'27px'} fontWeight={700} marginBottom={'24px'}>
                {formData.chartLabel}
              </Typography>
              <BarChart
                refChart={chartRef}
                // width={'549px'}
                // height={'335px'}
                maxWidthLegend={'369px'}
                legendClassName={'legend-container-bar-chart'}
                indexAxis={'y'}
                labelX={formData.verticalAxisLabel}
                labelY={formData.horizontalAxisLabel}
                chartData={{
                  axis: 'y',
                  ...dataChart,
                }}
                options={
                  {
                    // maintainAspectRatio: false,
                    // onClick(evt, elements, chart) {
                    //   if (elements.length) {
                    //     setSelected(elements);
                    //     setColorSelected(elements[0]?.element?.options.backgroundColor);
                    //     setDisplayColorPicker(true);
                    //   }
                    // },
                  }
                }
              />
            </Box>
          );
        }
        case 'Donut Chart': {
          setDisplayInputLabel(false);
          return (
            <Box sx={{ marginTop: '16px' }}>
              <Typography fontSize={'18px'} lineHeight={'27px'} fontWeight={700} marginBottom={'16px'}>
                {formData.chartLabel}
              </Typography>
              <DonutChart
                refChart={chartRef}
                width={'240px'}
                height={'240px'}
                // maxWidthLegend={'369px'}
                chartData={dataChartDonutOrPie}
                legendClassName={'legend-container-donut-chart'}
                options={
                  {
                    // onClick(evt, elements, chart) {
                    //   if (elements.length) {
                    //     setSelected(elements);
                    //     setColorSelected(elements[0]?.element?.options.backgroundColor);
                    //     setDisplayColorPicker(true);
                    //   }
                    // },
                  }
                }
              />
            </Box>
          );
        }
        case 'Pie Chart': {
          setDisplayInputLabel(false);
          return (
            <Box sx={{ marginTop: '16px' }}>
              <Typography fontSize={'18px'} lineHeight={'27px'} fontWeight={700} marginBottom={'16px'}>
                {formData.chartLabel}
              </Typography>
              <PieChart
                refChart={chartRef}
                width={'240px'}
                height={'240px'}
                // maxWidthLegend={'369px'}
                legendClassName={'legend-container-pie-chart'}
                chartData={dataChartDonutOrPie}
                options={
                  {
                    // onClick(evt, elements, chart) {
                    //   if (elements.length) {
                    //     setSelected(elements);
                    //     setColorSelected(elements[0]?.element?.options.backgroundColor);
                    //     setDisplayColorPicker(true);
                    //   }
                    // },
                  }
                }
              />
            </Box>
          );
        }
        case 'Area Chart': {
          setDisplayInputLabel(true);
          return (
            <Box>
              <Typography fontSize={'18px'} lineHeight={'27px'} fontWeight={700} marginBottom={'24px'}>
                {formData.chartLabel}
              </Typography>
              <AreaChart
                refChart={chartRef}
                width={'549px'}
                height={'335px'}
                // maxWidthLegend={'369px'}
                legendClassName={'legend-container-area-chart'}
                labelX={formData.verticalAxisLabel}
                labelY={formData.horizontalAxisLabel}
                chartData={{
                  ...dataChart,
                  datasets: { ...dataChart }.datasets.map((el) => ({ ...el, fill: true })),
                }}
                isAreaChart={true}
                options={
                  {
                    // onClick(evt, elements, chart) {
                    //   if (elements.length) {
                    //     setSelected(elements);
                    //     setColorSelected(elements[0]?.element?.options.backgroundColor);
                    //     setDisplayColorPicker(true);
                    //   }
                    // },
                  }
                }
              ></AreaChart>
            </Box>
          );
        }
        case 'Stacked Chart': {
          setDisplayInputLabel(true);
          return (
            <Box sx={{ maxWidth: '549px', marginTop: '20px' }}>
              <BarChart
                refChart={chartRef}
                width={'549px'}
                height={'335px'}
                maxWidthLegend={'369px'}
                chartData={dataChart}
                legendClassName={'legend-container-bar-chart'}
                labelX={formData.verticalAxisLabel}
                labelY={formData.horizontalAxisLabel}
                isStackedChart={true}
                options={
                  {
                    // onClick(evt, elements, chart) {
                    //   if (elements.length) {
                    //     setSelected(elements);
                    //     setColorSelected(elements[0]?.element?.options.backgroundColor);
                    //     setDisplayColorPicker(true);
                    //   }
                    // },
                  }
                }
              />
            </Box>
          );
        }
        case '100% Stacked Chart': {
          setDisplayInputLabel(true);
          return (
            <Box sx={{ maxWidth: '549px', marginTop: '20px' }}>
              <BarChart
                refChart={chartRef}
                width={'549px'}
                height={'335px'}
                maxWidthLegend={'369px'}
                chartData={dataChart}
                legendClassName={'legend-container-bar-chart'}
                labelX={formData.verticalAxisLabel}
                labelY={formData.horizontalAxisLabel}
                isFullStackedChart={true}
                isStackedChart={true}
                options={
                  {
                    // onClick(evt, elements, chart) {
                    //   if (elements.length) {
                    //     setSelected(elements);
                    //     setColorSelected(elements[0]?.element?.options.backgroundColor);
                    //     setDisplayColorPicker(true);
                    //   }
                    // },
                  }
                }
              />
            </Box>
          );
        }
        case 'Table Chart': {
          setDisplayInputLabel(false);
          return (
            <Box sx={{ marginTop: '20px' }}>
              <Typography fontSize={'18px'} lineHeight={'27px'} fontWeight={700} marginBottom={'24px'}>
                {formData.chartLabel}
              </Typography>
              <TableChart chartData={dataChart} />
            </Box>
          );
        }
        case 'Information Card': {
          return (
            <Paper
              sx={{
                borderRadius: 1.25,
                // display: 'flex',
                // maxHeight: '512px',
                // maxWidth: '400px',
                // width: '100%',
                // mt: 1,
                // p: 4,
                // maxWidth: '311px',
                // maxHeight: '211px',
                marginTop: '87px',
              }}
            >
              <Box sx={{ height: '100%' }} display="flex" justifyContent="center">
                <Box
                  display={'flex'}
                  sx={{
                    my: 'auto',
                    p: 3,
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    minWidth: '311px',
                    minHeight: '211px',
                    borderRadius: '10px',
                    border: '1px solid rgba(229, 229, 229, 1)',
                  }}
                >
                  <Stack
                    direction="column"
                    // justifyContent={'space-between'}
                    // sx={{ marginBottom: '16px' }}
                    gap="61px"
                    // sx={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
                  >
                    <Box>
                      <Typography
                        // sx={(theme) => ({
                        //   color: theme.palette.text.primary,
                        // })}
                        color={'primary'}
                        fontSize={24}
                        fontWeight="700"
                        lineHeight="31px"
                      >
                        {formData.chartLabel}
                      </Typography>
                    </Box>
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
                  </Stack>
                  <Box sx={{ width: '100%' }} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
                    <img src={DefaultImageInformationCard} />
                    {/* <Typography fontSize={'36px'} fontWeight={400} lineHeight="47px">
                    10.638
                  </Typography>
                  <Box display="flex" alignItems={'center'}>
                    <ChevronDownRed />
                    <Typography fontSize={'24px'} fontWeight={400} lineHeight="31px">
                      {' '}
                      1045
                    </Typography>
                  </Box> */}
                  </Box>
                </Box>
              </Box>
            </Paper>
          );
        }
        default: {
          setDisplayInputLabel(false);
          return (
            <Box sx={{ width: '100%', height: '100%' }} display="flex" justifyContent={'center'} alignItems="center">
              <Typography fontSize={'18px'} lineHeight="27px" fontWeight={400} color="#BFBFBF">
                No available
              </Typography>
            </Box>
          );
        }
      }
    } else {
      // if (
      //   formData.chartType === 'Table Chart' ||
      //   formData.chartType === 'Information Card' ||
      //   formData.chartType === 'Donut Chart' ||
      //   formData.chartType === 'Pie Chart'
      // ) {
      //   setDisplayInputLabel(false);
      // } else {
      //   setDisplayInputLabel(true);
      // }
      return (
        <Box sx={{ width: '100%', height: '100%' }} display="flex" justifyContent={'center'} alignItems="center">
          <Typography fontSize={'18px'} lineHeight="27px" fontWeight={400} color="#BFBFBF">
            No available
          </Typography>
        </Box>
      );
    }

    // }
  }, [formData, dataChart, displayColorPicker, colorSelected]);
  useEffect(() => {
    if (localStorage.optionChart) {
      if (localStorage.optionChart === '100%' || localStorage.optionChart === '75%') {
        setOptionDataChartType((prev) => {
          return prev.filter(
            (el) => el.value !== 'Information Card' && el.value !== 'Pie Chart' && el.value !== 'Donut Chart'
          );
        });
      } else if (localStorage.optionChart === '50%') {
        setOptionDataChartType((prev) => {
          return prev?.filter((el) => el.value !== 'Information Card');
        });
      } else {
        setOptionDataChartType((prev) => {
          return prev.filter(
            (el) => el.value === 'Information Card' || el.value === 'Pie Chart' || el.value === 'Donut Chart'
          );
        });
      }
      // if(localStorage.)
      setDisplayInputLabel(false);
    }
  }, []);
  const DialogStatusImport = ({ openDialogImport, setOpenDialogImport, typeDialog = 'loading' }) => {
    const getLayoutContentText = () => {
      switch (typeDialog) {
        case 'loading':
          return 'Please wait, your file is being processed...';
        case 'success':
          return 'Import completed successfully';
        default:
          return 'Import failed. Please try again.';
      }
    };
    return (
      <Dialog
        open={openDialogImport[typeDialog]}
        PaperProps={{
          style: {
            width: '100%',
            maxWidth: '320px',
            padding: '32px',
          },
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          // paddingX={'32px'}
          // paddingTop={'32px'}
          marginBottom={'16px'}
          minWidth={'252px'}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '18px', lineHeight: '27px' }}>Import Data</Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialogImport((prev) => ({ ...prev, [typeDialog]: false }))}
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
        <DialogContent sx={{ padding: 0 }}>
          <Stack display={'flex'} direction="column" gap={'16px'}>
            <Typography>{getLayoutContentText(typeDialog)}</Typography>
            {typeDialog === 'loading' ? (
              <Box display={'flex'} gap={'10px'} flexDirection={'column'} sx={{ maxWidth: '512px', width: '100%' }}>
                <CircularProgress />
              </Box>
            ) : typeDialog === 'success' ? (
              <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
                <Stack display={'flex'} justifyContent={'center'} sx={{ padding: '32px 96px' }}>
                  <img src={SuccessImage} />
                </Stack>
                <Button onClick={() => setOpenDialogStatusImport((prev) => ({ ...prev, success: false }))}>OK</Button>
              </Box>
            ) : (
              <Box display={'flex'} flexDirection={'column'}>
                <Stack display={'flex'} justifyContent={'center'} sx={{ padding: '32px 96px' }}>
                  <img src={ErrorImage} />
                </Stack>
                <Button onClick={() => setOpenDialogStatusImport((prev) => ({ ...prev, error: false }))}>OK</Button>
              </Box>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    );
  };
  // useEffect(() => {
  // }, [window.innerWidth]);
  const parseFile = async (file) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      const temp = {
        labels: [],
        datasets: [],
      };
      const tempDonut = {
        labels: [],
        datasets: [],
      };
      const color = ['rgba(0, 108, 183, 1)', 'rgba(173, 195, 43, 1)', 'rgba(237, 27, 47, 1)', 'rgba(255, 213, 61, 1)'];
      let indexColor = 0;
      // setDataParseFile(jsonData)
      // if (localStorage.optionChart === '25%' || localStorage) {
      // if (typeof jsonData[0].data === 'number') {
      //   jsonData.forEach((el, i) => {
      //     // if (i === 0) {
      //     tempDonut.labels.push(el.category);
      //     // }
      //     tempDonut.datasets[0].backgroundColor.push(color[indexColor]);
      //     tempDonut.datasets[0].borderColor.push(el.data);
      //     tempDonut.datasets[0].data.push(el.data);
      //     indexColor += 1;
      //   });
      //   setDataChartDonutOrPie(tempDonut);
      //   handleChangeForm('chartData', tempDonut.datasets);
      // }
      // }
      // else {
      // if (typeof jsonData[0].data === 'string') {
      jsonData.forEach((el, i) => {
        temp.labels.push(el.label);
        if (el?.category) {
          temp.datasets.push({
            label: el.category,
            data: el?.data?.split(',').map((data) => +data),
            backgroundColor: color[indexColor],
            borderColor: color[indexColor],
          });
        }
        indexColor += 1;
        if (indexColor > color.length - 1) {
          indexColor = 0;
        }
        if (i === 0) {
          tempDonut.datasets.push({
            data: el.data.split(',').map((data) => +data),
            label: el.label,
            borderColor: [],
            backgroundColor: [],
          });
        }
        tempDonut.labels.push(el.label);
        tempDonut.datasets[0].borderColor.push(color[indexColor]);
        tempDonut.datasets[0].backgroundColor.push(color[indexColor]);
      });
      setDataChartDonutOrPie(tempDonut);
      setDataChart(temp);
      handleChangeForm('chartData', temp.datasets);

      // }
      // setDataChart(temp);
      // handleChangeForm('chartData', temp.datasets);
      setOpenDialogStatusImport((prev) => ({ ...prev, loading: false }));
      setTypeDialog('success');
      setOpenDialogStatusImport((prev) => ({ ...prev, success: true }));
    } catch (err) {
      console.info(err);
      setOpenDialogStatusImport((prev) => ({ ...prev, loading: false }));
      setTypeDialog('error');
      setOpenDialogStatusImport((prev) => ({ ...prev, error: true }));
    }

    //  handleChangeForm('chartData', temp);
    //   setDataChart(temp);
  };
  // useEffect(() => {
  //   if (colorSelected) {
  //     console.info(tinycolor(colorSelected).toHsl(), '<<<< to hsl');
  //     console.info(tinycolor(colorSelected).toHsv(), '<<<< to hsv');
  //   }
  // }, [colorSelected]);

  return (
    <Stack
      sx={{
        height: '100%',
        width: '100%',
      }}
      gap={'20px'}
      //   onClick={() => handleClickCover()}
    >
      <Paper sx={{ padding: '32px' }}>
        <Grid container>
          <Grid item xs={12} lg={5.75} xl={5.5} md={12} sm={12}>
            {/* <Paper sx={{ borderRadius: 1.25, display: 'flex', maxHeight: '548px', mt: 1 }}> */}
            <Box sx={{ height: '100%', my: 'auto', width: '100%' }}>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>{breadcrumbs}</Breadcrumbs>
              <Typography
                fontWeight={700}
                fontSize="30px"
                lineHeight={'39px'}
                color="primary"
                sx={{ marginTop: '16px' }}
              >
                {id ? 'Edit Chart' : 'Add Chart'}
              </Typography>
              {/* <Typography
                fontWeight={700}
                fontSize="18px"
                lineHeight={'27px'}
                color="primary"
                sx={{ marginBottom: '25px' }}
              >
                Chart Settings
              </Typography> */}
              <Box display={'flex'} flexDirection="column">
                <Box display={'flex'} alignItems={'center'} gap="10px" sx={{ py: '32px' }}>
                  <Button
                    aria-label="close"
                    color="primary"
                    sx={{ minWidth: '200px' }}
                    onClick={() => refInputFileImport.current.click()}
                  >
                    <FileOpenOutlinedIcon color="white" />
                    <Typography
                      sx={{ marginLeft: '5px' }}
                      fontSize={'14px'}
                      fontWeight={400}
                      lineHeight={'21px'}
                      color={'#FFFFFF'}
                    >
                      Import
                    </Typography>
                  </Button>
                  {fileImport ? (
                    <Typography>{fileImport?.name}</Typography>
                  ) : (
                    <Typography>No data imported yet.</Typography>
                  )}
                </Box>
                <Box display={'flex'} flexDirection={'column'} gap="16px">
                  <Autocomplete
                    fullWidth
                    disablePortal
                    options={optionDataChartType}
                    value={formData.chartType}
                    inputValue={formData.chartType}
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
                        label="Chart Type"
                        placeholder="Chart Type"
                      />
                    )}
                    onChange={(e, newValue) => {
                      handleChangeForm('chartType', newValue?.value || '');
                    }}
                    sx={{ padding: '9px 0px 19px 0px' }}
                  ></Autocomplete>
                  {formData.chartType === 'Information Card' && (
                    <Autocomplete
                      fullWidth
                      disablePortal
                      options={[{ label: 'Median', value: 'Median' }]}
                      value={'Median'}
                      inputValue={'Median'}
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
                          label="Formula"
                          placeholder="Formula"
                        />
                      )}
                      // onChange={(e, newValue) => {
                      //   handleChangeForm('chartType', newValue?.value || '');
                      // }}
                      sx={{ padding: '9px 0px 19px 0px' }}
                    ></Autocomplete>
                  )}
                  <TextField
                    label={
                      formData.chartType === 'Table Chart'
                        ? 'Table Label'
                        : formData.chartType === 'Information Card'
                        ? 'Information Label'
                        : 'Chart Label'
                    }
                    placeholder={
                      formData.chartType === 'Table Chart'
                        ? 'Type table label'
                        : formData.chartType === 'Information Card'
                        ? 'Type information label'
                        : 'Type chart label'
                    }
                    InputProps={{ style: { height: '44px' } }}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => handleChangeForm('chartLabel', e.target.value)}
                    sx={{ padding: '9px 0px 19px 0px' }}
                  ></TextField>
                  {displayInputLabel && (
                    <Stack direction={'row'} gap="16px">
                      <TextField
                        label="Vertical Axis Label"
                        placeholder="Vertical Axis Label"
                        InputProps={{ style: { height: '44px' } }}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChangeForm('verticalAxisLabel', e.target.value)}
                        sx={{ padding: '9px 0px 19px 0px', width: '100%' }}
                      ></TextField>
                      <TextField
                        label="Horizontal Axis Label"
                        placeholder="Horizontal Axis Label"
                        InputProps={{ style: { height: '44px' } }}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChangeForm('horizontalAxisLabel', e.target.value)}
                        sx={{ padding: '9px 0px 19px 0px', width: '100%' }}
                      ></TextField>
                    </Stack>
                  )}
                </Box>
              </Box>
            </Box>
            {/* </Paper> */}
          </Grid>
          <Grid item xl={1} lg={0.5} justifyContent={'center'} display={'flex'}>
            <Divider light orientation={+window.innerWidth >= 1200 ? 'vertical' : 'horizontal'} />
          </Grid>
          <Grid item xs={12} lg={5.75} xl={5.5} md={12} sm={12}>
            {/* <Paper sx={{ borderRadius: 1.25, display: 'flex', minWidth: '548px', mt: 1 }}> */}
            <Box sx={{ height: '100%', my: 'auto', width: '100%' }}>
              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography fontSize="24px" fontWeight={700} lineHeight="31px" color={'primary'}>
                  Preview
                </Typography>
                {JSON.stringify(dataChart) !== '{}' && (
                  <Button
                    onClick={() => {
                      if (formData.chartType === 'Information Card') {
                      } else {
                        setOpenDialogColorPicker((prev) => !prev);
                      }
                    }}
                    variant="outlined"
                  >
                    {formData.chartType === 'Information Card' ? 'Change Image' : 'Change Colors'}
                  </Button>
                )}
              </Box>
              {SettingContent}
              {displayColorPicker && (
                <Box
                  sx={{
                    position: 'absolute',
                    zIndex: '2',
                    top: '100px',
                  }}
                >
                  <Box
                    sx={{
                      position: 'fixed',
                      top: '0px',
                      right: '0px',
                      bottom: '0px',
                      left: '0px',
                    }}
                    onClick={handleClickCover}
                  ></Box>
                  <CustomColorPicker codeColor={codeColor} onChange={() => {}}></CustomColorPicker>
                  {/* <SketchPicker
                    color={colorSelected}
                    disableAlpha={true}
                    styles={{
                      '.flexbox-fix': {
                        display: 'none',
                      },
                    }}
                    onChangeComplete={(color) => {
                      //   chartRef.current.update();
                      setColorSelected(color);
                    }}
                    onChange={(color) => {
                      selected.forEach((el) => {
                        const { datasetIndex, index } = el;
                        const dataSet = dataChart.datasets;
                        const dataSetDonut = dataChartDonut.datasets;
                        const dataSetLine = dataChartLine.datasets;
                        if (formData.chartType === 'Vertical Bar' || formData.chartType === 'Horizontal Bar') {
                          dataSet[datasetIndex].backgroundColor = `rgba(${Object.values(color.rgb)})`;
                          dataSet[datasetIndex].borderColor = `rgba(${Object.values(color.rgb)})`;
                          defaultColorChart[datasetIndex] = `rgba(${Object.values(color.rgb)})`;
                          chartRef.current.data.datasets[datasetIndex].backgroundColor = `rgba(${[
                            ...Object.values(color.rgb).slice(0, 2),
                            0.1,
                          ]})`;
                          chartRef.current.update();
                        } else if (formData.chartType === 'Donut') {
                          dataSetDonut[datasetIndex].backgroundColor[index] = `rgba(${Object.values(color.rgb)})`;
                          defaultColorChart[index] = `rgba(${Object.values(color.rgb)})`;
                          chartRef.current.data.datasets[datasetIndex].backgroundColor[index] = `rgba(${[
                            ...Object.values(color.rgb).slice(0, 2),
                            0.1,
                          ]})`;
                          chartRef.current.update();
                        } else if (formData.chartType === 'Line') {
                          dataSetLine[datasetIndex].backgroundColor = `rgba(${Object.values(color.rgb)})`;
                          dataSetLine[datasetIndex].borderColor = `rgba(${Object.values(color.rgb)})`;
                          defaultColorChart[datasetIndex] = `rgba(${Object.values(color.rgb)})`;
                          chartRef.current.data.datasets[datasetIndex].backgroundColor = `rgba(${[
                            ...Object.values(color.rgb).slice(0, 2),
                            0.1,
                          ]})`;
                          chartRef.current.data.datasets[datasetIndex].borderColor = `rgba(${[
                            ...Object.values(color.rgb).slice(0, 2),
                            0.1,
                          ]})`;
                          chartRef.current.update();
                        } else {
                          dataSetLine[datasetIndex].backgroundColor = `rgba(${Object.values(color.rgb)})`;
                          dataSetLine[datasetIndex].borderColor = `rgba(${Object.values(color.rgb)})`;
                          defaultColorChart[datasetIndex] = `rgba(${Object.values(color.rgb)})`;
                          chartRef.current.data.datasets[datasetIndex].backgroundColor = `rgba(${[
                            ...Object.values(color.rgb).slice(0, 2),
                            0.1,
                          ]})`;
                          chartRef.current.data.datasets[datasetIndex].borderColor = `rgba(${[
                            ...Object.values(color.rgb).slice(0, 2),
                            0.1,
                          ]})`;
                          chartRef.current.update();
                        }
                      });
                    }}
                  /> */}
                </Box>
              )}
            </Box>
            {/* </Paper> */}
          </Grid>
        </Grid>
      </Paper>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={refInputFileImport}
        accept=".xlsx, .xls, .csv"
        onChange={(e) => {
          setTypeDialog('loading');
          setOpenDialogStatusImport((prev) => ({ ...prev, loading: true }));
          parseFile(e.target.files[0]);
          setFileImport(e.target.files[0]);
          setOpenDialogStatusImport((prev) => ({ ...prev, error: true }));
        }}
      />
      <DialogColorPicker
        dataSets={dataChart?.datasets || []}
        openDialog={openDialogColorPicker}
        onSaveChanges={(data) => {
          setDataChart((prev) => ({ ...prev, datasets: [...data] }));
          setOpenDialogColorPicker((prev) => !prev);
        }}
        onCancel={() => setOpenDialogColorPicker((prev) => !prev)}
      ></DialogColorPicker>
      <DialogStatusImport
        openDialogImport={openDialogStatusImport}
        setOpenDialogImport={setOpenDialogStatusImport}
        // contentText={'Choose your data import method:'
        typeDialog={typeDialog}
      />
      {/* <DialogImport
        openDialogImport={openDialogImport.linkImport}
        setOpenDialogImport={setOpenDialogImport}
        contentText={'Please paste your file link here'}
        typeDialog="linkImport"
      />

      <DialogImport
        openDialogImport={openDialogImport.notifDialogImport}
        setOpenDialogImport={setOpenDialogImport}
        contentText={'Please wait, your file is being processed...'}
        typeDialog="notifDialogImport"
      /> */}

      <Paper sx={{ borderRadius: 1.25, display: 'flex', justifyContent: 'space-between', maxHeight: '105px', mt: 1 }}>
        {id && (
          <Box sx={{ width: '100%', my: 'auto', p: 4 }}>
            <Button
              variant={'outlined'}
              color="error"
              sx={{
                maxWidth: '286px',
                width: '100%',
                backgroundColor: '#E563630D',
              }}
            >
              <Box display={'flex'}>
                <DeleteFill />
                <Typography sx={(theme) => ({ color: theme.palette.error.light })}>Delete Chart</Typography>
              </Box>
            </Button>
          </Box>
        )}
        <Box
          sx={{ width: '100%', my: 'auto', p: 4 }}
          display="flex"
          justifyContent={'flex-end'}
          alignItems="center"
          gap={'16px'}
        >
          {/* <Typography fontWeight={700} fontSize="18px" lineHeight="27px" color="primary">
            Create column?
          </Typography> */}

          <Button sx={{ maxWidth: '256px', width: '100%' }} variant="outlined">
            Cancel
          </Button>
          <Button
            sx={{ maxWidth: '256px', width: '100%' }}
            onClick={(_) => {
              submitChart();
            }}
          >
            Add Chart
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
};

export default AddChart;

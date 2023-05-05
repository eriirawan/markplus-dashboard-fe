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
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { SketchPicker, CustomPicker, HuePicker } from 'react-color';

import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import LineChart from '../../components/chart/LineChart';
import { defaultColorChart, defaultDataChartBar, defaultDataChartLine } from '../../helpers/DummyDataChart';
import BarChart from '../../components/chart/BarChart';
import DonutChart from '../../components/chart/DonutChart';
import AreaChart from '../../components/chart/AreaChart';
import { useDashboard } from '../../hooks/useDashboard';

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
const optionDataChartType = [
  { label: 'Line', value: 'Line' },
  { label: 'Horizontal Bar', value: 'Horizontal Bar' },
  { label: 'Vertical Bar', value: 'Vertical Bar' },
  { label: 'Donut', value: 'Donut' },
  { label: 'Area', value: 'Area' },
  { label: 'Table', value: 'Table' },
  { label: 'Information Card', value: 'Information Card' },
];
const AddChart = () => {
  const { setDashboardContent, dashboardContent } = useDashboard();
  const [selected, setSelected] = useState(null);
  const [displayInputLabel, setDisplayInputLabel] = useState(true);
  const [colorSelected, setColorSelected] = useState('#FFFFFF');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const chartRef = useRef();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    chartType: '',
    chartLabel: '',
    chartData: [],
    verticalAxisLabel: '',
    horizontalAxisLabel: '',
  });
  //   const [chartData, setChartData] = useState({
  //     labels: ['Jan'],
  //     datasets: []
  //   })
  //   useEffect(() =>{
  //     setChartData({ })
  //   },[formData])
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
  const dataChart = useMemo(
    () => ({
      labels: ['Jan'],
      datasets: formData.chartData.map((data, index) => ({
        label: data.name,
        data: [defaultDataChartBar[index]],
        borderColor: defaultColorChart[index],
        backgroundColor: defaultColorChart[index],
      })),
    }),
    [formData]
  );
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
    if (key === 'chartData') {
      let duplicateRemoved = [];

      value.forEach((item) => {
        if (duplicateRemoved.findIndex((o) => o.id === item.id) >= 0) {
          duplicateRemoved = duplicateRemoved.filter((x) => x.id === item.id);
        } else {
          duplicateRemoved.push(item);
        }
      });
      setFormData({ ...formData, [key]: duplicateRemoved });
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };
  const submitChart = () => {
    const content = [...dashboardContent];
    // const temp = []
    // content.forEach(el => {
    //   const temp = []
    //   if(el.chartType){

    //   } else if(el.chartType) {

    //   }
    // })
    switch (formData.chartType) {
      case 'Line':
        content.push({ ...formData, chartData: dataChartLine, width: '1264px' });
        break;
      case 'Donut':
        content.push({ ...formData, chartData: dataChartDonut, width: '400px' });
        break;
      case 'Horizontal Bar':
        content.push({ ...formData, chartData: dataChart });
        break;
      case 'Vertical Bar':
        content.push({ ...formData, chartData: dataChart });
        break;
      case 'Table': {
        content.push({ ...formData });
        break;
      }
      case 'Area': {
        content.push({
          ...formData,
          chartData: { ...dataChartLine, datasets: dataChartLine.datasets.map((el) => ({ ...el, fill: 'start' })) },
          width: '1264px',
        });
        break;
      }
      case 'Information Card': {
        content.push({ ...formData });
        break;
      }
      default:
    }
    setDashboardContent(content);
    navigate('/');
  };
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" onClick={() => navigate('/home')} sx={{ cursor: 'pointer' }}>
      Home
    </Link>,
    <Typography key="2" color="text.lightPrimary">
      Add Chart
    </Typography>,
  ];
  const SettingContent = useMemo(() => {
    if (formData.chartType && formData.chartData.length) {
      switch (formData.chartType) {
        case 'Line': {
          setDisplayInputLabel(true);
          return (
            <Box sx={{ maxWidth: '549px', marginTop: '20px' }}>
              <LineChart
                refChart={chartRef}
                width={'549px'}
                height={'335px'}
                maxWidthLegend={'369px'}
                labelX={formData.verticalAxisLabel}
                labelY={formData.horizontalAxisLabel}
                options={{
                  onClick: (evt, elements, chart) => {
                    if (elements.length) {
                      setSelected(elements);
                      setColorSelected(elements[0]?.element?.options.backgroundColor);
                      setDisplayColorPicker(true);
                    }
                  },
                }}
                chartData={dataChartLine}
              ></LineChart>
            </Box>
          );
        }
        case 'Vertical Bar': {
          setDisplayInputLabel(true);
          return (
            <Box sx={{ maxWidth: '549px', marginTop: '20px' }}>
              <BarChart
                refChart={chartRef}
                width={'549px'}
                height={'335px'}
                maxWidthLegend={'369px'}
                chartData={dataChart}
                labelX={formData.verticalAxisLabel}
                labelY={formData.horizontalAxisLabel}
                options={{
                  onClick(evt, elements, chart) {
                    if (elements.length) {
                      setSelected(elements);
                      setColorSelected(elements[0]?.element?.options.backgroundColor);
                      setDisplayColorPicker(true);
                    }
                  },
                }}
              />
            </Box>
          );
        }
        case 'Horizontal Bar': {
          setDisplayInputLabel(true);
          return (
            <Box sx={{ maxWidth: '549px', marginTop: '20px' }}>
              <BarChart
                refChart={chartRef}
                width={'549px'}
                height={'335px'}
                maxWidthLegend={'369px'}
                indexAxis={'y'}
                labelX={formData.verticalAxisLabel}
                labelY={formData.horizontalAxisLabel}
                chartData={{
                  axis: 'y',
                  labels: ['Jan'],
                  datasets: formData.chartData.map((data, index) => ({
                    label: data.name,
                    data: [Math.floor(Math.random() * 140)],
                    borderColor: defaultColorChart[index],
                    backgroundColor: defaultColorChart[index],
                  })),
                }}
                options={{
                  onClick(evt, elements, chart) {
                    if (elements.length) {
                      setSelected(elements);
                      setColorSelected(elements[0]?.element?.options.backgroundColor);
                      setDisplayColorPicker(true);
                    }
                  },
                }}
              />
            </Box>
          );
        }
        case 'Donut': {
          setDisplayInputLabel(false);
          return (
            <Box sx={{ maxWidth: '549px', marginTop: '20px' }}>
              <DonutChart
                refChart={chartRef}
                width={'549px'}
                height={'335px'}
                maxWidthLegend={'369px'}
                chartData={dataChartDonut}
                options={{
                  onClick(evt, elements, chart) {
                    if (elements.length) {
                      setSelected(elements);
                      setColorSelected(elements[0]?.element?.options.backgroundColor);
                      setDisplayColorPicker(true);
                    }
                  },
                }}
              />
            </Box>
          );
        }
        case 'Area': {
          setDisplayInputLabel(true);
          return (
            <Box sx={{ maxWidth: '549px', marginTop: '20px' }}>
              <LineChart
                refChart={chartRef}
                width={'549px'}
                height={'335px'}
                maxWidthLegend={'369px'}
                labelX={formData.verticalAxisLabel}
                labelY={formData.horizontalAxisLabel}
                chartData={{
                  ...dataChartLine,
                  datasets: dataChartLine.datasets.map((el) => ({ ...el, fill: 'start' })),
                }}
                options={{
                  onClick(evt, elements, chart) {
                    if (elements.length) {
                      setSelected(elements);
                      setColorSelected(elements[0]?.element?.options.backgroundColor);
                      setDisplayColorPicker(true);
                    }
                  },
                }}
              ></LineChart>
            </Box>
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
      if (
        formData.chartType === 'Table' ||
        formData.chartType === 'Information Card' ||
        formData.chartType === 'Donut'
      ) {
        setDisplayInputLabel(false);
      }
      return (
        <Box sx={{ width: '100%', height: '100%' }} display="flex" justifyContent={'center'} alignItems="center">
          <Typography fontSize={'18px'} lineHeight="27px" fontWeight={400} color="#BFBFBF">
            No available
          </Typography>
        </Box>
      );
    }

    // }
  }, [formData, displayColorPicker, colorSelected]);
  return (
    <Stack
      direction={'column'}
      sx={{
        height: '100%',
        width: '100%',
      }}
      //   onClick={() => handleClickCover()}
    >
      <Stack direction={'row'} gap={'32px'} sx={{ marginBottom: '32px' }}>
        <Paper sx={{ borderRadius: 1.25, display: 'flex', maxHeight: '548px', mt: 1 }}>
          <Box sx={{ height: 768, my: 'auto', p: 4, width: '592px' }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>{breadcrumbs}</Breadcrumbs>
            <Typography
              fontWeight={700}
              fontSize="30px"
              lineHeight={'39px'}
              color="primary"
              sx={{ marginTop: '16px', marginBottom: '32px' }}
            >
              Add Chart
            </Typography>
            <Typography
              fontWeight={700}
              fontSize="18px"
              lineHeight={'27px'}
              color="primary"
              sx={{ marginBottom: '25px' }}
            >
              Chart Settings
            </Typography>
            <Box display={'flex'} gap={'32px'} flexDirection="column">
              <Autocomplete
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
                sx={{ maxWidth: '256px' }}
                onChange={(e, newValue) => {
                  handleChangeForm('chartType', newValue?.value || '');
                }}
              ></Autocomplete>
              <TextField
                label="Chart Label"
                placeholder="Chart Label"
                InputProps={{ style: { height: '44px' } }}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleChangeForm('chartLabel', e.target.value)}
              ></TextField>
              <FormControl sx={{}}>
                <InputLabel shrink htmlFor={'multiple-checkbox-label'} id="multiple-checkbox-label">
                  Choose Data
                </InputLabel>
                <Select
                  labelId="multiple-checkbox-label"
                  id="multiple-checkbox"
                  multiple
                  value={formData.chartData}
                  onChange={(e) => handleChangeForm('chartData', e.target.value)}
                  inputProps={{
                    placeholder: 'Choose Data',
                  }}
                  input={
                    <OutlinedInput
                      id="select-chart-data"
                      placeholder="Choose Data"
                      notched
                      label="Choose Data"
                      sx={{ height: '44px' }}
                    />
                  }
                  renderValue={(selected) => selected.map((x) => x.name).join(', ')}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        border: '#2E459A 1px solid',
                        borderRadius: '10px',
                        marginTop: '10px',
                        maxHeight: '245px',
                      },
                    },
                  }}
                >
                  {optionData.map((data) => (
                    <MenuItem
                      key={data.id}
                      value={data}
                      sx={{
                        padding: '0 16px',
                      }}
                    >
                      <Checkbox checked={formData.chartData.findIndex((item) => item.id === data.id) >= 0} />
                      <ListItemText primary={data.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {displayInputLabel && (
                <Stack direction={'row'} gap="16px">
                  <TextField
                    label="Vertical Axis Label"
                    placeholder="Vertical Axis Label"
                    InputProps={{ style: { height: '44px' } }}
                    sx={{ maxWidth: '256px', width: '100%' }}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => handleChangeForm('verticalAxisLabel', e.target.value)}
                  ></TextField>
                  <TextField
                    label="Horizontal Axis Label"
                    placeholder="Horizontal Axis Label"
                    InputProps={{ style: { height: '44px', maxWidth: '256px' } }}
                    sx={{ maxWidth: '256px', width: '100%' }}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => handleChangeForm('horizontalAxisLabel', e.target.value)}
                  ></TextField>
                </Stack>
              )}
            </Box>
          </Box>
        </Paper>
        <Paper sx={{ borderRadius: 1.25, display: 'flex', minWidth: '548px', mt: 1 }}>
          <Box sx={{ height: '100%', my: 'auto', p: 4, width: '640px' }}>
            <Typography fontSize="18px" fontWeight={700} lineHeight="27px" color={'primary'}>
              Color Setting
            </Typography>
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
                <SketchPicker
                  color={colorSelected}
                  disableAlpha
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
                />
              </Box>
            )}
          </Box>
        </Paper>
      </Stack>
      <Paper sx={{ borderRadius: 1.25, display: 'flex', maxHeight: '105px', maxWidth: '1264px', mt: 1 }}>
        <Box
          sx={{ width: '100%', maxWidth: '1264px', my: 'auto', p: 4 }}
          display="flex"
          justifyContent={'flex-end'}
          alignItems="center"
        >
          <Typography fontWeight={700} fontSize="18px" lineHeight="27px" color="primary">
            Create column?
          </Typography>
          <Button
            sx={{ marginLeft: '32px', marginRight: '16px', maxWidth: '256px', width: '100%' }}
            onClick={(_) => {
              submitChart();
            }}
          >
            Yes
          </Button>
          <Button sx={{ maxWidth: '256px', width: '100%' }} color="inherit">
            Cancel
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
};

export default AddChart;

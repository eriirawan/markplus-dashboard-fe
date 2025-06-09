import React, { useMemo, useState, useContext, useEffect, useRef } from 'react';
import {
  Breadcrumbs,
  Paper,
  Stack,
  Typography,
  Link,
  TextField,
  Autocomplete,
  Button,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  CircularProgress,
  Divider,
  Switch,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Close, ErrorOutline, WarningOutlined } from '@mui/icons-material';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import { Box } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import PieChart from '@/components/chart/PieChart.jsx';
import SuccessImage from '@/assets/images/success-image.png';
import ErrorImage from '@/assets/images/error-image.png';
import * as XLSX from 'xlsx';
import CustomColorPicker from '@/components/Dialog/CustomColorPicker.jsx';
import DialogColorPicker from '@/components/Dialog/DialogColorPicker.jsx';
import DefaultImageInformationCard from '@/assets/images/default-image-infomation-card.png';
import { AppBarContext } from '@/context/AppBarContext';
import { AddOrEditChartContext, useAddOrEditChartStore } from './addChartContext';
import { DeleteFill } from '../../helpers/Icons';
import { useDashboard } from '../../hooks/useDashboard';
import AreaChart from '../../components/chart/AreaChart';
import DonutChart from '../../components/chart/DonutChart';
import BarChart from '../../components/chart/BarChart';
import LineChart from '../../components/chart/LineChart';
import TableChart from '../../components/chart/TableChart';
import DialogConfirmation from '../../components/Dialog/DialogConfirmation';

const AddChart = (props) => {
  const store = useAddOrEditChartStore();
  const appBarStore = useContext(AppBarContext);

  const { clientSelected, setOpenPopupClient } = appBarStore;
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleFileInputChange,
    setOpenDialog,
    openDialog,
    typeDialog,
    setTypeDialog,
    methods,
    optionChartTypes,
    setUserId,
    setSectionId,
    setChartId,
    handleClick,
    chartDetail,
    userId,
    handleDelete,
  } = store;
  const [optionDataChartType, setOptionDataChartType] = useState([...optionChartTypes]);
  const { setDashboardContent, dashboardContent } = useDashboard();
  const [displayInputLabel, setDisplayInputLabel] = useState(true);
  const [colorSelected, setColorSelected] = useState('#FFFFFF');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const chartRef = useRef();

  const [codeColor, setCodeColor] = useState({
    hsl: {
      h: 0,
      l: 0,
      s: 0,
    },
    hsv: {
      h: 0,
      s: 0,
      v: 0,
    },
  });
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  // const [formData, setFormData] = useState({
  //   chartType: '',
  //   chartLabel: '',
  //   chartData: [],
  //   verticalAxisLabel: '',
  //   horizontalAxisLabel: '',
  // });
  const [openDialogStatusImport, setOpenDialogStatusImport] = useState(openDialog);
  // const [typeDialog, setTypeDialog] = useState('loading');
  const refInputFileImport = useRef(null);
  const refInputFileImage = useRef(null);
  const [fileImport, setFileImport] = useState(null);
  const [errorImportForm, setErrorImportForm] = useState({
    linkField: false,
  });
  const [dataChart, setDataChart] = useState({});
  const [openDialogColorPicker, setOpenDialogColorPicker] = useState(false);
  const [dataChartDonutOrPie, setDataChartDonutOrPie] = useState({});
  const handleClickCover = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const watchAllField = methods.watch();
  useEffect(() => {
    if (optionChartTypes) {
      setOptionDataChartType(optionChartTypes);
    }
    if (clientSelected?.id) {
      // setSectionType(location?.pathname?.slice(1));
      setUserId(clientSelected?.id);
    }
    if (id) {
      setChartId(id);
    }
    if (localStorage.optionChart) {
      if (localStorage.optionChart === '100%' || localStorage.optionChart === '75%') {
        setOptionDataChartType((prev) =>
          prev.filter((el) => el.name !== 'Information Chart' && el.name !== 'Pie Chart' && el.name !== 'Donut Chart')
        );
      } else if (localStorage.optionChart === '50%') {
        setOptionDataChartType((prev) => prev?.filter((el) => el.name !== 'Information Chart'));
      } else {
        setOptionDataChartType((prev) =>
          prev.filter((el) => el.name === 'Information Chart' || el.name === 'Pie Chart' || el.name === 'Donut Chart')
        );
      }
      // if(localStorage.)
      // setDisplayInputLabel(false);
    }
  }, [optionChartTypes, clientSelected]);

  const handleChangeForm = (key, value) => {
    // setFormData({ ...formData, [key]: value });
    methods.setValue(key, value);
  };
  const [showAxisValue, setShowAxisValue] = useState(true);
  const breadcrumbs = useMemo(
    () => [
      <Link underline="hover" key="1" color="inherit" onClick={() => navigate('/home')} sx={{ cursor: 'pointer' }}>
        Dashboard
      </Link>,
      <Typography key="2" color="text.lightPrimary">
        {id ? 'Edit Chart' : 'Add Chart'}
      </Typography>,
    ],
    [id]
  );
  const SettingContent = useMemo(() => {
    if (methods.getValues('chartType') && JSON.stringify(watchAllField.chartData) !== '{}') {
      switch (methods.getValues('chartType')) {
        case 'Line Chart': {
          setDisplayInputLabel(true);
          return (
            <Box>
              <Typography fontSize="18px" lineHeight="27px" fontWeight={700} marginBottom="24px">
                {methods.getValues('chartLabel')}
              </Typography>
              <LineChart
                refChart={chartRef}
                width="549px"
                height="335px"
                maxWidthLegend="369px"
                labelX={methods.getValues('verticalAxisLabel')}
                labelY={methods.getValues('horizontalAxisLabel')}
                legendClassName="legend-container-line"
                options={{}}
                chartData={methods.getValues('chartData')}
                showAxisValue={methods.getValues('showAxisLabels')}
              />
            </Box>
          );
        }
        case 'Column Chart': {
          setDisplayInputLabel(true);
          return (
            <Box>
              <Typography fontSize="18px" lineHeight="27px" fontWeight={700} marginBottom="24px">
                {methods.getValues('chartLabel')}
              </Typography>
              <BarChart
                refChart={chartRef}
                maxWidthLegend="369px"
                chartData={methods.getValues('chartData')}
                labelX={methods.getValues('verticalAxisLabel')}
                labelY={methods.getValues('horizontalAxisLabel')}
                legendClassName="legend-container-column-chart"
                options={{}}
                showAxisValue={methods.getValues('showAxisLabels')}
              />
            </Box>
          );
        }
        case 'Bar Chart': {
          setDisplayInputLabel(true);
          return (
            <Box>
              <Typography fontSize="18px" lineHeight="27px" fontWeight={700} marginBottom="24px">
                {methods.getValues('chartLabel')}
              </Typography>
              <BarChart
                refChart={chartRef}
                maxWidthLegend="369px"
                legendClassName="legend-container-bar-chart"
                indexAxis="y"
                labelX={methods.getValues('verticalAxisLabel')}
                labelY={methods.getValues('horizontalAxisLabel')}
                chartData={{
                  axis: 'y',
                  ...methods.getValues('chartData'),
                }}
                options={{}}
                showAxisValue={methods.getValues('showAxisLabels')}
              />
            </Box>
          );
        }
        case 'Donut Chart': {
          setDisplayInputLabel(false);
          return (
            <Box sx={{ marginTop: '16px' }}>
              <Typography fontSize="18px" lineHeight="27px" fontWeight={700} marginBottom="16px">
                {methods.getValues('chartLabel')}
              </Typography>
              <DonutChart
                refChart={chartRef}
                width="240px"
                height="240px"
                chartData={methods.getValues('chartDataDonutOrPie')}
                legendClassName="legend-container-donut-chart"
                options={{}}
              />
            </Box>
          );
        }
        case 'Pie Chart': {
          setDisplayInputLabel(false);
          return (
            <Box sx={{ marginTop: '16px' }}>
              <Typography fontSize="18px" lineHeight="27px" fontWeight={700} marginBottom="16px">
                {methods.getValues('chartLabel')}
              </Typography>
              <PieChart
                refChart={chartRef}
                width="240px"
                height="240px"
                legendClassName="legend-container-pie-chart"
                chartData={methods.getValues('chartDataDonutOrPie')}
                options={{}}
              />
            </Box>
          );
        }
        case 'Area Chart': {
          setDisplayInputLabel(true);
          return (
            <Box>
              <Typography fontSize="18px" lineHeight="27px" fontWeight={700} marginBottom="24px">
                {methods.getValues('chartLabel')}
              </Typography>
              <AreaChart
                refChart={chartRef}
                width="549px"
                height="335px"
                legendClassName="legend-container-area-chart"
                labelX={methods.getValues('verticalAxisLabel')}
                labelY={methods.getValues('horizontalAxisLabel')}
                chartData={{
                  ...methods.getValues('chartData'),
                  datasets: { ...methods.getValues('chartData') }.datasets.map((el) => ({
                    ...el,
                    // data: [0, ...el.data],
                    fill: {
                      // 3. Set the fill options
                      above: el.backgroundColor?.replace('1)', '0.3)') || el?.backgroundColor,
                      target: 'origin',
                    },
                  })),
                }}
                isAreaChart
                options={{}}
                showAxisValue={methods.getValues('showAxisLabels')}
              />
            </Box>
          );
        }
        case 'Stacked Chart': {
          setDisplayInputLabel(true);
          return (
            <Box sx={{ marginTop: '20px', maxWidth: '549px' }}>
              <BarChart
                refChart={chartRef}
                width="549px"
                height="335px"
                maxWidthLegend="369px"
                chartData={methods.getValues('chartData')}
                legendClassName="legend-container-bar-chart"
                labelX={methods.getValues('verticalAxisLabel')}
                labelY={methods.getValues('horizontalAxisLabel')}
                isStackedChart
                options={{}}
                // showAxisValue={showAxisValue}
                showAxisValue={methods.getValues('showAxisLabels')}
              />
            </Box>
          );
        }
        case '100% Stacked Chart': {
          setDisplayInputLabel(true);
          return (
            <Box sx={{ marginTop: '20px', maxWidth: '549px' }}>
              <BarChart
                refChart={chartRef}
                width="549px"
                height="335px"
                maxWidthLegend="369px"
                chartData={methods.getValues('chartData')}
                legendClassName="legend-container-bar-chart"
                labelX={methods.getValues('verticalAxisLabel')}
                labelY={methods.getValues('horizontalAxisLabel')}
                isFullStackedChart
                isStackedChart
                options={{}}
                showAxisValue={methods.getValues('showAxisLabels')}
              />
            </Box>
          );
        }
        case 'Table': {
          setDisplayInputLabel(false);
          return (
            <Box sx={{ marginTop: '20px' }}>
              <Typography fontSize="18px" lineHeight="27px" fontWeight={700} marginBottom="24px">
                {methods.getValues('chartLabel')}
              </Typography>
              <TableChart chartData={methods.getValues('chartData')} />
            </Box>
          );
        }
        case 'Information Chart': {
          setDisplayInputLabel(false);

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
                  display="flex"
                  sx={{
                    border: '1px solid rgba(229, 229, 229, 1)',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    minHeight: '211px',
                    minWidth: '311px',
                    my: 'auto',
                    p: 3,
                  }}
                >
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    // sx={{ marginBottom: '16px' }}
                    gap="61px"
                    // sx={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
                  >
                    <Box>
                      <Typography
                        // sx={(theme) => ({
                        //   color: theme.palette.text.primary,
                        // })}
                        color="primary"
                        fontSize={24}
                        fontWeight="700"
                        lineHeight="31px"
                      >
                        {methods.getValues('chartLabel')}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography fontSize="36px" fontWeight={400} lineHeight="47px">
                        {(
                          methods
                            .getValues('chartData')
                            .datasets.flatMap((el) => el.data)
                            .reduce((a, b) => a + b, 0) /
                          methods.getValues('chartData').datasets.flatMap((el) => el.data).length
                        ).toFixed(2)}
                      </Typography>
                      {/* <Box display="flex" alignItems={'center'}> */}
                      {/* <ChevronDownRed /> */}
                      {/* <Typography fontSize={'24px'} fontWeight={400} lineHeight="31px"> */} {/* 1045 */}
                      {/* </Typography> */}
                      {/* </Box> */}
                    </Box>
                  </Stack>
                  <Box sx={{ width: '100%' }} display="flex" justifyContent="flex-end" alignItems="flex-end">
                    <img src={methods.getValues('imageUrl') || DefaultImageInformationCard} width={40} />
                  </Box>
                </Box>
              </Box>
            </Paper>
          );
        }
        default: {
          setDisplayInputLabel(false);
          return (
            <Box sx={{ height: '100%', width: '100%' }} display="flex" justifyContent="center" alignItems="center">
              <Typography fontSize="18px" lineHeight="27px" fontWeight={400} color="#BFBFBF">
                No available
              </Typography>
            </Box>
          );
        }
      }
    } else {
      return (
        <Box sx={{ height: '100%', width: '100%' }} display="flex" justifyContent="center" alignItems="center">
          <Typography fontSize="18px" lineHeight="27px" fontWeight={400} color="#BFBFBF">
            No available
          </Typography>
        </Box>
      );
    }
  }, [
    methods.getValues('chartData'),
    methods.getValues('chartType'),
    methods.getValues('chartLabel'),
    methods.getValues('verticalAxisLabel'),
    methods.getValues('horizontalAxisLabel'),
    methods.getValues('imageUrl'),
    displayColorPicker,
    colorSelected,
    methods.getValues('showAxisLabels'),
  ]);

  const saveAsExcel = async () => {
    const labels = JSON.parse(chartDetail?.tabular.labels);
    const data = labels.map((el) => ({ test: el }));
    chartDetail?.tabular?.datasets?.forEach((element) => {
      element.data.forEach((el, i) => {
        data[i][element.label] = el;
      });
    });
    const header = ['', ...chartDetail?.tabular?.datasets?.map((el) => el.label)];
    const ws = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, [header]);
    XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
    const wb = { SheetNames: ['data'], Sheets: { data: ws } };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
    const finalData = new Blob([excelBuffer], { type: '.xlsx' });
    const file = new File([finalData], chartDetail?.tabular?.filename, { lastModified: new Date() });
    setFileImport(file);
  };
  useEffect(() => {
    if (id && chartDetail) {
      saveAsExcel();
      const mappingDataFormDetail = {
        chartData: {
          datasets: chartDetail?.tabular?.datasets.map((el) => ({
            backgroundColor: chartDetail?.colorway?.[el.label]?.backgroundColor || null,
            borderColor: chartDetail?.colorway?.[el.label]?.borderColor || null,
            data: el.data,
            label: el.label,
          })),
          labels: JSON.parse(chartDetail?.tabular?.labels),
        },
        chartDataDonutOrPie: {
          datasets: chartDetail?.tabular?.datasets.map((el) => ({
            backgroundColor: chartDetail?.colorway?.[el.label]?.backgroundColor || null,
            borderColor: chartDetail?.colorway?.[el.label]?.borderColor || null,
            data: el.data,
            label: el.label,
          })),
          labels: JSON.parse(chartDetail?.tabular?.labels),
        },
        chartLabel: chartDetail.title,
        chartSubLabel: chartDetail.sub_title,
        chartType: chartDetail?.chart_type_name,
        chartTypeId: chartDetail?.chart_type_id,
        horizontalAxisLabel: chartDetail?.label_horizontal,
        showAxisLabels: chartDetail.show_axis_labels,
        verticalAxisLabel: chartDetail?.label_vertical,
        ...(chartDetail.chart_type_name === 'Information Chart' ? { imageUrl: chartDetail.image_url } : {}),
      };
      for (const obj in mappingDataFormDetail) {
        handleChangeForm(obj, mappingDataFormDetail[obj]);
      }

      setChartId(id);
    }
  }, [chartDetail, id]);

  const DialogStatusImport = ({ openDialogImport, setOpenDialogImport, typeDialog = 'loading' }) => {
    const getLayoutContentText = () => {
      switch (typeDialog) {
        case 'loading':
          return 'Please wait, your file is being processed...';
        case 'success':
          return 'Import completed successfully';
        case 'deleteChart':
          return 'Are you sure you want to delete this chart?';
        case 'deleteImportData':
          return 'Are you sure you want to delete the imported data?';
        default:
          return 'Import failed. Please try again.';
      }
    };
    const getLayoutContentAction = () => {
      switch (typeDialog) {
        case 'loading':
          return (
            // <Box display={'flex'} gap={'10px'} flexDirection={'column'} sx={{ maxWidth: '512px', width: '100%' }}>
            <Stack display="flex" justifyContent="center" sx={{ padding: '32px 96px' }}>
              <CircularProgress />
            </Stack>
          );
        case 'success':
          return (
            <Box display="flex" flexDirection="column" gap="16px">
              <Stack display="flex" justifyContent="center" sx={{ padding: '32px 96px' }}>
                <img src={SuccessImage} />
              </Stack>
              <Button onClick={() => setOpenDialogImport((prev) => ({ ...prev, success: false }))}>OK</Button>
            </Box>
          );
        case 'deleteChart':
          return (
            <Box display="flex" flexDirection="column" gap="16px">
              <Button onClick={() => setOpenDialogImport((prev) => ({ ...prev, success: false }))}>
                <WarningOutlined />
                <Typography>Delete</Typography>
              </Button>
              <Button onClick={() => setOpenDialogImport((prev) => ({ ...prev, success: false }))}>Cancel</Button>
            </Box>
          );
        case 'deleteImportData':
          return <></>;
        default:
          return (
            <Box display="flex" flexDirection="column">
              <Stack display="flex" justifyContent="center" sx={{ padding: '32px 96px' }}>
                <img src={ErrorImage} />
              </Stack>
              <Button onClick={() => setOpenDialogImport((prev) => ({ ...prev, error: false }))}>OK</Button>
            </Box>
          );
      }
    };
    return (
      <Dialog
        open={openDialogImport[typeDialog]}
        PaperProps={{
          style: {
            maxWidth: '320px',
            padding: '32px',
            width: '100%',
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          // paddingX={'32px'}
          // paddingTop={'32px'}
          marginBottom="16px"
          minWidth="252px"
        >
          <Typography sx={{ fontSize: '18px', fontWeight: 700, lineHeight: '27px' }}>Import Data</Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialogImport((prev) => !prev)}
            sx={{ border: 1.5, color: 'primary.main', height: '44px', width: '44px' }}
          >
            <Close />
          </IconButton>
        </Stack>
        <DialogContent sx={{ padding: 0 }}>
          <Stack display="flex" direction="column" gap="16px">
            <Typography>{getLayoutContentText(typeDialog)}</Typography>
            {getLayoutContentAction()}
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
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { blankrows: false, header: 1 });
    } catch (err) {
      console.info(err);
    }
  };
  useEffect(() => {
    if (id) {
      store.setAction('update');
    } else {
      store.setAction('create');
    }
  }, [id]);

  const handleDeleteChart = () => {
    handleDelete(setOpenDialogDelete);
  };
  const renderMain = useMemo(
    () => (
      <AddOrEditChartContext.Provider value={store}>
        <Stack
          sx={{
            height: '100%',
            width: '100%',
          }}
          gap="20px"
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
                    lineHeight="39px"
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
                  <Box display="flex" flexDirection="column">
                    <Box display="flex" alignItems="center" gap="10px" sx={{ py: '32px' }}>
                      <Button
                        aria-label="close"
                        color="primary"
                        sx={{ minWidth: '200px' }}
                        onClick={() => {
                          if (!clientSelected) {
                            setOpenPopupClient(true);
                          } else {
                            refInputFileImport.current.click();
                          }
                        }}
                        disabled={!!fileImport}
                      >
                        <FileOpenOutlinedIcon color="white" />
                        <Typography
                          sx={{ marginLeft: '5px' }}
                          fontSize="14px"
                          fontWeight={400}
                          lineHeight="21px"
                          color="#FFFFFF"
                        >
                          Import
                        </Typography>
                      </Button>
                      {fileImport ? (
                        <Box display="flex" alignItems="center">
                          <Typography textAlign="center" maxWidth="350px">
                            {fileImport?.name}
                          </Typography>
                          <IconButton
                            onClick={() => {
                              setFileImport(null);
                              methods.setValue('chartData', {});
                            }}
                          >
                            <DeleteFill />
                          </IconButton>
                        </Box>
                      ) : (
                        <Typography>No data imported yet.</Typography>
                      )}
                    </Box>
                    <Box display="flex" flexDirection="column" gap="16px">
                      <Autocomplete
                        fullWidth
                        // freeSolo
                        isOptionEqualToValue={(opt) => opt.name === methods.getValues('chartType')}
                        disablePortal
                        options={optionDataChartType}
                        {...methods.register('chartType')}
                        getOptionLabel={(option) => option.name || ''}
                        defaultValue={methods.getValues('chartType')}
                        // value={methods.getValues('chartType')}
                        inputValue={methods.getValues('chartType')}
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
                            label="Chart Type"
                            placeholder="Chart Type"
                          />
                        )}
                        onChange={(e, newValue) => {
                          handleChangeForm('chartTypeId', newValue?.id || '');
                          handleChangeForm('chartType', newValue?.name || '');
                        }}
                        sx={{ padding: '9px 0px 19px 0px' }}
                      />
                      {methods.getValues('chartType') === 'Information Chart' && (
                        <Autocomplete
                          fullWidth
                          disablePortal
                          options={[{ label: 'Median', value: 'Median' }]}
                          value="Median"
                          inputValue="Median"
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
                              label="Formula"
                              placeholder="Formula"
                            />
                          )}
                          // onChange={(e, newValue) => {
                          //   handleChangeForm('chartType', newValue?.value || '');
                          // }}
                          sx={{ padding: '9px 0px 19px 0px' }}
                        />
                      )}
                      <TextField
                        {...methods.register('chartLabel')}
                        label={
                          methods.getValues('chartType') === 'Table'
                            ? 'Table Label'
                            : methods.getValues('chartType') === 'Information Chart'
                            ? 'Information Label'
                            : 'Chart Label'
                        }
                        placeholder={
                          methods.getValues('chartType') === 'Table Chart'
                            ? 'Type table label'
                            : methods.getValues('chartType') === 'Information Chart'
                            ? 'Information label'
                            : 'Chart label'
                        }
                        // value={methods.getValues('chartLabel')}
                        InputProps={{ style: { height: '44px' } }}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChangeForm('chartLabel', e.target.value)}
                        sx={{ padding: '9px 0px 19px 0px' }}
                      />
                      <TextField
                        {...methods.register('chartSubLabel')}
                        label={
                          methods.getValues('chartType') === 'Table'
                            ? 'Table Label'
                            : methods.getValues('chartType') === 'Information Chart'
                            ? 'Information Sub Label'
                            : 'Chart Sub Label'
                        }
                        placeholder={
                          methods.getValues('chartType') === 'Table Chart'
                            ? 'Type table label'
                            : methods.getValues('chartType') === 'Information Chart'
                            ? 'Information label'
                            : 'Chart sub label'
                        }
                        // value={methods.getValues('chartLabel')}
                        InputProps={{ style: { height: '44px' } }}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChangeForm('chartSubLabel', e.target.value)}
                        sx={{ padding: '9px 0px 19px 0px' }}
                      />
                      {displayInputLabel && (
                        <>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ marginBottom: '16px' }}
                          >
                            <Box>
                              <Typography fontWeight={400} size="14px" lineHeight="21px" color="#000000">
                                Hide or Show Axis Value
                              </Typography>
                              <Typography fontWeight={400} size="12px" lineHeight="16px" color="#808080">
                                Switch OFF to make the axis X and Y value hide, and Switch ON to show the axis
                              </Typography>
                            </Box>
                            <Switch
                              {...methods.register('showAxisLabels')}
                              checked={methods.getValues('showAxisLabels')}
                              onChange={() => {
                                methods.setValue('showAxisLabels', !methods.getValues('showAxisLabels'));
                              }}
                            />
                          </Box>
                          <Stack direction="row" gap="16px">
                            <TextField
                              {...methods.register('verticalAxisLabel')}
                              label="Vertical Axis Label"
                              placeholder="Vertical Axis Label"
                              InputProps={{ style: { height: '44px' } }}
                              InputLabelProps={{ shrink: true }}
                              // value={methods.getValues('verticalAxisLabel')}
                              onChange={(e) => handleChangeForm('verticalAxisLabel', e.target.value)}
                              sx={{ padding: '9px 0px 19px 0px', width: '100%' }}
                            />
                            <TextField
                              {...methods.register('horizontalAxisLabel')}
                              label="Horizontal Axis Label"
                              placeholder="Horizontal Axis Label"
                              InputProps={{ style: { height: '44px' } }}
                              InputLabelProps={{ shrink: true }}
                              // value={methods.getValues('horizontalAxisLabel')}
                              onChange={(e) => handleChangeForm('horizontalAxisLabel', e.target.value)}
                              sx={{ padding: '9px 0px 19px 0px', width: '100%' }}
                            />
                          </Stack>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
                {/* </Paper> */}
              </Grid>
              <Grid item xl={1} lg={0.5} justifyContent="center" display="flex">
                <Divider light orientation={+window.innerWidth >= 1200 ? 'vertical' : 'horizontal'} />
              </Grid>
              <Grid item xs={12} lg={5.75} xl={5.5} md={12} sm={12}>
                {/* <Paper sx={{ borderRadius: 1.25, display: 'flex', minWidth: '548px', mt: 1 }}> */}
                <Box sx={{ height: '100%', my: 'auto', width: '100%' }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography fontSize="24px" fontWeight={700} lineHeight="31px" color="primary">
                      Preview
                    </Typography>
                    {JSON.stringify(methods.getValues('chartData')) !== '{}' && (
                      <Button
                        onClick={() => {
                          if (methods.getValues('chartType') === 'Information Chart') {
                            refInputFileImage.current.click();
                          } else {
                            setOpenDialogColorPicker((prev) => !prev);
                          }
                        }}
                        variant="outlined"
                      >
                        {methods.getValues('chartType') === 'Information Chart' ? 'Change Image' : 'Change Colors'}
                      </Button>
                    )}
                  </Box>
                  {SettingContent}
                  {displayColorPicker && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '100px',
                        zIndex: '2',
                      }}
                    >
                      <Box
                        sx={{
                          bottom: '0px',
                          left: '0px',
                          position: 'fixed',
                          right: '0px',
                          top: '0px',
                        }}
                        onClick={handleClickCover}
                      />
                      <CustomColorPicker codeColor={codeColor} onChange={() => {}} />
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
            accept=".xlsx"
            // value={fileImport}
            onClick={(event) => {
              const { target = {} } = event || {};
              target.value = '';
            }}
            onChange={(e) => {
              setTypeDialog('loading');
              // setOpenDialogStatusImport((prev) => ({ ...prev, loading: true }));
              handleFileInputChange(e);
              parseFile(e.target.files[0]);
              setFileImport(e.target.files[0]);
              // setOpenDialogStatusImport((prev) => ({ ...prev, error: true }));
            }}
          />
          <input
            type="file"
            style={{ display: 'none' }}
            ref={refInputFileImage}
            accept=".png, .jpg, .svg"
            // value={fileImport}
            onClick={(event) => {
              const { target = {} } = event || {};
              target.value = '';
            }}
            onChange={(e) => {
              const urlImage = URL.createObjectURL(e.target.files[0]);
              methods.setValue('imageUrl', urlImage);
              methods.setValue('imageFile', e.target.files[0]);
              // setTypeDialog('loading');
              // setOpenDialogStatusImport((prev) => ({ ...prev, loading: true }));
              // handleFileInputChange(e);
              // parseFile(e.target.files[0]);
              // setFileImport(e.target.files[0]);
              // setOpenDialogStatusImport((prev) => ({ ...prev, error: true }));
            }}
          />
          <DialogColorPicker
            dataSets={
              methods.getValues('chartType') === 'Donut Chart' || methods.getValues('chartType') === 'Pie Chart'
                ? methods.getValues('chartDataDonutOrPie')?.datasets || []
                : methods.getValues('chartData')?.datasets || []
            }
            openDialog={openDialogColorPicker}
            onSaveChanges={(data) => {
              methods.setValue('chartData', { ...methods.getValues('chartData'), datasets: [...data] });
              setOpenDialogColorPicker((prev) => !prev);
            }}
            typeChart={methods.getValues('chartType')}
            onCancel={() => setOpenDialogColorPicker((prev) => !prev)}
          />
          <DialogStatusImport
            openDialogImport={openDialog}
            setOpenDialogImport={setOpenDialog}
            // contentText={'Choose your data import method:'
            typeDialog={typeDialog}
          />
          <DialogConfirmation
            open={openDialogDelete}
            setOpen={() => setOpenDialogDelete((prev) => !prev)}
            IconConfrim={() => <ErrorOutline />}
            cancelButonText="Cancel"
            confrimButtonText="Delete"
            header="Delete Chart"
            text="Are you sure you want to delete this chart?"
            typeButtonConfrim="error"
            onConfrimOk={handleDeleteChart}
          />
          <Paper
            sx={{ borderRadius: 1.25, display: 'flex', justifyContent: 'space-between', maxHeight: '105px', mt: 1 }}
          >
            {id && (
              <Box sx={{ my: 'auto', p: 4, width: '100%' }}>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    backgroundColor: '#E563630D',
                    maxWidth: '286px',
                    width: '100%',
                  }}
                  onClick={() => {
                    setChartId(id);
                    setOpenDialogDelete((prev) => !prev);
                  }}
                >
                  <Box display="flex" gap="8px" alignItems="center">
                    <DeleteFill />
                    <Typography sx={(theme) => ({ color: theme.palette.error.light })}>Delete Chart</Typography>
                  </Box>
                </Button>
              </Box>
            )}
            <Box
              sx={{ my: 'auto', p: 4, width: '100%' }}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap="16px"
            >
              {/* <Typography fontWeight={700} fontSize="18px" lineHeight="27px" color="primary">
            Create column?
          </Typography> */}

              <Button sx={{ maxWidth: '256px', width: '100%' }} variant="outlined" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              {clientSelected && (
                <Button
                  sx={{ maxWidth: '256px', width: '100%' }}
                  onClick={(_) => {
                    // submitChart();
                    methods.setValue('section_id', localStorage.sectionId);
                    methods.setValue('fileName', fileImport?.name);
                    // if (id && chartDetail?.tabular.filename !== fileImport?.name) {
                    // }
                    handleClick();
                  }}
                  disabled={JSON.stringify(methods?.getValues('chartData')) === '{}'}
                >
                  {id ? 'Save Changes' : 'Add Chart'}
                </Button>
              )}
            </Box>
          </Paper>
        </Stack>
      </AddOrEditChartContext.Provider>
    ),
    [store, methods.getValues()]
  );
  return renderMain;
};

export default AddChart;

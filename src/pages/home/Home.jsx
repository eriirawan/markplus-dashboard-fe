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
  ToggleButton,
  ToggleButtonGroup,
  styled,
  Popover,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { useState, createContext, useMemo, Fragment, useCallback, useEffect, useContext } from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import BarChart from '../../components/chart/BarChart';
import LineChart from '../../components/chart/LineChart';
import { BarData, LineData } from '../../helpers/DummyDataChart';
import { BarChartIcon, ChevronDownRed, DragIndicator, EditIcon, ExportFiles, Gear } from '../../helpers/Icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';
import DonutChart from '../../components/chart/DonutChart';
import PieChart from '../../components/chart/PieChart';
import DefaultImageInformationCard from '@/assets/images/default-image-infomation-card.png';
import TableChart from '../../components/chart/TableChart';
import AreaChart from '../../components/chart/AreaChart';
import { useHomeStore, HomeContext } from './HomeContext';
import { AppBarContext } from '@/context/AppBarContext';
import ModalLayout from './components/ModalLayout';
import Loading from '../../components/Loading';
import GeneralDeletePopup from '../../components/DeletePopup';
import html2canvas from 'html2canvas';
import pdfConverter from 'jspdf';
import * as XLSX from 'xlsx';

// import { useDashboard } from '../../hooks/useDashboard';

export const DashboardContext = createContext({});

const Home = () => {
  const store = useHomeStore();
  // const appBarStore = useStore();
  const location = useLocation();
  const appBarStore = useContext(AppBarContext);
  const appCtxStore = useContext(AppContext);
  const { clientSelected } = appBarStore;
  // const storeCallback = useMemo(() => {

  // })
  const {
    addSection,
    sectionList,
    sectionMetaList,
    setUserId,
    setSectionType,
    handleClick,
    setAction,
    openPopup,
    setOpenPopup,
    isLoading,
    loading,
    setSectionId,
    handleChangeAxis,
    chartSelectedId,
    reFetchSectionList,
    reFetch,
    sectionType,
  } = store;
  const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const { dashboardContent, setDashboardContent } = useDashboard();
  const [isFullChart, setIsFullChart] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState(null);
  // const { setDashboardContent, dashboardContent } = useDashboard();
  const [openPopupDelete, setOpenPopupDelete] = useState(false);

  const sizeLayoutData = [[12], [6, 6], [9, 3], [3, 9], [3, 3, 3, 3], [2.4, 2.4, 2.4, 2.4, 2.4]];

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
      case 2.4:
        return '20%';
    }
  };

  useEffect(() => {
    if (clientSelected?.id || appCtxStore?.clientSelected?.id) {
      setSectionType(location?.pathname?.slice(1));
      setUserId(clientSelected?.id || appCtxStore?.clientSelected?.id);
    }
  }, [clientSelected, appCtxStore?.clientSelected, location?.pathname?.slice(1)]);
  // useEffect(() => {
  //   reFetch({ test: 2 });
  // }, [store.userId, store.sectionType]);
  const renderChart = (data, indexParent, indexChild) => {
    const mappingDataChart = (data, type) => ({
      labels: [...data?.tabular?.labels],
      datasets:
        type === 'Pie Chart' || type === 'Donut Chart'
          ? data.tabular.datasets?.map((el, i) => {
              return {
                data: el.data,
                label: el.label,
                backgroundColor: data.colorway[el.label]?.backgroundColor,
                borderColor: data.colorway[el.label]?.borderColor,
                // data: data?.tabular?.datasets.reduce((flatArray, element) => {
                //   return flatArray.concat(element?.data);
                // }, []),
                // label: data?.tabular?.datasets[0].label,
                // backgroundColor: data?.colorway[data.tabular.labels[0]]?.backgroundColor,
                // borderColor: data?.colorway[data.tabular.labels[0]]?.borderColor,
              };
            })
          : data.tabular.datasets?.map((el, i) => {
              return {
                data: el.data,
                label: el.label,
                backgroundColor: data.colorway[el.label]?.backgroundColor,
                borderColor: data.colorway[el.label]?.borderColor,
                ...(type === 'Area Chart'
                  ? {
                      fill: {
                        target: 'origin', // 3. Set the fill options
                        above:
                          data.colorway[el.label]?.backgroundColor?.replace('1)', '0.3)') ||
                          data.colorway[el.label]?.backgroundColor,
                      },
                    }
                  : {}),
              };
            }),
    });
    switch (data.chart?.chart_type_name) {
      case 'Donut Chart': {
        return (
          <HeaderContainerChart
            data={data}
            // className={data?.chart?.chart_type_name+ '-'+data.chart.id}
            store={store}
            chartElement={
              <DonutChart
                className={data?.chart?.chart_type_name.replace(' ', '-') + '-' + data.chart.id}
                chartData={mappingDataChart(data.chart, data.chart.chart_type_name)}
                labelX={data?.chart.label_vertical}
                labelY={data?.chart?.label_horizontal}
                legendClassName={`legend-container-donut-${indexParent}${indexChild}`}
                options={{
                  maintainAspectRatio: false,
                }}
                layoutWidth={data?.layout}
              ></DonutChart>
            }
            indexContent={{ parent: indexParent, child: indexChild }}
          />
        );
      }
      case 'Pie Chart': {
        return (
          <HeaderContainerChart
            data={data}
            store={store}
            className={'container-chart' + data.chart.id}
            chartElement={
              <PieChart
                // className={'pie' + data.chart.id}
                className={data?.chart?.chart_type_name.replace(' ', '-') + '-' + data.chart.id}
                chartData={mappingDataChart(data.chart, data.chart.chart_type_name)}
                labelX={data?.chart.label_vertical}
                labelY={data?.chart?.label_horizontal}
                legendClassName={`legend-container-pie-${indexParent}${indexChild}`}
                options={{
                  maintainAspectRatio: false,
                }}
                // isWidth25={data.layout === 25 ? true : false}
                layoutWidth={data?.layout}
              ></PieChart>
            }
            indexContent={{ parent: indexParent, child: indexChild }}
          />
        );
      }
      case 'Line Chart': {
        return (
          <HeaderContainerChart
            useButtonGroupAxis={true}
            data={data}
            store={store}
            chartElement={
              <LineChart
                className={data?.chart?.chart_type_name.replace(' ', '-') + '-' + data.chart.id}
                chartData={mappingDataChart(data.chart, data.chart.chart_type_name)}
                labelX={data?.chart.label_vertical}
                labelY={data?.chart?.label_horizontal}
                legendClassName={`legend-container-line-${indexParent}${indexChild}`}
                options={{
                  maintainAspectRatio: false,
                }}
                showAxisValue={data?.chart?.show_axis_labels}
              ></LineChart>
            }
            indexContent={{ parent: indexParent, child: indexChild }}
          />
        );
      }
      case 'Bar Chart': {
        return (
          <HeaderContainerChart
            data={data}
            useButtonGroupAxis={true}
            store={store}
            chartElement={
              <BarChart
                className={data?.chart?.chart_type_name.replace(' ', '-') + '-' + data.chart.id}
                chartData={mappingDataChart(data.chart, data.chart.chart_type_name)}
                labelX={data?.chart.label_vertical}
                labelY={data?.chart?.label_horizontal}
                options={{
                  maintainAspectRatio: false,
                }}
                indexAxis={'y'}
                legendClassName={`legend-container-bar-chart-${indexParent}${indexChild}`}
                showAxisValue={data?.chart?.show_axis_labels}
              ></BarChart>
            }
            indexContent={{ parent: indexParent, child: indexChild }}
          />
        );
      }
      case 'Column Chart': {
        return (
          <HeaderContainerChart
            data={data}
            useButtonGroupAxis={true}
            store={store}
            chartElement={
              <BarChart
                className={data?.chart?.chart_type_name.replace(' ', '-') + '-' + data.chart.id}
                chartData={mappingDataChart(data.chart, data.chart.chart_type_name)}
                labelX={data?.chart.label_vertical}
                labelY={data?.chart?.label_horizontal}
                // chartData={data.chartData}
                options={{
                  maintainAspectRatio: false,
                }}
                // labelX={data.verticalAxisLabel}
                legendClassName={`legend-container-column-chart-${indexParent}${indexChild}`}
                // labelY={data.horizontalAxisLabel}
                showAxisValue={data?.chart?.show_axis_labels}
              ></BarChart>
            }
            indexContent={{ parent: indexParent, child: indexChild }}
          />
        );
      }
      case 'Stacked Chart': {
        return (
          <HeaderContainerChart
            data={data}
            store={store}
            useButtonGroupAxis={true}
            chartElement={
              <BarChart
                className={data?.chart?.chart_type_name.replace(' ', '-') + '-' + data.chart.id}
                chartData={mappingDataChart(data.chart, data.chart.chart_type_name)}
                labelX={data?.chart.label_vertical}
                labelY={data?.chart?.label_horizontal}
                // chartData={data.chartData}
                options={{
                  maintainAspectRatio: false,
                }}
                isStackedChart={true}
                // labelX={data.verticalAxisLabel}
                legendClassName={`legend-container-stacked-chart-${indexParent}${indexChild}`}
                // labelY={data.horizontalAxisLabel}
                showAxisValue={data?.chart?.show_axis_labels}
              ></BarChart>
            }
            indexContent={{ parent: indexParent, child: indexChild }}
          />
        );
      }
      case '100% Stacked Chart': {
        return (
          <HeaderContainerChart
            data={data}
            store={store}
            useButtonGroupAxis={true}
            chartElement={
              <BarChart
                className={data?.chart?.chart_type_name.replace(' ', '-') + '-' + data.chart.id}
                chartData={mappingDataChart(data.chart, data.chart.chart_type_name)}
                labelX={data?.chart.label_vertical}
                labelY={data?.chart?.label_horizontal}
                // chartData={data.chartData}
                options={{
                  maintainAspectRatio: false,
                }}
                isFullStackedChart={true}
                isStackedChart={true}
                // labelX={data.verticalAxisLabel}
                legendClassName={`legend-container-stacked-full-chart-${indexParent}${indexChild}`}
                // labelY={data.horizontalAxisLabel}
                showAxisValue={data?.chart?.show_axis_labels}
              ></BarChart>
            }
            indexContent={{ parent: indexParent, child: indexChild }}
          />
        );
      }
      case 'Table': {
        return (
          <HeaderContainerChart
            data={data}
            store={store}
            // useButtonGroupAxis={}
            chartElement={
              <TableChart
                chartData={data?.chart}
                className={data?.chart?.chart_type_name.replace(' ', '-') + '-' + data.chart.id}
              ></TableChart>
            }
            indexContent={{ parent: indexParent, child: indexChild }}
          />
          // <Paper
          //   sx={{
          //     borderRadius: 1.25,
          //     // display: 'flex',
          //     // maxHeight: '512px',
          //     // mt: 1,
          //     height: '100%',
          //     p: 4,
          //     width: '100%',
          //   }}
          // >
          //   <Box sx={{ my: 'auto', width: '100%' }}>
          //     <Stack direction="row" justifyContent={'space-between'} sx={{ marginBottom: '40px' }}>
          //       <Box display={'flex'} gap={'16px'} justifyContent="center" marginBottom={'24px'}>
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
          //           {data?.chart?.title}
          //         </Typography>
          //       </Box>
          //       <Box display={'flex'} gap="16px">
          //         <IconButton
          //           sx={(theme) => ({
          //             border: `1px solid ${theme.palette.primary.main}`,
          //             borderRadius: '4px',
          //           })}
          //         >
          //           <ExportFiles />
          //         </IconButton>
          //         <IconButton
          //           sx={(theme) => ({
          //             border: `1px solid ${theme.palette.primary.main}`,
          //             borderRadius: '4px',
          //           })}
          //           onClick={() => {
          //             localStorage.setItem('indexChart', `{parent: "${indexParent}", child: "${indexChild}"}`);
          //             navigate(`/home/edit-chart/${indexChild}`);
          //           }}
          //         >
          //           <EditIcon />
          //         </IconButton>
          //       </Box>
          //     </Stack>
          //     <TableChart chartData={data?.chart}></TableChart>
          //   </Box>
          // </Paper>
        );
      }
      case 'Area Chart': {
        return (
          <HeaderContainerChart
            data={data}
            store={store}
            useButtonGroupAxis={true}
            chartElement={
              <AreaChart
                className={data?.chart?.chart_type_name.replace(' ', '-') + '-' + data.chart.id}
                chartData={mappingDataChart(data.chart, data.chart.chart_type_name)}
                labelX={data?.chart.label_vertical}
                labelY={data?.chart?.label_horizontal}
                // chartData={data.chartData}
                // labelX={data.verticalAxisLabel}
                // labelY={data.horizontalAxisLabel}
                legendClassName={`legend-container-area-${indexParent}${indexChild}`}
                options={{
                  maintainAspectRatio: false,
                }}
                showAxisValue={data?.chart?.show_axis_labels}
                // labelX={data}
                // width={setWidthChart(index, data.chartType)}
                // height={309}

                isAreaChart={true}
              ></AreaChart>
            }
            indexContent={{ parent: indexParent, child: indexChild }}
          />
        );
      }
      case 'Information Chart': {
        return (
          <HeaderContainerChart
            data={data}
            store={store}
            // useButtonGroupAxis={true}
            chartElement={
              <Box
                sx={{ height: '100%' }}
                display="flex"
                justifyContent="center"
                className={data?.chart?.chart_type_name.replace(' ', '-') + '-' + data.chart.id}
              >
                <Box
                  display={'flex'}
                  sx={{
                    my: 'auto',
                    p: 3,
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    ...(data?.layout > 20
                      ? { minWidth: '280px', minHeight: '211px' }
                      : { minWidth: '230px', minHeight: '211px' }),

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
                        {data.chart?.title}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography fontSize={'36px'} fontWeight={400} lineHeight="47px">
                        {(
                          data.chart.tabular.datasets.flatMap((el) => el.data).reduce((a, b) => a + b, 0) /
                          data.chart.tabular.datasets.flatMap((el) => el.data).length
                        ).toFixed(2)}
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
                    <img src={data?.chart.image_url || DefaultImageInformationCard} width={40} />
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
            }
            indexContent={{ parent: indexParent, child: indexChild }}
          />
        );
      }
      default:
    }
  };
  const getGridNumber = (data) => {
    switch (data) {
      case 100:
        return 12;
      case 75:
        return 9;
      case 50:
        return 6;
      case 25:
        return 3;
      case 20:
        return 2.4;
    }
  };
  // const renderDashboard = useMemo(() => {
  //   return (

  //   );
  // }, [store]);
  const onSaveLayoutOption = async () => {
    const payload = {
      sections: sizeLayoutData[selectedLayout]?.map((data) => ({
        layout: +getTextLayout(data)?.slice(0, -1),
      })),
      section_type: location?.pathname?.slice(1),
      user_id: clientSelected?.id,
    };
    handleClick(payload);
  };
  return (
    <HomeContext.Provider value={store}>
      <Loading open={loading || isLoading} />
      <GeneralDeletePopup
        open={openPopupDelete}
        handleCancel={() => setOpenPopupDelete(false)}
        handleSave={() => handleClick({ hide: true }, setOpenPopupDelete)}
        title="Confirm Delete?"
        message="Are you sure you want to delete this section?"
      />
      <Stack
        direction={'column'}
        sx={{
          height: '100vh',
          // overflow: 'auto',
          // position: 'fixed',
          width: '100%',
        }}
      >
        {/* {renderDashboard} */}
        <Stack direction="column" gap="20px">
          {sectionList?.map((data, index) => {
            return (
              <Grid container gap={'20px'} flexWrap={'nowrap'}>
                {data.map((el, indexChild) => {
                  return (
                    <Grid
                      item
                      xl={getGridNumber(el.layout)}
                      lg={getGridNumber(el.layout)}
                      sx={{
                        border: (theme) =>
                          JSON.stringify(el.chart) === '{}'
                            ? !el.hide
                              ? `3px dashed ${theme.palette.primary.main}`
                              : 0
                            : 0,
                        width: getTextLayout(el),
                        ...(JSON.stringify(el.chart) === '{}'
                          ? {
                              minHeight: '434px',
                              height: '100%',
                            }
                          : {}),
                      }}
                      // display={'flex'}
                      // justifyContent={'center'}
                      // alignItems={'center'}
                      // flexDirection={'column'}
                      gap="24px"
                    >
                      {JSON.stringify(el.chart) === '{}' ? (
                        !el?.hide && !appCtxStore?.isUserRole ? (
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
                                localStorage.setItem('sectionId', el.id);
                                localStorage.setItem('optionChart', el.layout + '%');
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
                                sx={{ textDecoration: 'underline', color: '#E56363', cursor: 'pointer' }}
                                onClick={() => {
                                  setAction('update');
                                  setSectionId(el.id);
                                  // setSectionType('')
                                  setOpenPopupDelete(true);
                                }}
                              >
                                delete this section
                              </Typography>
                            </Box>
                          </Box>
                        ) : (
                          <Box
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            sx={{ height: '100%' }}
                          >
                            <Typography>No chart created yet.</Typography>
                          </Box>
                        )
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
        <ModalLayout
          isLayoutModalOpen={openPopup}
          selectedLayout={selectedLayout}
          setSelectedLayout={setSelectedLayout}
          sizeLayoutData={sizeLayoutData}
          setIsLayoutModalOpen={setOpenPopup}
          getTextLayout={getTextLayout}
          onSave={onSaveLayoutOption}
        />
        {!clientSelected && !appCtxStore?.isUserRole && (
          <Stack
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'100%'}
            gap={'24px'}
            // maxWidth={'265px'}
          >
            <Box maxWidth={'265px'}>
              <Typography
                fontSize="16px"
                fontWeight={400}
                lineHeight={'24px'}
                textAlign={'center'}
                marginBottom={'24px'}
              >
                You haven't selected a client yet, select one to see the chart.
              </Typography>
              <Button fullWidth color={'primary'} onClick={() => appBarStore.setOpenPopupClient(true)}>
                Choose Client
              </Button>
            </Box>
          </Stack>
        )}
        {!sectionList?.length && (clientSelected || appCtxStore?.clientSelected) && (
          <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} height={'100%'} gap={'8px'}>
            <Typography fontSize="16px" fontWeight={400} lineHeight={'24px'}>
              No chart created yet.
            </Typography>
            {!appCtxStore?.isUserRole && (
              <Button
                color={'primary'}
                onClick={() => {
                  setAction('create');
                  setOpenPopup(true);
                }}
              >
                Create Chart
              </Button>
            )}
          </Stack>
        )}
        {sectionList?.length && !appCtxStore?.isUserRole ? (
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
              sx={{ height: '434px', width: '100%', border: (theme) => `3px dashed ${theme.palette.primary.main}` }}
            >
              <Button
                variant="outlined"
                // sx={{ borderColor: '#7E3399', color: '#7E3399', '&:hover': { borderColor: '#7E3399' } }}
                onClick={() => {
                  setAction('create');
                  setOpenPopup((prev) => !prev);
                }}
              >
                Add New Section
              </Button>
            </Box>
          </Paper>
        ) : null}
      </Stack>
      {/* </AppBarContext.Provider> */}
    </HomeContext.Provider>
  );
  // }, [renderChart, store, sectionList]);

  // return renderMain;
  // }, [store, renderDashboard, HomeContext, useHomeStore]);
  // return renderMain;
};
const HeaderContainerChart = ({ data, chartElement, indexContent, store, useButtonGroupAxis = false, className }) => {
  const { dashboardContent, setDashboardContent } = useDashboard();
  const [anchorElDownload, setAnchorElDownload] = useState(false);
  const { clientSelected } = useContext(AppBarContext);
  const navigate = useNavigate();
  const { handleChangeAxis } = store;
  const MuiCustomToggleButton = styled(ToggleButton)(({ theme }) => ({
    textTransform: 'none',
    '&.Mui-selected': {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
    },
    '&.Mui-selected:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }));
  const [showAxisValue, setShowAxisValue] = useState(
    // dashboardContent[indexContent?.parent][indexContent?.child]?.showAxisValue
    false
  );
  const handleDownload = async (type, data, e) => {
    const downloadChartPdf = (isAll) => {
      if (isAll) {
        store.setIsLoading(true);
      }
      const but = e.target;
      but.style.display = 'none';
      let input = window.document.getElementsByClassName(
        data.chart.chart_type_name.replace(' ', '-') + '-' + data.chart.id
      )[0];

      html2canvas(input).then((canvas) => {
        // const imgData = canvas.toDataURL('image/png');
        const img = canvas.toDataURL('image/png');
        const pdf = new pdfConverter('p', 'px', 'a4');
        const imgProps = pdf.getImageProperties(img);
        const pdfWidth = data.layout > 25 ? pdf.internal.pageSize.getWidth() : input.clientWidth;
        const pdfHeight = data.layout > 25 ? (imgProps.height * pdfWidth) / imgProps.width : input.clientHeight;

        pdf.addImage(img, 'png', 0, 10, pdfWidth, pdfHeight);
        pdf.save(clientSelected?.company_name + ' - ' + data?.chart?.title + '.pdf');
        but.style.display = 'block';
        store.setIsLoading(false);
        if (isAll) {
          downloadChartExcel(isAll);
        }
      });
    };
    const downloadChartExcel = (isAll) => {
      if (isAll) {
        store.setIsLoading(true);
      }
      const mapData = data.chart?.tabular?.labels?.map((el) => ({ test: el }));
      data.chart?.tabular?.datasets?.forEach((element) => {
        element.data.forEach((el, i) => {
          mapData[i][element.label] = el;
        });
      });
      let header = ['', ...data.chart?.tabular?.datasets?.map((el) => el.label)];
      const ws = XLSX.utils.book_new();
      XLSX.utils.sheet_add_aoa(ws, [header]);
      XLSX.utils.sheet_add_json(ws, mapData, { origin: 'A2', skipHeader: true });
      const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
      const finalData = new Blob([excelBuffer], { type: '.xlsx' });
      const filename = clientSelected?.company_name + ' - ' + data?.chart?.title + '.xlsx';
      let url = window.URL.createObjectURL(finalData);
      let a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      a.remove();
      store.setIsLoading(false);
    };
    if (type === 'pdf') {
      downloadChartPdf();
    } else if (type === 'excel') {
      downloadChartExcel();
    } else {
      downloadChartPdf('all');
      // downloadChartExcel('all');
    }
  };
  const handleChangeShowAxisValue = (_, value) => {
    const newContent = [...dashboardContent];
    newContent[indexContent?.parent][indexContent?.child] = {
      ...newContent[indexContent?.parent][indexContent?.child],
      showAxisValue: value,
    };
    setDashboardContent(newContent);
    setShowAxisValue(value);
  };
  // const openPopoverBool =
  // useEffect(() => {
  // }, [store?.sectionList]);
  const optionMenuDownload = [
    { value: 'pdf', title: 'Download as Pdf' },
    { value: 'excel', title: 'Download as Excel' },
    { value: 'all', title: 'Download All Format' },
  ];
  // const BlueOnGreenTooltip = withStyles({
  //   tooltip: {
  //     color: 'white',
  //     backgroundColor: 'primary.main',
  //   },
  // })(Tooltip);
  return (
    <Paper
      key={location?.pathname?.slice(1)}
      sx={{
        borderRadius: 1.25,
        p: 4,
        height: '100%',
      }}
      // key={sectionType}
      // className={className}
    >
      <Box display={'flex'} gap={'16px'} justifyContent="space-between" marginBottom={'24px'}>
        <Box>
          <Typography color={'primary'} fontSize={24} fontWeight="700" lineHeight="31px">
            {data?.chart?.title}
          </Typography>
          <Typography color={'primary'} fontSize={16} fontWeight="500" lineHeight="24px">
            {data?.chart?.sub_title}
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'} gap="16px">
          {useButtonGroupAxis && (
            <ToggleButtonGroup
              value={data?.chart?.show_axis_labels}
              onMouseEnter={() => {}}
              onChange={(_, value) => {
                // store.setChartSelectedId(data?.chart?.id);
                if (typeof value === 'boolean' && value !== data?.chart?.show_axis_labels) {
                  store.setUserId(data?.user_id);
                  store.setSectionType(location.pathname.slice(1));
                  handleChangeAxis({
                    show_axis_labels: !data?.chart?.show_axis_labels,
                    user_id: data?.user_id,
                    chart_id: data?.chart?.id,
                    chart_type_id: data?.chart?.chart_id,
                  });
                }
              }}
              sx={{
                maxHeight: '36px',
              }}
              color="primary"
              exclusive
            >
              <MuiCustomToggleButton value={true}>
                <Typography color={data?.chart?.show_axis_labels ? 'white' : 'primary'}>Show Axis</Typography>
              </MuiCustomToggleButton>
              <MuiCustomToggleButton value={false}>
                <Typography color={!data?.chart?.show_axis_labels ? 'white' : 'primary'}>Hide Axis</Typography>
              </MuiCustomToggleButton>
            </ToggleButtonGroup>
          )}
          <Box>
            <Tooltip
              title="Download"
              sx={(theme) => ({ background: theme.palette.primary.main, color: 'white' })}
              arrow
            >
              <IconButton
                sx={(theme) => ({
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '4px',
                })}
                aria-describedby={'popover-download'}
                onClick={(e) => setAnchorElDownload(e.currentTarget)}
              >
                <ExportFiles />
              </IconButton>
            </Tooltip>
            <Popover
              id={'popover-download'}
              open={Boolean(anchorElDownload)}
              anchorEl={anchorElDownload}
              onClose={() => setAnchorElDownload(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{
                marginTop: '6px',
                '&.MuiPopover-paper': {
                  borderRadius: '10px',
                },
              }}
              PaperProps={{ style: { borderRadius: '10px' } }}
            >
              <Box
                sx={(theme) => ({
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '10px',
                  maxWidth: '248px',
                })}
              >
                {optionMenuDownload.map((el, i) => {
                  return (
                    <MenuItem
                      // onMouseEnter={(e) => (e.target.style.background = 'primary.main')}
                      // onMouseLeave={(e) => (e.target.style.background = '#ffffff')}
                      sx={(theme) => ({
                        '&:hover': {
                          backgroundColor: theme.palette.primary.light,
                          ...(i === 0 ? { borderRadius: '10px 10px 0 0' } : {}),
                          ...(i === 2 ? { borderRadius: '0px 0px 10px 10px' } : {}),
                        },
                        width: '100%',
                        display: 'inline-flex',
                      })}
                      key={i}
                      onClick={(e) => {
                        setAnchorElDownload(null);
                        if (el.value !== 'all') store.setIsLoading(true);
                        handleDownload(el.value, data, e);
                      }}
                    >
                      {el?.title}
                    </MenuItem>
                  );
                })}
              </Box>
            </Popover>
          </Box>
          <Box>
            <Tooltip
              title="Edit"
              sx={(theme) => ({ backgroundColor: theme.palette.primary.main, color: 'white' })}
              arrow
            >
              <IconButton
                onClick={() => {
                  localStorage.setItem(
                    'indexChart',
                    `{parent: "${indexContent.parent}", child: "${indexContent.child}"}`
                  );
                  navigate(`/home/edit-chart/${data?.chart?.id}`);
                }}
                sx={(theme) => ({
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '4px',
                })}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      {/* <chartElement /> */}
      {chartElement}
    </Paper>
  );
};
export default Home;

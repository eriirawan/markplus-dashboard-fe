import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Grid, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AppContext } from '@/context/AppContext';
import useDashboard from './hooks/useDashboard';
import { useHomeStore, HomeContext } from './HomeContext';
import { BarChartIcon } from '../../helpers/Icons';
// Using relative path to assets folder
import ModalLayout from './components/ModalLayout';
import Loading from '../../components/Loading';
import GeneralDeletePopup from '../../components/DeletePopup';
import ClientSelector from './components/ClientSelector';
import DashboardGrid from './components/DashboardGrid';
import EmptyDashboard from './components/EmptyDashboard';

export const DashboardContext = React.createContext({});

const Home = () => {
  const store = useHomeStore();
  // const appBarStore = useStore();
  const location = useLocation();
  const appCtxStore = useContext(AppContext);
  const { clientSelected } = appCtxStore;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const storeCallback = useMemo(() => {

  // })
  const {
    sectionList,
    setUserId,
    setSectionType,
    handleClick,
    setAction,
    openPopup,
    setOpenPopup,
    isLoading,
    loading,
    setSectionId,
  } = store;
  const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const { dashboardContent, setDashboardContent } = useDashboard();
  const [isFullChart, setIsFullChart] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState(null);
  // const { setDashboardContent, dashboardContent } = useDashboard();
  const [openPopupDelete, setOpenPopupDelete] = useState(false);
  const [clientName, setClientName] = useState('');

  const sizeLayoutData = [[12], [6, 6], [9, 3], [3, 9], [3, 3, 3, 3], [2.4, 2.4, 2.4, 2.4, 2.4]];

  // Mobile-specific styles

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
      default:
        return '100%';
    }
  };

  useEffect(() => {
    if (clientSelected?.id || appCtxStore?.clientSelected?.id || isUserRole) {
      setSectionType(location?.pathname?.slice(1));
      setUserId(clientSelected?.id || appCtxStore?.clientSelected?.id || me?.id);
    }
  }, [clientSelected, appCtxStore?.clientSelected, location?.pathname?.slice(1)]);

  // useEffect(() => {
  //   reFetch({ test: 2 });
  // }, [store.userId, store.sectionType]);
  const getGridNumber = (data) => {
    if (isMobile) {
      return 12;
    }
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
      default:
        return 12;
    }
  };
  // const renderDashboard = useMemo(() => {
  //   return (

  //   );
  // }, [store]);
  const onSaveLayoutOption = async () => {
    const payload = {
      section_type: location?.pathname?.slice(1),
      sections: sizeLayoutData[selectedLayout]?.map((data) => ({
        // eslint-disable-next-line no-unsafe-optional-chaining
        layout: +getTextLayout(data)?.slice(0, -1),
      })),
      user_id: clientSelected?.id,
    };
    handleClick(payload);
  };

  const handleClientChange = (event) => {
    const selectedClientId = event.target.value;
    const selectedClient = appCtxStore.clientList.find((client) => client.id === selectedClientId);
    if (selectedClient) {
      appCtxStore.setClientSelected(selectedClient);
      setClientName(selectedClient.company_name);
    }
  };

  return appCtxStore?.isMobile ? (
    <ClientSelector
      clients={appCtxStore?.clientList}
      selectedClient={clientSelected?.id}
      handleClientChange={handleClientChange}
    />
  ) : (
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
        direction="column"
        sx={{
          height: '100vh',
          width: '100%',
        }}
      >
        {/* {renderDashboard} */}
        <Stack direction="column" gap="20px">
          {sectionList?.map((data, index) => {
            // Filter out hidden charts and prepare charts for DashboardGrid
            const visibleCharts = data
              .filter((el) => !el.hide && JSON.stringify(el.chart) !== '{}')
              .map((el, indexChild) => ({
                ...el,
                data: el.chart,
                id: el.chart?.id || `chart-${index}-${indexChild}`,
                indexContent: { child: indexChild, parent: index },
                title: el.chart?.title,
                type: el.chart?.chart_type_name,
              }));

            // Empty sections that can be filled with charts
            const emptySections = data
              .filter((el) => JSON.stringify(el.chart) === '{}')
              .map((el, indexChild) => ({
                ...el,
                indexChild,
                isEmpty: true,
                parentIndex: index,
              }));

            return visibleCharts.length > 0 ? (
              <DashboardGrid charts={visibleCharts} key={`section-${index}`} />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  gap: '20px',
                  flexWrap: {
                    md: 'nowrap',
                    sm: 'wrap',
                    xs: 'wrap',
                  },
                }}
                key={`empty-section-${index}`}
              >
                {emptySections.map((el, indexChild) => (
                  <Box
                    sx={{
                      border: (theme) =>
                        !el.hide || (data.some((e) => !e.hide) && el.hide)
                          ? `3px dashed ${theme.palette.primary.main}`
                          : 0,
                      height: '100%',
                      minHeight: '434px',
                      width: getTextLayout(el),
                      flexBasis: {
                        md: '100%',
                        xs: '100%',
                        xl: `${(getGridNumber(el.layout) * 100) / 12}%`,
                        lg: `${(getGridNumber(el.layout) * 100) / 12}%`,
                        sm: '100%',
                      },
                      gap: '24px',
                    }}
                    key={`empty-chart-${index}-${indexChild}`}
                  >
                    {(!el?.hide && !appCtxStore?.isUserRole) ||
                    (data.some((e) => !e.hide) && !appCtxStore?.isUserRole) ? (
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ height: '100%' }}
                      >
                        <Button
                          onClick={() => {
                            localStorage.setItem('indexChart', `{parent: "${index}", child: "${indexChild}"}`);
                            localStorage.setItem('sectionId', el.id);
                            localStorage.setItem('optionChart', `${el.layout}%`);
                            navigate('add-chart');
                          }}
                        >
                          <BarChartIcon />
                          <Typography fontWeight={400} fontSize="14px" lineHeight="21px" color="white">
                            Add Chart
                          </Typography>
                        </Button>
                        {!el.hide && (
                          <Box display="flex" gap="4px">
                            <Typography fontWeight={400} fontSize="12px" lineHeight="18px">
                              or{' '}
                            </Typography>
                            <Typography
                              fontWeight={400}
                              fontSize="12px"
                              lineHeight="18px"
                              sx={{ color: '#E56363', cursor: 'pointer', textDecoration: 'underline' }}
                              onClick={() => {
                                setAction('update');
                                setSectionId(el.id);
                                setOpenPopupDelete(true);
                              }}
                            >
                              delete this section
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ height: '100%' }}
                      >
                        <Typography>No chart created yet.</Typography>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            );
          })}
        </Stack>
        <ModalLayout
          isLayoutModalOpen={openPopup}
          setIsLayoutModalOpen={setOpenPopup}
          sizeLayoutData={sizeLayoutData}
          selectedLayout={selectedLayout}
          setSelectedLayout={setSelectedLayout}
          getTextLayout={getTextLayout}
          onSave={onSaveLayoutOption}
        />
        {!clientSelected && !isMobile && !appCtxStore?.isUserRole && (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
            gap="24px"
            // maxWidth={'265px'}
          >
            <Box maxWidth="265px">
              <Typography fontSize="16px" fontWeight={400} lineHeight="24px" textAlign="center" marginBottom="24px">
                You haven't selected a client yet, select one to see the chart.
              </Typography>
              <Button fullWidth color="primary" onClick={() => appCtxStore.setOpenPopupClient(true)}>
                Choose Client
              </Button>
            </Box>
          </Stack>
        )}
        {!sectionList?.length && (clientSelected || appCtxStore?.clientSelected) && (
          <EmptyDashboard
            handleAddChart={() => {
              setAction('create');
              setOpenPopup(true);
            }}
          />
        )}
        {!isMobile && sectionList?.length && !appCtxStore?.isUserRole ? (
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
              sx={{ border: (theme) => `3px dashed ${theme.palette.primary.main}`, height: '434px', width: '100%' }}
            >
              <Button
                variant="outlined"
                // sx={{ borderColor: '#7E3399', color: '#7E3399', '&:hover': { borderColor: '#7E3399' } }}
                onClick={() => {
                  setAction('create');
                  if (isMobile) {
                    /* empty */
                  }
                  setOpenPopup((prev) => !prev);
                }}
              >
                {isMobile ? 'Add Chart' : 'Add New Section'}
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
export default Home;

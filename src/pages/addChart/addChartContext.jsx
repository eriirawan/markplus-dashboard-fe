import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from 'axios-hooks';
import { enqueueSnackbar } from 'notistack';
import { AppBarContext } from '@/context/AppBarContext';
import { useNavigate } from 'react-router-dom';
export const useAddOrEditChartStore = () => {
  const navigate = useNavigate();
  const appBarStore = useContext(AppBarContext);
  const { clientSelected } = appBarStore;
  const [isLoading, setIsLoading] = useState(false);
  // popup notif flag
  const [typeDialog, setTypeDialog] = useState('loading');
  const [openDialog, setOpenDialog] = useState({
    loading: false,
    success: false,
    error: false,
    confrimDeleteImportData: false,
    confrimDeleteChartData: false,
  });
  // snackbar flag
  const [openPopup, setOpenPopup] = useState(false);
  const [action, setAction] = useState('');
  const [userId, setUserId] = useState(null);
  const [sectionType, setSectionType] = useState(null);
  const [chartId, setChartId] = useState(null);
  // const [sortDir, setSortDir] = useState('DESC');
  // const [sortBy, setSortBy] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sectionId, setSectionId] = useState(null);
  // const [search, setSearch] = useState('');
  const [{ data: response, loading }, reFetch] = useAxios(
    {
      url: `/dashboard/v1/charts/user/${userId}/${chartId}`,
      method: 'get',
    },
    {
      manual: !userId || !chartId,
    }
  );
  const [{ data: responseChartTypeList, loading: loadingChartTypeList }] = useAxios({
    url: `/dashboard/v1/chart-types/list?page=1&page_size=10&sort_by=id&sort_dir=ASC`,
    method: 'get',
  });
  // const [{ response: userDetail, loading: loadingUser }] = useAxios({
  //   url: `/dashboard/v1/users/${userId}`,
  //   method: 'get',
  //   pause: !userId,
  // });

  const [, addChart] = useAxios(
    {
      url: `/dashboard/v1/charts/add`,
      method: 'post',
      options: {},
    },
    {
      manual: true,
    }
  );
  const [, updateChartTabular] = useAxios(
    {
      url: `/dashboard/v1/charts/tabular/update`,
      method: 'put',
    },
    {
      manual: true,
    }
  );
  const [, updateChart] = useAxios(
    {
      url: `/dashboard/v1/charts/update`,
      method: 'put',
    },
    {
      manual: true,
    }
  );
  const [, parseFile] = useAxios(
    {
      url: `/dashboard/v1/charts/parse-sheets`,
      method: 'post',
      options: {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    },
    {
      manual: true,
    }
  );
  const [, deleteChart] = useAxios(
    {
      url: `/dashboard/v1/charts/user/${userId}/${chartId}`,
      method: 'delete',
    },
    {
      manual: true,
    }
  );

  const defaultForm = {
    chartType: '',
    chartLabel: '',
    chartData: {},
    verticalAxisLabel: '',
    horizontalAxisLabel: '',
    showAxisLabels: true,
    chartDataDonutOrPie: {},
  };

  const methods = useForm({
    defaultValues: { ...defaultForm },
    mode: 'onChange',
  });

  const handleFileInputChange = async (e) => {
    setOpenDialog((prev) => ({ ...prev, loading: true }));
    const bodyFormData = new FormData();
    bodyFormData.append('file', e.target.files[0]);
    const { data, status } = await parseFile({ data: bodyFormData });
    const colorTheme = Object.values(clientSelected?.colorway)?.filter((el) => el.includes('#'));
    let indexColorTheme = 0;
    if (status === 200) {
      const mappingDataChart = {
        labels: data.data.labels,
        datasets: data.data.datasets?.map((el, i) => {
          const newData = {
            ...el,
            backgroundColor: colorTheme[indexColorTheme],
            borderColor: colorTheme[indexColorTheme],
          };
          if (indexColorTheme >= data.data.datasets.length - 1) {
            indexColorTheme = 0;
          } else {
            indexColorTheme += 1;
          }
          return {
            ...newData,
          };
        }),
      };
      const mappingDataDonutOrPieChart = {
        labels: data.data.labels,
        datasets: data.data.datasets?.map((el, i) => {
          const newData = {
            ...el,
            backgroundColor: colorTheme.slice(0, el?.data?.length),
            borderColor: colorTheme.slice(0, el?.data?.length),
          };
          return {
            ...newData,
          };
        }),
      };
      methods.setValue('chartDataDonutOrPie', mappingDataDonutOrPieChart);
      methods.setValue('chartData', mappingDataChart);
      setOpenDialog((prev) => ({ ...prev, loading: false }));
      setTypeDialog('success');
      setOpenDialog((prev) => ({ ...prev, success: true }));
      setIsLoading(false);
    }
  };

  const onSubmit = async (formData, cb) => {
    setIsLoading(true);
    if (action === 'create') {
      const colorway = {};
      if (formData.chartType === 'Pie Chart' || formData.chartType === 'Donut Chart') {
        formData.chartDataDonutOrPie.datasets.forEach((el) => {
          if (!colorway[el.label]) {
            colorway[el.label] = {
              backgroundColor: el.backgroundColor,
              borderColor: el.borderColor,
            };
          }
        });
      } else {
        formData.chartData.datasets.forEach((el) => {
          if (!colorway[el.label]) {
            colorway[el.label] = {
              backgroundColor: el.backgroundColor,
              borderColor: el.borderColor,
            };
          }
        });
      }
      const payloadChart = {
        user_id: userId,
        section_id: +formData.section_id,
        title: formData.chartLabel,
        chart_type_id: formData.chartTypeId,
        label_vertical: formData.verticalAxisLabel || 'null',
        label_horizontal: formData.horizontalAxisLabel || 'null',
        colorway: {
          ...colorway,
        },
        tabular: {
          filename: formData.fileName,
          labels: [...formData.chartData.labels],
          datasets: formData.chartData.datasets.map((chart) => ({ data: chart.data, label: chart.label })),
        },
      };

      const submit = await addChart({
        data: {
          ...payloadChart,
        },
      });
      if (submit?.status === 200) {
        setOpenPopup(false);
        enqueueSnackbar('Chart added successfully.', {
          variant: 'successSnackbar',
        });
        // reFetch();
        navigate('/home');
      }
    } else if (action === 'update') {
      const colorway = {};
      if (formData.chartType === 'Pie Chart' || formData.chartType === 'Donut Chart') {
        formData.chartDataDonutOrPie.datasets.forEach((el) => {
          if (!colorway[el.label]) {
            colorway[el.label] = {
              backgroundColor: el.backgroundColor,
              borderColor: el.borderColor,
            };
          }
        });
      } else {
        formData.chartData.datasets.forEach((el) => {
          if (!colorway[el.label]) {
            colorway[el.label] = {
              backgroundColor: el.backgroundColor,
              borderColor: el.borderColor,
            };
          }
        });
      }

      const payloadChart = {
        title: formData.chartLabel,
        chart_type_id: formData.chartTypeId,
        label_vertical: formData.verticalAxisLabel,
        label_horizontal: formData.horizontalAxisLabel,
        show_axis_labels: formData.showAxisLabels,
        colorway: colorway,
      };
      const payloadChartTabular = {
        tabular: {
          filename: formData.fileName,
          labels: [...formData.chartData.labels],
          datasets: formData.chartData.datasets.map((chart) => ({ label: chart.label, data: chart.data })),
        },
      };
      const dataDetail = await response;
      const update = await updateChart({
        data: {
          ...payloadChart,
          user_id: userId,
          chart_id: chartId,
        },
      });

      if (update?.status === 200) {
        // if file change or tabular change
        if (dataDetail.status === 200) {
          if (
            JSON.stringify(dataDetail?.data?.tabular?.datasets) !==
            JSON.stringify(payloadChartTabular?.tabular?.datasets)
          ) {
            const updateTabular = await updateChartTabular({
              data: {
                ...payloadChartTabular,
                user_id: userId,
                chart_id: chartId,
              },
            });
            if (updateTabular?.status === 200) {
              enqueueSnackbar('Chart updated successfully.', {
                variant: 'successSnackbar',
              });
              navigate('/home');
            }
          } else {
            enqueueSnackbar('Chart updated successfully.', {
              variant: 'successSnackbar',
            });
            navigate('/home');
          }
        }
      }
    }
    setIsLoading(false);
  };

  const handleClick = (cb) => {
    methods.handleSubmit(onSubmit)();
  };

  const handleDelete = async (cb) => {
    const deleteAct = await deleteChart();
    if (deleteAct.status === 200) {
      enqueueSnackbar('Chart deleted successfully.', {
        variant: 'successSnackbar',
      });
      cb(false);
      navigate('/home');
    }
  };

  return {
    methods,
    handleFileInputChange,
    handleClick,
    openDialog,
    setOpenDialog,

    openPopup,
    action,
    setAction,
    setOpenPopup,
    isLoading,
    setUserId,

    chartDetail: response?.data,
    chartDetailMetaList: response?.meta,

    page,
    pageSize,
    setPage,
    setPageSize,

    setSectionType,
    setSectionId,

    loading,

    typeDialog,
    setTypeDialog,
    optionChartTypes: responseChartTypeList?.data || [],
    setChartId,
    userId,
    handleDelete,
  };
};

export const AddOrEditChartContext = React.createContext({});

import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '@/hooks/useAxios';
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
  // console.info(chartId, userId, '<<< aiueoioooooo');
  const [{ response, loading }, reFetch] = useAxios({
    url: `/dashboard/v1/charts/user/${userId}/${chartId}`,
    method: 'get',
    pause: !userId || !chartId,
  });
  const [{ response: responseChartTypeList, loading: loadingChartTypeList }] = useAxios({
    url: `/dashboard/v1/chart-types/list?page=1&page_size=10&sort_by=id&sort_dir=ASC`,
    method: 'get',
  });
  // const [{ response: userDetail, loading: loadingUser }] = useAxios({
  //   url: `/dashboard/v1/users/${userId}`,
  //   method: 'get',
  //   pause: !userId,
  // });

  const [, addChart] = useAxios({
    url: `/dashboard/v1/charts/add`,
    method: 'post',
    options: {
      // headers: {
      //   'Content-Type': 'appl',
      // },
    },
  });
  // const [, addUser] = useAxios({
  //   url: `/dashboard/v1/users/add`,
  //   method: 'post',
  // });
  const [, updateChartTabular] = useAxios({
    url: `/dashboard/v1/charts/user/${userId}/${chartId}/tabular`,
    method: 'put',
  });
  const [, updateChart] = useAxios({
    url: `/dashboard/v1/charts/user/${userId}/${chartId}`,
    method: 'put',
  });
  const [, parseFile] = useAxios({
    url: `/dashboard/v1/charts/parse-sheets`,
    method: 'post',
    options: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  });
  // const [, deleteUser] = useAxios({
  //   url: `/dashboard/v1/users/${userId}`,
  //   method: 'delete',
  // });

  const defaultForm = {
    chartType: '',
    chartLabel: '',
    chartData: {},
    verticalAxisLabel: '',
    horizontalAxisLabel: '',
    showAxisLabels: true,
  };

  const methods = useForm({
    defaultValues: { ...defaultForm },
    mode: 'onChange',
  });

  const handleFileInputChange = async (e) => {
    console.info(e, '<<<< event');
    // setIsLoading(true);
    setOpenDialog((prev) => ({ ...prev, loading: true }));
    const bodyFormData = new FormData();
    bodyFormData.append('file', e.target.files[0]);
    const data = await parseFile(bodyFormData);
    const colorTheme = Object.values(clientSelected?.colorway)?.slice(1);
    let indexColorTheme = 0;
    console.info(Object.values(clientSelected?.colorway).slice(1), '<<< object valuess');
    if (data?.status === 200) {
      const mappingChartColorDefault = {
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

      // data.data?.dataset.map((el) => {
      //   return {
      //     ...el,
      //     datasets: el.dataset?.map((data, i) => {
      //       const newData = { ...data, backgroundColor: colorTheme[indexColorTheme] };
      //       indexColorTheme++;
      //       if (indexColorTheme >= el.dataset.length - 1) {
      //         indexColorTheme = 0;
      //       }
      //       return {
      //         ...newData,
      //       };
      //     }),
      //   };
      // });
      console.info(mappingChartColorDefault, '<<<< colorDefault');
      methods.setValue('chartData', mappingChartColorDefault);
      setOpenDialog((prev) => ({ ...prev, loading: false }));
      setTypeDialog('success');
      setOpenDialog((prev) => ({ ...prev, success: true }));
      // methods.setValue('filename', data.data.filename);
      setIsLoading(false);
    }
  };

  const onSubmit = async (formData, cb) => {
    setIsLoading(true);
    console.info(formData, cb, '<<<< cb');
    if (action === 'create') {
      const colorway = {};
      formData.chartData.datasets.forEach((el) => {
        if (!colorway[el.label]) {
          colorway[el.label] = {
            backgroundColor: el.backgroundColor,
            borderColor: el.borderColor,
          };
        }
      });
      const payloadChart = {
        user_id: userId,
        section_id: formData.section_id,
        title: formData.chartLabel,
        chart_type_id: formData.chartTypeId,
        label_vertical: formData.verticalAxisLabel,
        label_horizontal: formData.horizontalAxisLabel,
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
        ...payloadChart,
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
      console.info('masuk sini', formData, '<<< apa');
      const colorway = {};
      formData.chartData.datasets.forEach((el) => {
        if (!colorway[el.label]) {
          colorway[el.label] = {
            backgroundColor: el.backgroundColor,
            borderColor: el.borderColor,
          };
        }
      });
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
        ...payloadChart,
      });

      if (update?.status === 200) {
        // if file change or tabular change
        if (dataDetail.status === 200) {
          if (
            JSON.stringify(dataDetail?.data?.tabular?.datasets) !==
            JSON.stringify(payloadChartTabular?.tabular?.datasets)
          ) {
            const updateTabular = await updateChartTabular({
              ...payloadChartTabular,
            });
            if (updateTabular?.status === 200) {
              enqueueSnackbar('Section Delete successfully.', {
                variant: 'successSnackbar',
              });
              navigate('/home');
            }
          } else {
            enqueueSnackbar('Section Delete successfully.', {
              variant: 'successSnackbar',
            });
            navigate('/home');
          }
        }
      }
      // console.info(payloadChart, payloadChartTabular, '<<< payloadChart');
      // if (update?.status === 200) {
      //   setOpenPopup(false);
      //   enqueueSnackbar('Section Delete successfully.', {
      //     variant: 'successSnackbar',
      //   });
      //   reFetch();
      //   // console.info(cb, '<<< apa dia');
      //   // cb(false);
      // }
    }
    setIsLoading(false);
  };

  const handleClick = (cb) => {
    methods.handleSubmit(onSubmit)();
  };

  // const handleClose = () => {
  //   setOpenPopup(false);
  //   setTimeout(() => {
  //     setAction('');
  //     methods.reset();
  //   }, 500);
  // };

  // const handleDelete = async (cb) => {
  //   const deleteAct = await deleteUser();
  //   if (deleteAct.status === 200) {
  //     enqueueSnackbar('User deleted successfully.', {
  //       variant: 'successSnackbar',
  //     });
  //     reFetch();
  //     cb(false);
  //   }
  // };

  return {
    methods,
    handleFileInputChange,
    handleClick,
    openDialog,
    setOpenDialog,
    // handleClose,
    openPopup,
    action,
    setAction,
    setOpenPopup,
    isLoading,
    setUserId,
    // setSortDir,
    // setSortBy,
    // userDetail: userDetail?.data,
    // loadingUser,
    chartDetail: response?.data,
    chartDetailMetaList: response?.meta,
    // loading,
    page,
    pageSize,
    setPage,
    setPageSize,
    // addSection,
    setSectionType,
    setSectionId,
    // setSearch,
    loading,
    // search,
    // handleDelete,
    typeDialog,
    setTypeDialog,
    optionChartTypes: responseChartTypeList?.data || [],
    setChartId,
    userId,
  };
};

export const AddOrEditChartContext = React.createContext({});

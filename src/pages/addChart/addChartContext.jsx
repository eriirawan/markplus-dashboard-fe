import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from 'axios-hooks';
import { enqueueSnackbar } from 'notistack';
import { AppBarContext } from '@/context/AppBarContext';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

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
  const [, uploadImageInformationChart] = useAxios(
    {
      url: '/dashboard/v1/users/upload-image',
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

  const defaultForm = {
    chartType: '',
    chartLabel: '',
    chartData: {},
    verticalAxisLabel: '',
    horizontalAxisLabel: '',
    showAxisLabels: true,
    chartDataDonutOrPie: {},
    imageUrl: '',
    imageFile: '',
  };

  const methods = useForm({
    defaultValues: { ...defaultForm },
    mode: 'onChange',
  });

  const handleFileInputChange = async (e) => {
    setOpenDialog((prev) => ({ ...prev, loading: true }));
    const file = e.target.files[0];

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    delete sheet['A1'];
    const range = XLSX.utils.decode_range(sheet['!ref']);
    sheet['!ref'] = XLSX.utils.encode_range(range);

    const updatedWorkbookBlob = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const bodyFormData = new FormData();
    bodyFormData.append('file', new Blob([updatedWorkbookBlob], { type: file.type }), file.name);

    const { data, status } = await parseFile({ data: bodyFormData });

    const colorTheme = Object.values(clientSelected?.colorway)?.filter((el) => el.includes('#'));
    let indexColorTheme = 0;

    if (status === 200) {
      // Handle mixed dataset structure (array of numbers OR array of objects with result)
      const normalizedDatasets = data.data.datasets?.map((el, i) => {
        const parsedData = el.data.map((item) =>
          typeof item === 'object' && item.result !== undefined ? item.result : item
        );
        const color = colorTheme[indexColorTheme];
        indexColorTheme = (indexColorTheme + 1) % colorTheme.length;

        return {
          ...el,
          data: parsedData,
          backgroundColor: color,
          borderColor: color,
        };
      });

      const mappingDataChart = {
        labels: data.data.labels,
        datasets: normalizedDatasets,
      };

      const mappingDataDonutOrPieChart = {
        labels: data.data.labels,
        datasets: normalizedDatasets.map((el) => ({
          ...el,
          backgroundColor: colorTheme.slice(0, el?.data?.length),
          borderColor: colorTheme.slice(0, el?.data?.length),
        })),
      };

      methods.setValue('chartDataDonutOrPie', mappingDataDonutOrPieChart);
      methods.setValue('chartData', mappingDataChart);
      setOpenDialog((prev) => ({ ...prev, loading: false, success: true }));
      setTypeDialog('success');
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
        sub_title: formData.chartSubLabel,
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
      if (formData.chartType === 'Information Chart' && formData.imageFile) {
        const payloadUpload = new FormData();
        payloadUpload.append('file', formData.imageFile);
        const uploadImage = await uploadImageInformationChart({
          data: payloadUpload,
        });
        if (uploadImage.status === 200) {
          payloadChart.image_url = uploadImage.data.data.url;
        }
      }
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
        sub_title: formData.chartSubLabel,
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
      if (formData.chartType === 'Information Chart') {
        const payloadUpload = new FormData();
        payloadUpload.append('file', formData.imageFile);
        const uploadImage = await uploadImageInformationChart({
          data: payloadUpload,
        });
        if (uploadImage.status === 200) {
          payloadChart.image_url = uploadImage.data.data.url;
        }
      }
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

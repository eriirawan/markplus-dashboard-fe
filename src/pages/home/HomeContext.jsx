import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '@/hooks/useAxios';
// import  from 'axios-hooks'
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const useHomeStore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [action, setAction] = useState('');
  const [userId, setUserId] = useState(null);
  const [sectionType, setSectionType] = useState(null);
  // const [sortDir, setSortDir] = useState('DESC');
  // const [sortBy, setSortBy] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sectionId, setSectionId] = useState(null);
  const [chartSelectedId, setChartSelectedId] = useState(null);
  // const [search, setSearch] = useState('');

  const [{ response, loading }, reFetch] = useAxios({
    url: `/dashboard/v1/sections/type/${sectionType}/user/${userId}/list?page=${page}&page_size=${pageSize}`,
    method: 'get',
    pause: !userId || !sectionType,
  });

  // const [{ response: userDetail, loading: loadingUser }] = useAxios({
  //   url: `/dashboard/v1/users/${userId}`,
  //   method: 'get',
  //   pause: !userId,
  // });

  const [, addSection] = useAxios({
    url: `/dashboard/v1/sections/add`,
    method: 'post',
    options: {
      // headers: {
      //   'Content-Type': 'appl',
      // },
    },
  });

  const [, updateSection] = useAxios({
    url: `/dashboard/v1/sections/id/update`,
    method: 'put',
  });

  const [, updateAxisLabel] = useAxios({
    url: `/dashboard/v1/charts/update`,
    method: 'put',
    // pause: !userId && !chartSelectedId,
  });
  // const updatingAxisLabel = async (data) => {
  //   const response = await axios.put(`${url}`, data);
  //   if (response.status === 200) {
  //   }
  // };
  const handleChangeAxis = async (data) => {
    const update = await updateAxisLabel({
      ...data,
    });
    if (update?.status === 200) {
      enqueueSnackbar('Chart updated successfully.', {
        variant: 'successSnackbar',
      });
      reFetch();
    }
  };
  // const [, deleteUser] = useAxios({
  //   url: `/dashboard/v1/users/${userId}`,
  //   method: 'delete',
  // });

  // const defaultForm = {
  //   email: '',
  //   first_name: '',
  //   // imgName: '',
  //   company_logo_url: '',
  //   last_name: '',
  //   role_id: '',
  //   username: '',
  //   filename: '',
  // };

  // const methods = useForm({
  //   defaultValues: { ...defaultForm },
  //   mode: 'onChange',
  // });

  // const handleFileInputChange = async (e) => {
  //   const bodyFormData = new FormData();
  //   bodyFormData.append('file', e.target.files[0]);
  //   const file = await uploadFile(bodyFormData);

  //   if (file?.status === 200) {
  //     methods.setValue('company_logo_url', file.data.url);
  //     methods.setValue('filename', file.data.filename);
  //   }
  // };

  const onSubmitSection = async (formData, cb) => {
    setIsLoading(true);
    if (action === 'create') {
      const submit = await addSection({
        ...formData,
        section_type: sectionType,
        user_id: userId,
      });
      if (submit?.status === 200) {
        setOpenPopup(false);
        enqueueSnackbar('Section added successfully.', {
          variant: 'successSnackbar',
        });
        reFetch();
      }
    } else if (action === 'update') {
      const update = await updateSection({
        ...formData,
      });
      if (update?.status === 200) {
        setOpenPopup(false);
        enqueueSnackbar('Section Delete successfully.', {
          variant: 'successSnackbar',
        });
        reFetch();
        cb(false);
      }
    }
    setIsLoading(false);
  };

  const handleClick = (payload, cb = () => {}) => {
    onSubmitSection(payload, cb);
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
    // methods,
    // handleFileInputChange,
    handleClick,
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
    sectionList: response,
    sectionMetaList: response?.meta,
    // loading,
    page,
    pageSize,
    setPage,
    setPageSize,
    addSection,
    setSectionType,
    setSectionId,
    handleChangeAxis,
    setChartSelectedId,
    chartSelectedId,
    // setSearch,
    loading,
    setIsLoading,
    // search,
    // handleDelete,
  };
};

export const HomeContext = React.createContext({});

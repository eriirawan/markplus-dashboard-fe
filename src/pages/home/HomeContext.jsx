import React, { useCallback, useContext, useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
// import  from 'axios-hooks'
import { enqueueSnackbar } from 'notistack';
import { AppContext } from '../../context/AppContext';

export const useHomeStore = () => {
  const { userToken: token, me, setClientSelected, isUserRole } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [action, setAction] = useState('');
  const [userId, setUserId] = useState(null);
  const [sectionType, setSectionType] = useState('home');
  // const [sortDir, setSortDir] = useState('DESC');
  // const [sortBy, setSortBy] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sectionId, setSectionId] = useState(null);
  const [chartSelectedId, setChartSelectedId] = useState(null);
  // const [search, setSearch] = useState('');
  useEffect(() => {
    if (isUserRole) {
      setUserId(me?.id);
    }
  }, [isUserRole]);
  const [{ data: response, loading }, reFetch] = useAxios(
    {
      url: `/dashboard/v1/sections/type/${sectionType}/user/${userId}/list?page=${page}&page_size=${pageSize}`,
      method: 'get',
    },
    {
      manual: true,
    }
  );
  const callbackGetList = useCallback(() => {
    if (userId && sectionType) {
      return reFetch();
    }
  }, [userId, sectionType]);
  useEffect(() => {
    callbackGetList();
  }, [callbackGetList]);
  // const [{ response: userDetail, loading: loadingUser }] = useAxios({
  //   url: `/dashboard/v1/users/${userId}`,
  //   method: 'get',
  //   pause: !userId,
  // });

  const [, addSection] = useAxios(
    {
      url: `/dashboard/v1/sections/add`,
      method: 'post',
      options: {},
    },
    {
      manual: true,
    }
  );

  const [, updateSection] = useAxios(
    {
      url: `/dashboard/v1/sections/update`,
      method: 'put',
    },
    {
      manual: true,
    }
  );

  const [, updateAxisLabel] = useAxios(
    {
      url: `/dashboard/v1/charts/update`,
      method: 'put',
      // pause: !userId && !chartSelectedId,
    },
    {
      manual: true,
    }
  );
  // const updatingAxisLabel = async (data) => {
  //   const response = await axios.put(`${url}`, data);
  //   if (response.status === 200) {
  //   }
  // };
  const handleChangeAxis = async (data) => {
    const update = await updateAxisLabel({
      data: {
        ...data,
        user_id: data.user_id,
        chart_id: data?.chart_id,
      },
    });
    if (update?.status === 200) {
      enqueueSnackbar('Chart updated successfully.', {
        variant: 'success',
      });
      reFetch();
    }
  };

  const onSubmitSection = async (formData, cb) => {
    setIsLoading(true);
    if (action === 'create') {
      const submit = await addSection({
        data: {
          ...formData,
        },
      });
      if (submit?.status === 200) {
        setOpenPopup(false);
        enqueueSnackbar('Section added successfully.', {
          variant: 'success',
        });
        reFetch();
      }
    } else if (action === 'update') {
      const update = await updateSection({
        data: {
          ...formData,
          section_id: sectionId,
        },
      });
      if (update?.status === 200) {
        setOpenPopup(false);
        enqueueSnackbar('Section Delete successfully.', {
          variant: 'success',
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

  return {
    handleClick,
    openPopup,
    action,
    setAction,
    setOpenPopup,
    isLoading,
    setUserId,
    sectionList: response?.data,
    sectionMetaList: response?.meta,
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
    loading,
    setIsLoading,
    reFetch,
    sectionType,
  };
};

export const HomeContext = React.createContext({});

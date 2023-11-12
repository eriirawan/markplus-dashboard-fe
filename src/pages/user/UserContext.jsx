import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from 'axios-hooks';
import { enqueueSnackbar } from 'notistack';

export const useUserStore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [action, setAction] = useState('');
  const [userId, setUserId] = useState(null);
  const [sortDir, setSortDir] = useState('DESC');
  const [sortBy, setSortBy] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [openPopupTheme, setOpenPopupTheme] = useState(false);

  const [{ data: response, loading }, reFetch] = useAxios({
    url: `/dashboard/v1/users/list?page=${page}&page_size=${pageSize}&sort_by=${
      sortBy || 'id'
    }&sort_dir=${sortDir}&search=${search || '%20'}`,
    method: 'get',
  });

  const [{ data: userDetail, loading: loadingUser }] = useAxios(
    {
      url: `/dashboard/v1/users/${userId}`,
      method: 'get',
    },
    {
      manual: !userId,
    }
  );

  const [, uploadFile] = useAxios(
    {
      url: `/dashboard/v1/users/upload-image`,
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
    },
    {
      manual: true,
    }
  );

  const [, addUser] = useAxios(
    {
      url: `/dashboard/v1/users/add`,
      method: 'post',
    },
    {
      manual: true,
    }
  );
  const [, updateUser] = useAxios(
    {
      url: `/dashboard/v1/users/update`,
      method: 'put',
    },
    {
      manual: true,
    }
  );
  const [, deleteUser] = useAxios(
    {
      url: `/dashboard/v1/users/${userId}`,
      method: 'delete',
    },
    {
      manual: true,
    }
  );

  const defaultForm = {
    email: '',
    first_name: undefined,
    // imgName: '',
    company_logo_url: '',
    last_name: undefined,
    role_id: '',
    // username: '',
    filename: '',
  };

  const methods = useForm({
    defaultValues: { ...defaultForm },
    mode: 'onChange',
  });

  const handleFileInputChange = async (e) => {
    const file = await uploadFile({
      data: {
        file: e.target.files[0],
      },
    });

    if (file?.status === 200) {
      methods.setValue('company_logo_url', file?.data?.data.url);
      methods.setValue('filename', file?.data?.data.filename);
    }
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);
    if (action === 'create') {
      const submit = await addUser({
        data: {
          role_id: formData.role_id,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData?.last_name || undefined,
          company_name: `${formData.first_name} ${formData.last_name}`,
          company_logo_url: formData?.company_logo_url || undefined,
          password: formData?.password || undefined,
          colorway: {
            theme: 'light',
            color1: '#EEF0F5',
            color2: '#006CB7',
            color3: '#006CB7',
            color4: '#ffffff',
            color5: '#000000',
          },
        },
      });
      if (submit?.status === 200) {
        setOpenPopup(false);
        enqueueSnackbar('User added successfully.', {
          variant: 'successSnackbar',
        });
        reFetch();
      }
    } else if (action === 'edit') {
      const update = await updateUser({
        data: {
          user_id: userId,
          role_id: formData.role_id,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          company_name: `${formData.first_name} ${formData.last_name}`,
          company_logo_url: formData?.company_logo_url || undefined,
          new_password: formData?.password,
        },
      });
      if (update?.status === 200) {
        setOpenPopup(false);
        enqueueSnackbar('User updated successfully.', {
          variant: 'successSnackbar',
        });
        reFetch();
      }
    }
    setIsLoading(false);
  };

  const handleClick = () => {
    methods.handleSubmit(onSubmit)();
  };

  const handleClose = () => {
    setOpenPopup(false);
    setTimeout(() => {
      setAction('');
      methods.reset();
    }, 500);
  };

  const handleDelete = async (cb) => {
    const deleteAct = await deleteUser();
    if (deleteAct.status === 200) {
      enqueueSnackbar('User deleted successfully.', {
        variant: 'successSnackbar',
      });
      reFetch();
      cb(false);
    }
  };

  const handleSaveColorway = async (value) => {
    const update = await updateUser({
      data: {
        colorway: value,
        user_id: userId,
      },
    });
    if (update?.status === 200) {
      enqueueSnackbar('User theme changed successfully.', {
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
        variant: 'successSnackbar',
      });
      setOpenPopupTheme(false);
      reFetch();
    }
  };

  return {
    methods,
    handleFileInputChange,
    handleClick,
    handleClose,
    openPopup,
    action,
    setAction,
    setOpenPopup,
    isLoading,
    setUserId,
    setSortDir,
    setSortBy,
    userDetail: userDetail?.data,
    loadingUser,
    userList: response?.data || [],
    metaList: response?.meta,
    loading,
    page,
    pageSize,
    setPage,
    setPageSize,
    setSearch,
    search,
    handleDelete,
    handleSaveColorway,
    openPopupTheme,
    setOpenPopupTheme,
  };
};

export const UserContext = React.createContext({});

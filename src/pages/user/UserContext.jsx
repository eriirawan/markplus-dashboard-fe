import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '@/hooks/useAxios';
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

  const [{ response, loading }, reFetch] = useAxios({
    url: `/dashboard/v1/users/list?page=${page}&page_size=${pageSize}&sort_by=${
      sortBy || 'id'
    }&sort_dir=${sortDir}&search=${search || '%20'}`,
    method: 'get',
  });

  const [{ response: userDetail, loading: loadingUser }] = useAxios({
    url: `/dashboard/v1/users/${userId}`,
    method: 'get',
    pause: !userId,
  });

  const [, uploadFile] = useAxios({
    url: `/dashboard/v1/files/upload`,
    method: 'post',
    options: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  });
  const [, addUser] = useAxios({
    url: `/dashboard/v1/users/add`,
    method: 'post',
  });
  const [, updateUser] = useAxios({
    url: `/dashboard/v1/users/${userId}`,
    method: 'put',
  });
  const [, deleteUser] = useAxios({
    url: `/dashboard/v1/users/${userId}`,
    method: 'delete',
  });

  const defaultForm = {
    email: '',
    first_name: '',
    // imgName: '',
    company_logo_url: '',
    last_name: '',
    role_id: '',
    username: '',
    filename: '',
  };

  const methods = useForm({
    defaultValues: { ...defaultForm },
    mode: 'onChange',
  });

  const handleFileInputChange = async (e) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', e.target.files[0]);
    const file = await uploadFile(bodyFormData);

    if (file?.status === 200) {
      methods.setValue('company_logo_url', file.data.url);
      methods.setValue('filename', file.data.filename);
    }
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);
    if (action === 'create') {
      const submit = await addUser({
        username: formData.username,
        role_id: formData.role_id,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        company: {
          logo_url: formData?.company_logo_url || undefined,
          name: `${formData.first_name} ${formData.last_name}`,
        },
        password: 'password',
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
        username: formData.username,
        role_id: formData.role_id,
        email: formData.email,
        // first_name: formData.first_name,
        // last_name: formData.last_name,
        company_id: formData?.company_id,
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
  };
};

export const UserContext = React.createContext({});

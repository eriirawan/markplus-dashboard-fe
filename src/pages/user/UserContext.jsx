import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from 'axios-hooks';
import { enqueueSnackbar } from 'notistack';

/**
 * @typedef {Object} UserData
 * @property {string} id - User ID
 * @property {string} first_name - User first name
 * @property {string} last_name - User last name
 * @property {string} email - User email
 * @property {string} role_id - User role ID
 * @property {string} role - User role name
 * @property {string} [company_logo_url] - URL to user's company logo
 * @property {string} [created_at] - Creation timestamp
 * @property {string} [updated_at] - Last update timestamp
 */

/**
 * @typedef {Object} UserListResponse
 * @property {UserData[]} data - List of users
 * @property {Object} meta - Pagination metadata
 * @property {number} meta.total_data - Total number of users
 * @property {number} meta.total_page - Total number of pages
 */

/**
 * @typedef {Object} UserContextType
 * @property {boolean} isLoading - Loading state
 * @property {boolean} openPopup - Whether the user popup is open
 * @property {string} action - Current action ('create', 'edit', 'detail')
 * @property {string|null} userId - ID of the selected user
 * @property {string} sortDir - Sort direction ('ASC' or 'DESC')
 * @property {string|null} sortBy - Field to sort by
 * @property {number} pageSize - Number of items per page
 * @property {number} page - Current page number
 * @property {string} search - Search query
 * @property {boolean} openPopupTheme - Whether the theme popup is open
 * @property {boolean} actionSheetOpen - Whether the action sheet is open
 * @property {string|null} selectedUserId - ID of the user selected in action sheet
 * @property {UserData[]} userList - List of users
 * @property {Object} metaList - Pagination metadata
 * @property {UserData|null} userDetail - Details of the selected user
 * @property {function(string): void} handleOpenActionSheet - Open action sheet for a user
 * @property {function(): void} reFetch - Refetch user list
 * @property {function(Object): Promise} uploadFile - Upload a file
 * @property {function(Object): Promise} addUser - Add a new user
 * @property {function(Object): Promise} updateUser - Update a user
 * @property {function(): Promise} deleteUser - Delete a user
 * @property {Object} methods - React Hook Form methods
 * @property {function(boolean): void} setOpenPopup - Set whether the user popup is open
 * @property {function(string): void} setAction - Set the current action
 * @property {function(string|null): void} setUserId - Set the selected user ID
 * @property {function(boolean): void} setOpenPopupTheme - Set whether the theme popup is open
 * @property {function(boolean): void} setActionSheetOpen - Set whether the action sheet is open
 * @property {function(string|null): void} setSelectedUserId - Set the selected user ID for action sheet
 * @property {function(number): void} setPage - Set the current page
 * @property {function(number): void} setPageSize - Set the page size
 * @property {function(string): void} setSearch - Set the search query
 * @property {function(string): void} setSortDir - Set the sort direction
 * @property {function(string|null): void} setSortBy - Set the field to sort by
 * @property {function(boolean): void} setIsLoading - Set the loading state
 * @property {function(Object): Promise} handleSubmit - Handle form submission
 * @property {function(Object): void} handleDelete - Handle user deletion
 */

/**
 * Custom hook that provides the user context state
 * @returns {UserContextType} The user context state
 */
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
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpenActionSheet = (userId) => {
    setSelectedUserId(userId);
    setActionSheetOpen(true);
  };

  const [{ data: response, loading }, reFetch] = useAxios({
    method: 'get',
    url: `/dashboard/v1/users/list?page=${page}&page_size=${pageSize}&sort_by=${
      sortBy || 'id'
    }&sort_dir=${sortDir}&search=${search || '%20'}`,
  });

  const [{ data: userDetail, loading: loadingUser }] = useAxios(
    {
      method: 'get',
      url: `/dashboard/v1/users/${userId}`,
    },
    {
      manual: !userId,
    }
  );

  const [, uploadFile] = useAxios(
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      method: 'post',
      url: `/dashboard/v1/users/upload-image`,
    },
    {
      manual: true,
    }
  );

  const [, addUser] = useAxios(
    {
      method: 'post',
      url: `/dashboard/v1/users/add`,
    },
    {
      manual: true,
    }
  );
  const [, updateUser] = useAxios(
    {
      method: 'put',
      url: `/dashboard/v1/users/update`,
    },
    {
      manual: true,
    }
  );
  const [, deleteUser] = useAxios(
    {
      method: 'delete',
      url: `/dashboard/v1/users/${userId}`,
    },
    {
      manual: true,
    }
  );

  const defaultForm = {
    // imgName: '',
    company_logo_url: '',

    email: '',

    // username: '',
    filename: '',

    first_name: undefined,

    last_name: undefined,

    role_id: '',
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
          colorway: {
            color1: '#EEF0F5',
            color2: '#006CB7',
            color3: '#006CB7',
            color4: '#ffffff',
            color5: '#000000',
            theme: 'light',
          },
          company_logo_url: formData?.company_logo_url || undefined,
          company_name: `${formData.first_name} ${formData.last_name}`,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData?.last_name || undefined,
          password: formData?.password || undefined,
          role_id: formData.role_id,
        },
      });
      if (submit?.status === 200) {
        setOpenPopup(false);
        enqueueSnackbar('User added successfully.', {
          variant: 'success',
        });
        reFetch();
      }
    } else if (action === 'edit') {
      const update = await updateUser({
        data: {
          company_logo_url: formData?.company_logo_url || undefined,
          company_name: `${formData.first_name} ${formData.last_name}`,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          new_password: formData?.password,
          role_id: formData.role_id,
          user_id: userId,
        },
      });
      if (update?.status === 200) {
        setOpenPopup(false);
        enqueueSnackbar('User updated successfully.', {
          variant: 'success',
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
        variant: 'success',
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
        variant: 'success',
      });
      setOpenPopupTheme(false);
      reFetch();
    }
  };

  return {
    action,
    actionSheetOpen,
    handleClick,
    handleClose,
    handleDelete,
    handleFileInputChange,
    handleOpenActionSheet,
    handleSaveColorway,
    isLoading,
    loading,
    loadingUser,
    metaList: response?.meta,
    methods,
    openPopup,
    openPopupTheme,
    page,
    pageSize,
    search,
    selectedUserId,
    setAction,
    setActionSheetOpen,
    setOpenPopup,
    setOpenPopupTheme,
    setPage,
    setPageSize,
    setSearch,
    setSelectedUserId,
    setSortBy,
    setSortDir,
    setUserId,
    userDetail: userDetail?.data,
    /** @type {Array<{id: string, [key: string]: any}>} */
    userList: response?.data || [],
  };
};

/**
 * User context for user management state
 * @type {React.Context<UserContextType>}
 */
export const UserContext = React.createContext({
  isLoading: false,
  openPopup: false,
  action: '',
  userId: null,
  sortDir: 'DESC',
  sortBy: null,
  pageSize: 10,
  page: 1,
  search: '',
  openPopupTheme: false,
  actionSheetOpen: false,
  selectedUserId: null,
  userList: [],
  metaList: { total_data: 0, total_page: 1 },
  userDetail: null,
  handleOpenActionSheet: () => {},
  reFetch: () => {},
  uploadFile: async () => {},
  addUser: async () => {},
  updateUser: async () => {},
  deleteUser: async () => {},
  methods: {},
  setOpenPopup: () => {},
  setAction: () => {},
  setUserId: () => {},
  setOpenPopupTheme: () => {},
  setActionSheetOpen: () => {},
  setSelectedUserId: () => {},
  setPage: () => {},
  setPageSize: () => {},
  setSearch: () => {},
  setSortDir: () => {},
  setSortBy: () => {},
  setIsLoading: () => {},
  handleSubmit: async () => {},
  handleDelete: () => {},
});

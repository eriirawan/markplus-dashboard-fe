import React, { useMemo, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import useAxios from 'axios-hooks';
import { tokenString, userDataString, rolesDataString } from '../helpers/Constants';
import createTheme from '../theme';

import useLocalStorage from '../hooks/useLocalStorage';

/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} name - User name
 * @property {string} first_name - User first name
 * @property {string} last_name - User last name
 * @property {string} email - User email
 * @property {string} role - User role (e.g., 'user', 'admin')
 * @property {Object} colorway - User theme color preferences
 */

/**
 * @typedef {Object} Role
 * @property {string} id - Role ID
 * @property {string} name - Role name
 * @property {string} description - Role description
 */

/**
 * @typedef {Object} Client
 * @property {string} id - Client ID
 * @property {string} name - Client name
 * @property {string} [email] - Client email
 * @property {string} [phone] - Client phone
 */

/**
 * @typedef {Object} AppContextType
 * @property {Client[]} clientList - List of clients
 * @property {Client|null} clientSelected - Currently selected client
 * @property {boolean} isMobile - Whether the current viewport is mobile
 * @property {boolean} isUserRole - Whether the current user has the 'user' role
 * @property {User|null} me - Current user data
 * @property {boolean} openPopupClient - Whether the client popup is open
 * @property {Role[]} roles - Available roles
 * @property {function(Client): void} setClientSelected - Set the selected client
 * @property {function(User): void} setMe - Set the current user
 * @property {function(boolean): void} setOpenPopupClient - Set whether the client popup is open
 * @property {function(Role[]): void} setRoles - Set available roles
 * @property {function(string): void} setUserToken - Set the user token
 * @property {Object} theme - Current theme object
 * @property {string|null} userToken - Current user authentication token
 */

/**
 * Custom hook that provides the app context state
 * @returns {AppContextType} The app context state
 */
export const useStore = () => {
  const [userToken, setUserToken] = useLocalStorage(tokenString, null);
  const [me, setMe] = useLocalStorage(userDataString, null);
  const [roles, setRoles] = useLocalStorage(rolesDataString, []);
  const [clientSelected, setClientSelected] = useState(null);
  const [openPopupClient, setOpenPopupClient] = useState(null);
  const [pageClientList, setPageClientList] = useState(1);
  const isUserRole = useMemo(() => me?.role?.toLowerCase() === 'user', [me]);

  const theme = useMemo(() => createTheme(me?.colorway), [me]);

  const [{ data: clientList, loading }, reFetch] = useAxios({
    method: 'get',
    url: `/dashboard/v1/users/list?page=${pageClientList}&page_size=${10}&sort_by=${'id'}&sort_dir=${'ASC'}`,
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return {
    clientList: clientList?.data,
    clientSelected,
    isMobile,
    isUserRole,
    me,
    openPopupClient,
    roles,
    setClientSelected,
    setMe,
    setOpenPopupClient,
    setRoles,
    setUserToken,
    theme,
    userToken,
  };
};

/**
 * Application context for global state management
 * @type {React.Context<AppContextType>}
 */
const AppContextBody = React.createContext({
  clientList: [],
  clientSelected: null,
  isMobile: false,
  isUserRole: false,
  me: null,
  openPopupClient: false,
  roles: [],
  setClientSelected: () => {},
  setMe: () => {},
  setOpenPopupClient: () => {},
  setRoles: () => {},
  setUserToken: () => {},
  theme: {},
  userToken: null,
});
AppContextBody.displayName = 'MarkPlusGlobalState';

export const AppContext = AppContextBody;

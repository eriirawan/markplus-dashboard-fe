import React, { useMemo, useState } from 'react';
import { tokenString, userDataString, rolesDataString } from '../helpers/Constants';
import createTheme from '../theme';

import useLocalStorage from '../hooks/useLocalStorage';
import useAxios from 'axios-hooks';

export const useStore = () => {
  const [userToken, setUserToken] = useLocalStorage(tokenString, null);
  const [me, setMe] = useLocalStorage(userDataString, null);
  const [roles, setRoles] = useLocalStorage(rolesDataString, []);
  const [clientSelected, setClientSelected] = useState(null);
  const [openPopupClient, setOpenPopupClient] = useState(null);
  const [pageClientList, setPageClientList] = useState(1);
  const isUserRole = useMemo(() => me?.role?.toLowerCase() === 'user', [me]);

  const theme = useMemo(() => {
    return createTheme(me?.colorway);
  }, [me]);
  const [{ data: clientList, loading }, reFetch] = useAxios({
    method: 'get',
    url: `/dashboard/v1/users/list?page=${pageClientList}&page_size=${10}&sort_by=${'id'}&sort_dir=${'ASC'}`,
  });
  return {
    me,
    setMe,
    setUserToken,
    userToken,
    roles,
    setRoles,
    theme,
    setClientSelected,
    clientSelected,
    isUserRole,
    openPopupClient,
    setOpenPopupClient,
    clientList: clientList?.data,
  };
};

const AppContextBody = React.createContext({});
AppContextBody.displayName = 'MarkPlusGlobalState';

export const AppContext = AppContextBody;

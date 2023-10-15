import React, { useMemo, useState } from 'react';
import { tokenString, userDataString, rolesDataString } from '../helpers/Constants';
import createTheme from '../theme';

import useLocalStorage from '../hooks/useLocalStorage';

export const useStore = () => {
  const [userToken, setUserToken] = useLocalStorage(tokenString, null);
  const [me, setMe] = useLocalStorage(userDataString, null);
  const [roles, setRoles] = useLocalStorage(rolesDataString, []);
  const [clientSelected, setClientSelected] = useState(null);

  const theme = useMemo(() => {
    return createTheme(me?.colorway);
  }, [me]);

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
  };
};

const AppContextBody = React.createContext({});
AppContextBody.displayName = 'MarkPlusGlobalState';

export const AppContext = AppContextBody;

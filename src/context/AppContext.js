import React from 'react';
import { tokenString, userDataString, rolesDataString } from '../helpers/Constants';

import useLocalStorage from '../hooks/useLocalStorage';

export const useStore = () => {
  const [userToken, setUserToken] = useLocalStorage(tokenString, null);
  const [me, setMe] = useLocalStorage(userDataString, null);
  const [roles, setRoles] = useLocalStorage(rolesDataString, []);

  return {
    me,
    setMe,
    setUserToken,
    userToken,
    roles,
    setRoles,
  };
};

const AppContextBody = React.createContext({});
AppContextBody.displayName = 'MarkPlusGlobalState';

export const AppContext = AppContextBody;

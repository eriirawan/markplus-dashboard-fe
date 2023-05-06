import React from 'react';
import { tokenString, userDataString } from '../helpers/Constants';

import useLocalStorage from '../hooks/useLocalStorage';

export const useStore = () => {
  const [userToken, setUserToken] = useLocalStorage(tokenString, null);
  const [me, setMe] = useLocalStorage(userDataString, null);

  return {
    userToken,
    setUserToken,
    me,
    setMe,
  };
};

const AppContextBody = React.createContext({});
AppContextBody.displayName = 'MarkPlusGlobalState';

export const AppContext = AppContextBody;

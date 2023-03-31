/* eslint-disable no-unsafe-optional-chaining */
import { createContext, useContext, useMemo } from 'react';
import { AppContext } from '@/context/AppContext';
import { userAvatarString, userIdString } from '@/helpers/Constants';
import { BroadcastChannel } from 'broadcast-channel';
import useLocalStorage from './useLocalStorage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { me, userToken, setUserToken, setMe } = useContext(AppContext);
  const [userId, setUserId] = useLocalStorage(userIdString, null);
  const [userAvatar, setUserAvatar] = useLocalStorage(userAvatarString, null);
  const logoutChannel = new BroadcastChannel('logout');

  const handleSetUserId = (newUserId) => setUserId(newUserId);
  const handleSetUserAvatar = (avatar) => setUserAvatar(avatar);

  const hasPermission = (permission) => {
    if (!me?.company?.isRbacActive || me?.isSuperUser || me?.isAdmin) return true;
    const permissions = me?.roles?.reduce((acc, role) => [...acc, ...role.permissions], []);
    const uniquePermissions = [...new Set([...permissions, ...me?.permissions])];
    if (uniquePermissions.length) return uniquePermissions.includes(permission);

    return false;
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const login = async () => {
    const token = 'test-token';
    setUserToken(token);
    setMe({
      firstName: 'admin',
      lastName: 'admin',
    });
  };

  const refreshMeData = () =>
    setMe({
      firstName: 'admin',
      lastName: 'admin',
    });

  const logout = () => {
    clearLocalStorage();
    logoutChannel.postMessage('Logout');
    window.location.href = `/login`;
  };

  const logoutWithoutReload = () => {
    clearLocalStorage();
    logoutChannel.postMessage('Logout');
  };

  logoutChannel.onmessage = () => {
    if (!window.document.hasFocus()) {
      window.location.href = `/login`;
    }
    logoutChannel.close();
  };

  const value = useMemo(
    () => ({
      clearLocalStorage,
      handleSetUserAvatar,
      handleSetUserId,
      hasPermission,
      login,
      logout,
      logoutChannel,
      logoutWithoutReload,
      refreshMeData,
      user: userToken,
      userAvatar,
      userId,
    }),
    [userToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

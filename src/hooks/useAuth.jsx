/* eslint-disable no-unsafe-optional-chaining */
import { createContext, useContext, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { BroadcastChannel } from 'broadcast-channel';
import axios from 'axios';
import CryptoJS from 'crypto-js';

import { AppContext } from '@/context/AppContext';
import { userAvatarString, userIdString } from '@/helpers/Constants';
import useLocalStorage from './useLocalStorage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { me, userToken, setUserToken, setMe } = useContext(AppContext);
  const [userId, setUserId] = useLocalStorage(userIdString, null);
  const [userAvatar, setUserAvatar] = useLocalStorage(userAvatarString, null);
  const [isLoading, setIsLoading] = useState(false);
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

  const encryptData = (data) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_AUTH_SECRET_KEY).toString();
    localStorage.setItem('identifier', encrypted);
  };

  const decryptData = () => {
    const encrypted = localStorage.getItem('identifier');
    const decrypted = CryptoJS.AES.decrypt(encrypted, import.meta.env.VITE_AUTH_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  };

  const login = async (data) => {
    try {
      setIsLoading(true);
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/dashboard/v1/auth`, {
        email: data?.userName,
        password: data?.password,
      });

      if (result.error) throw new Error('Error');

      const { token = null, ...userData } = result?.data?.data;

      setUserToken(token);
      encryptData({
        email: data?.userName,
        password: data?.password,
      });
      handleSetUserId(userData?.id);
      window.location.href = `/home`;
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw new Error(err.response.data.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      setIsLoading(true);
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/dashboard/v1/auth/password/reset`, { email });

      if (result.error) throw new Error('Error');

      setIsLoading(false);
      return result;
    } catch (err) {
      setIsLoading(false);
      throw new Error(err.response.data.message);
    }
  };

  const setPassword = async (data) => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/v1/auth/password/reset/set-password`,
        data
      );
      const oldData = decryptData();
      encryptData({
        email: oldData?.email,
        password: data?.password,
      });

      if (result.error) throw new Error('Error');

      setIsLoading(false);
      return result;
    } catch (err) {
      setIsLoading(false);
      throw new Error(err.response.data.message);
    }
  };

  const changePassword = async (data) => {
    try {
      setIsLoading(true);
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/dashboard/v1/auth/password/change`, data, {
        headers: { Authorization: userToken },
      });

      if (result.error) throw new Error('Error');

      setIsLoading(false);
      return result;
    } catch (err) {
      setIsLoading(false);
      throw new Error(err.response.data.message);
    }
  };

  const refreshMeData = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/v1/users/${userId}`, {
        headers: { Authorization: userToken },
      });

      if (result.error) throw new Error('Error');

      const userDetail = result?.data?.data;
      setMe(userDetail);
      setIsLoading(false);
      return userDetail;
    } catch (err) {
      setIsLoading(false);
      enqueueSnackbar(err?.response?.data?.message, {
        variant: 'errorSnackbar',
      });
      throw new Error(err?.response?.data?.message);
    }
  };

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
      changePassword,
      clearLocalStorage,
      decryptData,
      encryptData,
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
      isLoading,
      resetPassword,
      setPassword,
    }),
    [userToken, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

import { useState, createContext, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';

export const useStore = () => {
  const [hasNotification, setHasNotification] = useState(false);
  const [unseenUpdateNumber, setUnseenUpdateNumber] = useState(0);
  const [unseenTaskListNumber, setUnseenTaskListNumber] = useState(0);
  const [clientSelected, setClientSelected] = useState(null);
  const [openPopupClient, setOpenPopupClient] = useState(null);
  return {
    hasNotification,
    setHasNotification,
    setUnseenTaskListNumber,
    setUnseenUpdateNumber,
    setClientSelected,
    setOpenPopupClient,
    openPopupClient,
    unseenTaskListNumber,
    unseenUpdateNumber,
    clientSelected,
    // loading,
  };
};
export const AppBarContext = createContext({});

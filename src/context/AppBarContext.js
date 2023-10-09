import { useState, createContext } from 'react';
import useAxios from '@/hooks/useAxios';

export const useStore = () => {
  const [hasNotification, setHasNotification] = useState(false);
  const [unseenUpdateNumber, setUnseenUpdateNumber] = useState(0);
  const [unseenTaskListNumber, setUnseenTaskListNumber] = useState(0);
  const [clientSelected, setClientSelected] = useState(null);
  const [listClient, setListClient] = useState();
  const [{ response, loading }, reFetch] = useAxios({
    url: `/dashboard/v1/users/list?page=${page}&page_size=${pageSize}&sort_by=${
      sortBy || 'id'
    }&sort_dir=${sortDir}&search=${search || '%20'}`,
    method: 'get',
  });
  return {
    hasNotification,
    setHasNotification,
    setUnseenTaskListNumber,
    setUnseenUpdateNumber,
    setClientSelected,
    unseenTaskListNumber,
    unseenUpdateNumber,
    clientSelected,
    listClient,
    loading,
  };
};
export const AppBarContext = createContext({});

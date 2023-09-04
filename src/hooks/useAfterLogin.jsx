import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

import { tokenString } from '@/helpers/Constants';

const useAfterLoginStartup = () => {
  const token = localStorage.getItem(tokenString);
  const { setRoles } = useContext(AppContext);

  const refreshMasterData = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dashboard/v1/roles/list?sort_by=role&sort_dir=asc`, {
        headers: { Authorization: token.replaceAll('"', '') },
      })
      .then((res) => setRoles(res?.data?.data || []))
      .catch((e) => console.log(e));
  };

  return {
    refreshMasterData,
  };
};

export default useAfterLoginStartup;

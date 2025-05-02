// useAxios hook
import { tokenString } from '@/helpers/Constants';
import { enqueueSnackbar } from 'notistack';
import Axios from 'axios';
import { configure } from 'axios-hooks';
// import LRU from 'lru-cache'

// const cache = new LRU({ max: 10 })
const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(tokenString);
  config.headers.Authorization = token.replaceAll('"', '');

  return config;
});

axios.interceptors.response.use(
  (res) => {
    if (res?.data?.error) {
      enqueueSnackbar(String(res?.data?.error), {
        variant: 'errorSnackbar',
      });
    }

    return res;
  },
  (err) => {
    enqueueSnackbar(
      String(
        err?.response?.data?.data?.[0]?.message || err?.response?.data?.message || 'Something wrong, Please try again'
      ),
      {
        variant: 'errorSnackbar',
      }
    );

    if (err?.response?.data?.status === 401) {
      localStorage.clear();
      window.location.href = `/login`;
    }

    return Promise.reject(err);
  }
);

const makeUseAxios = () => configure({ axios, cache: false });

export { axios };
export default makeUseAxios;

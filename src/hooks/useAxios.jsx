// useAxios hook

import { useState, useEffect, useMemo } from 'react';
import { tokenString } from '@/helpers/Constants';
import { useSnackbar } from 'notistack';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const useAxios = ({ url, method, options = null, pause = false }) => {
  const token = localStorage.getItem(tokenString);
  const { enqueueSnackbar } = useSnackbar();

  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const headers = useMemo(() => {
    const tempHeader = {};

    if (token) {
      tempHeader.Authorization = token.replaceAll('"', '');
    }

    return { ...tempHeader, ...options?.headers };
  }, [token]);

  const fetchData = (body = null) => {
    setLoading(true);
    if (method === 'get' || method === 'delete') {
      return axios[method](url, { headers })
        .then((res) => {
          setResponse(res.data);
          if (res?.data?.error) {
            enqueueSnackbar(String(res?.data?.error), {
              variant: 'errorSnackbar',
            });
          }
          return res.data;
        })
        .catch((err) => {
          setError(err);
          enqueueSnackbar(err?.response?.data?.message, {
            variant: 'errorSnackbar',
          });
          if (err?.response?.data?.status === 401) {
            localStorage.clear();
            window.location.href = `/login`;
          }
          return err;
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return axios[method](url, body, { headers })
      .then((res) => {
        setResponse(res.data);
        if (res?.data?.error) {
          enqueueSnackbar(String(res?.data?.error), {
            variant: 'errorSnackbar',
          });
        }
        return res.data;
      })
      .catch((err) => {
        setError(err);
        enqueueSnackbar(err?.response?.data?.message, {
          variant: 'errorSnackbar',
        });
        if (err?.response?.data?.status === 401) {
          localStorage.clear();
          window.location.href = `/login`;
        }
        return err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (method?.toLowerCase() === 'get' && !pause) {
      fetchData();
    }
  }, [method, url, headers, pause]);

  return [{ response, error, loading }, fetchData];
};

export default useAxios;

import React, { useState } from 'react';
import useAxios from 'axios-hooks';

export const useActivityStore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sortDir, setSortDir] = useState('DESC');
  const [sortBy, setSortBy] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const [{ data: response, loading }, reFetch] = useAxios({
    method: 'get',
    url: `/dashboard/v1/users/log/list?page=${page}&page_size=${pageSize}&sort_by=${
      sortBy || 'id'
    }&sort_dir=${sortDir}&search=${search || '%20'}`,
  });

  return {
    activityList: response?.data || [],
    isLoading,
    loading,
    metaList: response?.meta,
    page,
    pageSize,
    search,
    setPage,
    setPageSize,
    setSortBy,
    setSearch,
    setSortDir,
  };
};

export const ActivityContext = React.createContext({});

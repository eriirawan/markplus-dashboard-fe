import React, { useState, useContext } from 'react';
import useAxios from 'axios-hooks';
import { axios } from '../../hooks/useAxios';
import { enqueueSnackbar } from 'notistack';

import { encodeQueryData } from '@/helpers/Utils';
import { AppContext } from '../../context/AppContext';

export const useEvidenceStore = () => {
  const { clientSelected } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [evidenceId, setEvidenceId] = useState(null);
  const [sortDir, setSortDir] = useState('ASC');
  const [sortBy, setSortBy] = useState('created_at');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const data = {
    page,
    page_size: pageSize,
    sort_by: sortBy || 'id',
    sort_dir: sortDir,
    search: search,
  };

  const querystring = encodeQueryData(data);

  const [{ data: response, loading }, reFetch] = useAxios(
    {
      url: `/dashboard/v1/evidences/user/${clientSelected?.id}/list?${querystring}`,
      method: 'get',
    },
    {
      manual: !clientSelected?.id,
    }
  );

  const [, deleteEvidence] = useAxios(
    {
      url: `/dashboard/v1/evidences/${evidenceId}`,
      method: 'delete',
    },
    {
      manual: true,
    }
  );

  const [, addEvidence] = useAxios(
    {
      url: `/dashboard/v1/evidences/add`,
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
    },
    {
      manual: true,
    }
  );

  const [, renameFile] = useAxios(
    {
      url: `/dashboard/v1/evidences/update`,
      method: 'put',
    },
    {
      manual: true,
    }
  );

  const handleFileInputChange = async (inputFile) => {
    setIsLoading(true);
    try {
      const file = await addEvidence({
        data: {
          file: inputFile[0],
          user_id: clientSelected?.id,
        },
      });

      if (file?.status === 200) {
        reFetch();
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleRenameFile = async (fileName, cb) => {
    setIsLoading(true);
    try {
      const file = await renameFile({
        data: {
          name: fileName,
          evidence_id: evidenceId,
        },
      });

      if (file?.status === 200) {
        reFetch();
      }
      cb(false);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleDelete = async (cb) => {
    const deleteAct = await deleteEvidence();
    if (deleteAct.status === 200) {
      enqueueSnackbar('Evidence deleted successfully.', {
        variant: 'successSnackbar',
      });
      reFetch();
      cb(false);
    }
  };

  return {
    isLoading,
    setEvidenceId,
    evidenceId,
    setSortDir,
    setSortBy,
    loading,
    page,
    pageSize,
    setPage,
    setPageSize,
    setSearch,
    search,
    evidenceList: response?.data || [],
    metaList: response?.meta,
    reFetch,
    handleFileInputChange,
    clientSelected,
    handleDelete,
    handleRenameFile,
  };
};

export const EvidenceContext = React.createContext();

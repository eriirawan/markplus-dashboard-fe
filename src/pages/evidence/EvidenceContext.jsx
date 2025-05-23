import React, { useState, useContext } from 'react';
import useAxios from 'axios-hooks';
import { enqueueSnackbar } from 'notistack';

import { encodeQueryData } from '@/helpers/Utils';
import { AppContext } from '../../context/AppContext';

export const useEvidenceStore = () => {
  const { clientSelected } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [evidenceId, setEvidenceId] = useState(null);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [sortDir, setSortDir] = useState('ASC');
  const [sortBy, setSortBy] = useState('created_at');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [folder, setFolder] = useState([]);

  const data = {
    page,
    page_size: pageSize,
    sort_by: sortBy || 'id',
    sort_dir: sortDir,
    search: search,
    folder_id: folder?.length > 0 ? folder[folder?.length - 1]?.id : undefined,
  };

  const querystring = encodeQueryData(data);

  const [{ data: response, loading }, reFetch] = useAxios(
    {
      url: `/dashboard/v1/evidences/user/${clientSelected?.id}/folder/list?${querystring}`,
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

  const [, renameFolder] = useAxios(
    {
      url: `/dashboard/v1/folders/update`,
      method: 'put',
    },
    {
      manual: true,
    }
  );

  const [, addFolder] = useAxios(
    {
      url: `/dashboard/v1/folders/add`,
      method: 'post',
    },
    {
      manual: true,
    }
  );

  const [, deleteFolder] = useAxios(
    {
      url: `/dashboard/v1/folders/${evidenceId}`,
      method: 'delete',
    },
    {
      manual: true,
    }
  );

  const handleFileInputChange = async (inputFile) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      inputFile?.forEach((file) => formData?.append('files', file));
      formData?.append('user_id', clientSelected?.id);
      if (folder?.length > 0) {
        formData?.append('folder_id', folder[folder?.length - 1]?.id || undefined);
      }

      const file = await addEvidence({
        data: formData,
      });

      if (file?.status === 200) {
        enqueueSnackbar('Evidence created successfully.', {
          variant: 'successSnackbar',
        });
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
      let file;
      if (selectedEvidence?.isFolder) {
        file = await renameFolder({
          data: {
            name: fileName,
            folder_id: evidenceId,
          },
        });
      } else {
        file = await renameFile({
          data: {
            name: fileName,
            evidence_id: evidenceId,
          },
        });
      }

      if (file?.status === 200) {
        enqueueSnackbar('Evidence updated successfully.', {
          variant: 'successSnackbar',
        });
        reFetch();
      }
      cb(false);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleAddFolder = async (fileName, cb) => {
    const addFolderAct = await addFolder({
      data: {
        user_id: clientSelected?.id,
        name: fileName,
        parent_id: folder[folder?.length - 1]?.id || undefined,
      },
    });
    if (addFolderAct.status === 200) {
      enqueueSnackbar('Folder created successfully.', {
        variant: 'successSnackbar',
      });
      reFetch();
      cb(false);
    }
  };

  const handleDelete = async (cb) => {
    if (!selectedEvidence?.isFolder) {
      const deleteAct = await deleteEvidence();
      if (deleteAct.status === 200) {
        enqueueSnackbar('Evidence deleted successfully.', {
          variant: 'successSnackbar',
        });
        reFetch();
        cb(false);
      }
    } else {
      const deleteAct = await deleteFolder();
      if (deleteAct.status === 200) {
        enqueueSnackbar('Folder deleted successfully.', {
          variant: 'successSnackbar',
        });
        reFetch();
        cb(false);
      }
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
    setFolder,
    folder,
    setSelectedEvidence,
    selectedEvidence,
    handleAddFolder,
  };
};

export const EvidenceContext = React.createContext();

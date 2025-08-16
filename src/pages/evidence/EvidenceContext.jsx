import React, { useState, useContext, useEffect } from 'react';
import useAxios from 'axios-hooks';
import { enqueueSnackbar } from 'notistack';

import { encodeQueryData } from '@/helpers/Utils';
import { AppContext } from '../../context/AppContext';

/**
 * @typedef {Object} EvidenceItem
 * @property {string} id - Evidence ID
 * @property {string} name - Evidence name
 * @property {string} [file_url] - URL to the evidence file
 * @property {number} [size] - File size in bytes
 * @property {string} [created_at] - Creation timestamp
 * @property {string} [updated_at] - Last update timestamp
 * @property {boolean} [isFolder] - Whether the item is a folder
 * @property {string} [folder_id] - ID of the parent folder
 * @property {string} [user_id] - ID of the user who owns the evidence
 */

/**
 * @typedef {Object} FolderItem
 * @property {string} id - Folder ID
 * @property {string} name - Folder name
 * @property {string} [created_at] - Creation timestamp
 * @property {string} [updated_at] - Last update timestamp
 * @property {string} [parent_id] - ID of the parent folder
 * @property {string} [user_id] - ID of the user who owns the folder
 */

/**
 * @typedef {Object} EvidenceListResponse
 * @property {Array<EvidenceItem|FolderItem>} data - List of evidence items and folders
 * @property {Object} meta - Pagination metadata
 * @property {number} meta.total_data - Total number of items
 * @property {number} meta.total_page - Total number of pages
 */

/**
 * @typedef {Object} EvidenceContextType
 * @property {boolean} isLoading - Loading state
 * @property {string|null} evidenceId - ID of the selected evidence
 * @property {EvidenceItem|null} selectedEvidence - Selected evidence item
 * @property {string} sortDir - Sort direction ('ASC' or 'DESC')
 * @property {string|null} sortBy - Field to sort by
 * @property {number} pageSize - Number of items per page
 * @property {number} page - Current page number
 * @property {string} search - Search query
 * @property {Array<FolderItem>} folder - Current folder navigation path
 * @property {Array<EvidenceItem|FolderItem>} evidenceList - List of evidence items
 * @property {Object} metaList - Pagination metadata
 * @property {boolean} loading - Loading state from API
 * @property {function(): void} reFetch - Refetch evidence list
 * @property {function(Object): Promise} deleteEvidence - Delete an evidence item
 * @property {function(Object): Promise} addEvidence - Add a new evidence item
 * @property {function(Object): Promise} renameFile - Rename an evidence file
 * @property {function(Object): Promise} renameFolder - Rename a folder
 * @property {function(Object): Promise} addFolder - Add a new folder
 * @property {function(Object): Promise} deleteFolder - Delete a folder
 * @property {function(string|null): void} setEvidenceId - Set the selected evidence ID
 * @property {function(EvidenceItem|null): void} setSelectedEvidence - Set the selected evidence
 * @property {function(string): void} setSortDir - Set the sort direction
 * @property {function(string|null): void} setSortBy - Set the field to sort by
 * @property {function(number): void} setPageSize - Set the page size
 * @property {function(number): void} setPage - Set the current page
 * @property {function(string): void} setSearch - Set the search query
 * @property {function(Array<FolderItem>|function): void} setFolder - Set the current folder path
 * @property {function(boolean): void} setIsLoading - Set the loading state
 * @property {function(Object): Promise} handleDelete - Handle evidence deletion
 * @property {function(Object): Promise} handleRenameFile - Handle file renaming
 * @property {function(Object): Promise} handleRenameFolder - Handle folder renaming
 * @property {function(Object): Promise} handleAddFolder - Handle folder creation
 * @property {function(Event): void} handleFileInputChange - Handle file input change event
 * @property {Object|null} clientSelected - Currently selected client
 */

/**
 * Custom hook that provides the evidence context state
 * @returns {EvidenceContextType} The evidence context state
 */
export const useEvidenceStore = () => {
  const { clientSelected, isUserRole, me, setClientSelected } = useContext(AppContext);
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
    page: page ? page.toString() : '1',
    page_size: pageSize,
    sort_by: sortBy || 'id',
    sort_dir: sortDir,
    search: search,
    folder_id:
      folder && folder.length > 0 ? (folder[folder.length - 1] ? folder[folder.length - 1].id : undefined) : undefined,
  };

  const querystring = encodeQueryData(data);
  useEffect(() => {
    if (isUserRole && me?.id) {
      setClientSelected(me);
    }
  }, [isUserRole, me]);
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
      url: `/dashboard/v1/evidences/${evidenceId ? evidenceId.toString() : ''}`,
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
      url: `/dashboard/v1/folders/${evidenceId ? evidenceId.toString() : ''}`,
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
      if (inputFile && formData) {
        inputFile.forEach((file) => formData.append('files', file));
      }
      if (formData && clientSelected) {
        formData.append('user_id', clientSelected.id);
      }
      if (folder && folder.length > 0 && formData) {
        const lastFolder = folder[folder.length - 1];
        if (lastFolder && lastFolder.id) {
          formData.append('folder_id', lastFolder.id);
        }
      }

      const file = await addEvidence({
        data: formData,
      });

      if (file?.status === 200) {
        enqueueSnackbar('Evidence created successfully.', {
          variant: 'success',
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
            folder_id: evidenceId ? evidenceId.toString() : '',
          },
        });
      } else {
        file = await renameFile({
          data: {
            name: fileName,
            evidence_id: evidenceId ? evidenceId.toString() : '',
          },
        });
      }

      if (file?.status === 200) {
        enqueueSnackbar('Evidence updated successfully.', {
          variant: 'success',
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
        user_id: clientSelected ? clientSelected.id : '',
        name: fileName,
        parent_id: folder && folder.length > 0 && folder[folder.length - 1] ? folder[folder.length - 1].id : undefined,
      },
    });
    if (addFolderAct.status === 200) {
      enqueueSnackbar('Folder created successfully.', {
        variant: 'success',
      });
      reFetch();
      cb(false);
    }
  };

  const handleRenameFolder = async (folderName, cb) => {
    setIsLoading(true);
    try {
      const result = await renameFolder({
        data: {
          name: folderName,
          folder_id: evidenceId ? evidenceId.toString() : '',
        },
      });

      if (result?.status === 200) {
        enqueueSnackbar('Folder renamed successfully.', {
          variant: 'success',
        });
        reFetch();
      }
      cb(false);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleDelete = async (cb) => {
    if (!selectedEvidence?.isFolder) {
      const deleteAct = await deleteEvidence();
      if (deleteAct.status === 200) {
        enqueueSnackbar('Evidence deleted successfully.', {
          variant: 'success',
        });
        reFetch();
        cb(false);
      }
    } else {
      const deleteAct = await deleteFolder();
      if (deleteAct.status === 200) {
        enqueueSnackbar('Folder deleted successfully.', {
          variant: 'success',
        });
        reFetch();
        cb(false);
      }
    }
  };

  return {
    isLoading,
    evidenceId,
    selectedEvidence,
    sortDir,
    sortBy,
    pageSize,
    page,
    search,
    folder,
    evidenceList: response?.data || [],
    metaList: response?.meta || {},
    loading,
    reFetch,
    deleteEvidence,
    addEvidence,
    renameFile,
    renameFolder,
    addFolder,
    deleteFolder,
    setEvidenceId,
    setSelectedEvidence,
    setSortDir,
    setSortBy,
    setPageSize,
    setPage,
    setSearch,
    setFolder,
    setIsLoading,
    handleDelete,
    handleRenameFile,
    handleRenameFolder,
    handleAddFolder,
    handleFileInputChange,
    clientSelected,
  };
};

/**
 * Evidence context for evidence management state
 * @type {React.Context<EvidenceContextType>}
 */
export const EvidenceContext = React.createContext({
  isLoading: false,
  evidenceId: null,
  selectedEvidence: null,
  sortDir: 'ASC',
  sortBy: 'created_at',
  pageSize: 10,
  page: 1,
  search: '',
  folder: [],
  evidenceList: [],
  metaList: { total_data: 0, total_page: 1 },
  loading: false,
  reFetch: () => {},
  deleteEvidence: async () => {},
  addEvidence: async () => {},
  renameFile: async () => {},
  renameFolder: async () => {},
  addFolder: async () => {},
  deleteFolder: async () => {},
  setEvidenceId: () => {},
  setSelectedEvidence: () => {},
  setSortDir: () => {},
  setSortBy: () => {},
  setPageSize: () => {},
  setPage: () => {},
  setSearch: () => {},
  setFolder: () => {},
  setIsLoading: () => {},
  handleDelete: async () => {},
  handleRenameFile: async () => {},
  handleRenameFolder: async () => {},
  handleAddFolder: async () => {},
  handleFileInputChange: () => {},
  clientSelected: null,
});

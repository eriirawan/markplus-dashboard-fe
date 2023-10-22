import { useCallback, useContext, useState } from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  TextField,
  Breadcrumbs,
  InputAdornment,
  MenuItem,
  IconButton,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  Select,
} from '@mui/material';
import {
  Search,
  Edit,
  Delete,
  InsertDriveFileOutlined,
  GridViewOutlined,
  ReorderOutlined,
  MoreVertOutlined,
  FolderOutlined,
  Add,
} from '@mui/icons-material';
import { MaterialReactTable } from 'material-react-table';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { getWindowDimensions, ISODateToLuxon, formatBytes } from '@/helpers/Utils';
import { appBarHeight } from '@/helpers/Constants';
import Loading from '@/components/Loading';
import Upload from '../../components/UploadFile';
import GeneralDeletePopup from '@/components/DeletePopup';
import { EvidenceContext, useEvidenceStore } from './EvidenceContext';
import MPDropdown from '@/components/mp-dropdown/MPDropdown';
import { AppContext } from '../../context/AppContext';

const Evidence = () => {
  const { me, isUserRole } = useContext(AppContext);
  const store = useEvidenceStore();
  const location = useLocation();
  // const navigate = useNavigate();
  const windowDimensions = getWindowDimensions();
  const [sort, setSort] = useState('NEWTOOLD');
  const [search, setSearch] = useState(undefined);
  const [isGridView, setGridView] = useState(false);
  const [openPopupDelete, setOpenPopupDelete] = useState(false);
  const [openPopupRename, setOpenPopupRename] = useState(false);
  const [openAddFolder, setOpenAddFolder] = useState(false);
  const [fileName, setFileName] = useState(undefined);
  const [folderName, setFolderName] = useState('New Folder');

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      size: 500,
      Cell: (params) => (
        <Stack direction="row" alignItems="center" gap={0.5}>
          {params?.row?.original?.isFolder ? <FolderOutlined /> : <InsertDriveFileOutlined />}
          <Typography
            sx={{ color: 'black', cursor: 'pointer' }}
            onClick={() => {
              if (params?.row?.original?.isFolder) {
                store.setFolder((prevState) => {
                  return [...prevState, params?.row?.original];
                });
              } else {
                window.open(params?.row?.original?.file_url);
              }
            }}
          >
            {params?.cell?.getValue()}
          </Typography>
        </Stack>
      ),
    },
    {
      accessorKey: 'size',
      header: 'File Size',
      size: 142,
      muiTableHeadCellProps: { align: 'center' },
      muiTableBodyCellProps: { align: 'center' },
      Cell: (params) => (params?.row?.original?.isFolder ? '-' : formatBytes(params?.cell?.getValue())),
    },
    {
      accessorKey: 'created_at',
      header: 'Date Uploaded',
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: (params) => ISODateToLuxon(params?.cell?.getValue())?.toFormat('MMM dd, yyyy') || '-',
    },
    {
      accessorKey: 'updated_at',
      header: 'Last Updated',
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: (params) => ISODateToLuxon(params?.cell?.getValue())?.toFormat('MMM dd, yyyy') || '-',
    },
    {
      accessorKey: 'action',
      header: 'Action',
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },

      Cell: (params) => (
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5}>
          <Edit
            sx={{ cursor: 'pointer', fontSize: 20 }}
            onClick={() => {
              store?.setEvidenceId(params?.row?.original?.id);
              setFileName(params?.row?.original?.name);
              store?.setSelectedEvidence(params?.row?.original);
              setOpenPopupRename(true);
            }}
          />
          <Delete
            sx={{ color: '#E56363', fontSize: 20, cursor: 'pointer' }}
            onClick={() => {
              store?.setEvidenceId(params?.row?.original?.id);
              setOpenPopupDelete(true);
            }}
          />
        </Stack>
      ),
    },
  ];

  const handleChange = (event) => {
    if (event.target.value === 'ASC' || event.target.value === 'DESC') {
      store?.setSortDir(event.target.value);
      store?.setSortBy(null);
    }
    if (event.target.value === 'OLDTONEW') {
      store?.setSortBy('created_at');
      store?.setSortDir('DESC');
    }
    if (event.target.value === 'NEWTOOLD') {
      store?.setSortBy('created_at');
      store?.setSortDir('ASC');
    }
    if (event.target.value === 'updated_at') {
      store?.setSortDir('ASC');
      store?.setSortBy('updated_at');
    }
    setSort(event.target.value);
  };

  return (
    <EvidenceContext.Provider value={store}>
      <Loading open={store?.isLoading || store?.loading} />
      <GeneralDeletePopup
        open={openPopupDelete}
        handleCancel={() => setOpenPopupDelete(false)}
        handleSave={() => store.handleDelete(setOpenPopupDelete)}
        title="Confirm Delete?"
        message="Do you want to delete user"
      />
      <Dialog
        key={store?.evidenceId}
        open={openPopupRename}
        onClose={() => setOpenPopupRename(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography>{`Rename ${store?.selectedEvidence?.isFolder ? 'Folder' : 'File'}`}</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            value={fileName}
            placeholder="File Name"
            sx={{ width: 450 }}
            variant="outlined"
            size="small"
            autoFocus
            onChange={(e) => setFileName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenPopupRename(false)}>
            Cancel
          </Button>
          <Button onClick={() => store?.handleRenameFile(fileName, setOpenPopupRename)}>Apply</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openAddFolder}
        onClose={() => setOpenAddFolder(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography>New Folder</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            value={folderName}
            placeholder="New Folder"
            sx={{ width: 450 }}
            variant="outlined"
            size="small"
            autoFocus
            onChange={(e) => setFolderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenAddFolder(false)}>
            Cancel
          </Button>
          <Button onClick={() => store?.handleAddFolder(folderName, setOpenAddFolder)}>Add</Button>
        </DialogActions>
      </Dialog>
      <Paper sx={{ display: 'flex', height: windowDimensions.height - (appBarHeight + 10), p: 4 }}>
        <Stack width="100%" height="100%">
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h2" color="primary.main" textTransform="capitalize" pb={2}>
              {location.pathname.replace(/[^a-z0-9]/g, ' ').trim()} Page
            </Typography>
            <Button size="medium" startIcon={<Add />} onClick={() => setOpenAddFolder(true)}>
              New Folder
            </Button>
          </Stack>
          <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon sx={{ fontSize: 11 }} />}>
            <Link to="/home" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="text.primary">
                Home
              </Typography>
            </Link>
            <Link to="/evidence" style={{ textDecoration: 'none' }} onClick={() => store?.setFolder([])}>
              <Typography variant="body2" color="text.primary">
                root
              </Typography>
            </Link>
            {store?.folder?.length > 1 &&
              [...store?.folder].splice(0, store?.folder.length - 1)?.map?.((item) => (
                <Link
                  to="/evidence"
                  style={{ textDecoration: 'none' }}
                  onClick={() =>
                    store?.setFolder((prevState) =>
                      prevState.slice(0, prevState.findIndex((folder) => folder.id === item?.id) + 1)
                    )
                  }
                >
                  <Typography variant="body2" color="text.primary" textTransform="capitalize">
                    {item?.name.trim()}
                  </Typography>
                </Link>
              ))}
            {store?.folder?.length > 0 && (
              <Typography variant="body2" color="primary.main" textTransform="capitalize">
                {store?.folder[store?.folder?.length - 1]?.name.trim()}
              </Typography>
            )}
          </Breadcrumbs>
          <Stack sx={{ overflowY: 'scroll', pt: 3, flex: 1 }}>
            {me.role?.toLowerCase() !== 'user' && (
              <Upload
                key={store?.folder[store?.folder?.length - 1]?.id || store?.clientSelected?.id}
                handleSave={store?.handleFileInputChange}
                isHaveFile={false}
                maxSize={20000000}
                disabled={!store?.clientSelected?.id}
              />
            )}
            {store?.evidenceList?.evidences?.length === 0 && store?.evidenceList?.subFolders?.length === 0 ? (
              <Stack sx={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Typography color="#000000" variant="h2">
                  No evidence attachment created yet
                </Typography>
                {me.role?.toLowerCase() !== 'user' && (
                  <>
                    <Typography color="#808080" variant="body1" sx={{ mt: 1 }}>
                      Click button below to start Upload
                    </Typography>
                    <Upload
                      key={store?.folder[store?.folder?.length - 1]?.id || store?.clientSelected?.id}
                      noDisplay
                      handleSave={store?.handleFileInputChange}
                      isHaveFile={false}
                      maxSize={20000000}
                      disabled={!store?.clientSelected?.id}
                    >
                      <Button disabled={!store?.clientSelected?.id} sx={{ width: 256, mt: 2 }}>
                        Upload File
                      </Button>
                    </Upload>
                  </>
                )}
              </Stack>
            ) : (
              <>
                <Stack direction="row" mt={isUserRole ? 0 : 4} justifyContent="space-between" width="100%">
                  <TextField
                    value={search}
                    label="Search"
                    placeholder="Search by name"
                    sx={{ mr: 2, width: 528 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        store?.setSearch(search);
                      }
                    }}
                  />
                  <Stack direction="row" gap={2}>
                    <TextField
                      value={sort}
                      onChange={handleChange}
                      select
                      label="Sort by"
                      InputLabelProps={{ shrink: true }}
                      sx={{ width: 256 }}
                    >
                      <MenuItem key={1} value="ASC">
                        A to Z
                      </MenuItem>
                      <MenuItem key={2} value="DESC">
                        Z to A
                      </MenuItem>
                      <MenuItem key={3} value="OLDTONEW">
                        Oldest to Newest
                      </MenuItem>
                      <MenuItem key={4} value="NEWTOOLD">
                        Newest to Oldest
                      </MenuItem>
                      <MenuItem key={5} value="updated_at">
                        Recently updated
                      </MenuItem>
                    </TextField>
                    <IconButton onClick={() => setGridView(!isGridView)}>
                      {isGridView ? <ReorderOutlined /> : <GridViewOutlined />}
                    </IconButton>
                  </Stack>
                </Stack>
                <Box sx={{ pt: 4, width: '100%' }}>
                  {!isGridView ? (
                    <Box sx={{ display: 'flex', minHeight: 400 }}>
                      <MaterialReactTable
                        columns={columns}
                        data={
                          store?.evidenceList?.evidences?.length > 0 || store?.evidenceList?.subFolders?.length > 0
                            ? [
                                ...store?.evidenceList?.subFolders?.map((item) => ({
                                  ...item,
                                  nanoId: item?.id,
                                  isFolder: true,
                                })),
                                ...store?.evidenceList?.evidences?.map((item) => ({ ...item, nanoId: item?.id })),
                              ]
                            : []
                        }
                        enablePagination={false}
                        enableSorting={false}
                        enableFilters={false}
                        enablePinning={false}
                        enableColumnActions={false}
                        enableColumnFilters={false}
                        enableBottomToolbar={false}
                        enableTopToolbar={false}
                        muiTableProps={{
                          sx: {
                            tableLayout: 'fixed',
                          },
                        }}
                        renderEmptyRowsFallback={() => (
                          <Stack minHeight={400} justifyContent="center" fontStyle="italic">
                            <Typography sx={{ textAlign: 'center' }}>No records to display</Typography>
                          </Stack>
                        )}
                        muiTableHeadCellProps={{
                          sx: {
                            border: 1,
                            fontWeight: 'bold',
                            bgcolor: 'primary.main',
                            opacity: 0.9,
                            borderColor: 'white',
                            color: 'white',
                          },
                        }}
                        initialState={{
                          columnPinning: { right: ['action'] },
                          columnVisibility: { action: me?.role?.toLowerCase() !== 'user' },
                        }}
                      />
                    </Box>
                  ) : (
                    <Grid container spacing={1}>
                      {store?.evidenceList?.subFolders?.length > 0 && (
                        <Grid item>
                          <Typography variant="h4">Folder</Typography>
                        </Grid>
                      )}
                      <Grid item container spacing={2}>
                        {store?.evidenceList?.subFolders?.map((item) => (
                          <Grid item xs={3}>
                            <Paper
                              sx={{ p: 2, bgcolor: '#f3f6fb', cursor: 'pointer' }}
                              onClick={() =>
                                store.setFolder((prevState) => {
                                  return [...prevState, item];
                                })
                              }
                            >
                              <Stack
                                direction="row"
                                justifyContent={isUserRole ? 'left' : 'space-between'}
                                alignItems="center"
                                spacing={1}
                              >
                                <FolderOutlined sx={{ fontSize: 20 }} />
                                <Typography
                                  sx={{
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {item?.name}
                                </Typography>
                                {me?.role?.toLowerCase() !== 'user' && (
                                  <MPDropdown
                                    renderTrigger={({ setAnchorEl }) => (
                                      <IconButton onClick={setAnchorEl}>
                                        <MoreVertOutlined sx={{ fontSize: 18 }} />
                                      </IconButton>
                                    )}
                                    menus={[
                                      {
                                        label: 'Edit',
                                        onClick: () => {
                                          store?.setEvidenceId(item?.id);
                                          setFileName(item?.name);
                                          setOpenPopupRename(true);
                                        },
                                      },
                                      {
                                        label: 'Delete',
                                        onClick: () => {
                                          store?.setEvidenceId(item?.id);
                                          setOpenPopupDelete(true);
                                        },
                                      },
                                    ]}
                                  />
                                )}
                              </Stack>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                      <Grid item>
                        <Typography variant="h4">File</Typography>
                      </Grid>
                      <Grid item container spacing={2}>
                        {store?.evidenceList?.evidences?.length > 0 ? (
                          store?.evidenceList?.evidences?.map((item) => (
                            <Grid item xs={3}>
                              <Paper
                                sx={{ display: 'flex', height: 280, p: 2, bgcolor: '#f3f6fb', flexDirection: 'column' }}
                              >
                                <Stack
                                  direction="row"
                                  justifyContent={isUserRole ? 'left' : 'space-between'}
                                  alignItems="center"
                                  mb={2}
                                  spacing={1}
                                >
                                  <InsertDriveFileOutlined sx={{ fontSize: 20 }} />
                                  <Typography
                                    sx={{
                                      textAlign: 'center',
                                      cursor: 'pointer',
                                      textOverflow: 'ellipsis',
                                      overflow: 'hidden',
                                      whiteSpace: 'nowrap',
                                    }}
                                    onClick={() => window.open(item?.file_url)}
                                  >
                                    {item?.name}
                                  </Typography>
                                  {me?.role?.toLowerCase() !== 'user' && (
                                    <MPDropdown
                                      renderTrigger={({ setAnchorEl }) => (
                                        <IconButton onClick={setAnchorEl}>
                                          <MoreVertOutlined sx={{ fontSize: 18 }} />
                                        </IconButton>
                                      )}
                                      menus={[
                                        {
                                          label: 'Edit',
                                          onClick: () => {
                                            store?.setEvidenceId(item?.id);
                                            setFileName(item?.name);
                                            setOpenPopupRename(true);
                                          },
                                        },
                                        {
                                          label: 'Delete',
                                          onClick: () => {
                                            store?.setEvidenceId(item?.id);
                                            setOpenPopupDelete(true);
                                          },
                                        },
                                      ]}
                                    />
                                  )}
                                </Stack>
                                <Box
                                  px={1}
                                  component="img"
                                  src={item?.file_url}
                                  height={200}
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = DefaultImg;
                                  }}
                                />
                              </Paper>
                            </Grid>
                          ))
                        ) : (
                          <Stack sx={{ justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: 300 }}>
                            <Typography color="#000000" variant="h2">
                              No evidence attachment created yet
                            </Typography>
                            {me.role?.toLowerCase() !== 'user' && (
                              <>
                                <Typography color="#808080" variant="body1" sx={{ mt: 1 }}>
                                  Click button below to start Upload
                                </Typography>
                                <Upload
                                  noDisplay
                                  handleSave={store?.handleFileInputChange}
                                  isHaveFile={false}
                                  maxSize={20000000}
                                  disabled={!store?.clientSelected?.id}
                                >
                                  <Button disabled={!store?.clientSelected?.id} sx={{ width: 256, mt: 2 }}>
                                    Upload File
                                  </Button>
                                </Upload>
                              </>
                            )}
                          </Stack>
                        )}
                      </Grid>
                    </Grid>
                  )}
                </Box>
              </>
            )}
          </Stack>
          {store?.evidenceList?.evidences?.length > 0 ||
            (store?.evidenceList?.subFolders?.length > 0 && (
              <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  page={store?.page || 1}
                  count={store?.metaList?.total_page || 1}
                  color="primary"
                  sx={{ display: 'flex', flex: 1, justifyContent: 'right', color: 'primary.main' }}
                  onChange={(e, val) => store?.setPage(val)}
                />
                <Box
                  sx={{
                    alignItems: 'center',
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'right',
                    color: 'primary.main',
                  }}
                >
                  Show
                  <Select
                    size="small"
                    value={store?.pageSize}
                    sx={{ mx: 1, color: 'inherit' }}
                    onChange={(e) => {
                      store?.setPageSize(e.target.value);
                      store?.setPage(
                        page > Math.ceil(store?.metaList?.total_data / e.target.value)
                          ? Math.ceil(store?.metaList?.total_data / e.target.value)
                          : page
                      );
                    }}
                  >
                    {[5, 10, 20, 50, 100].map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  {`of ${store?.metaList?.total_data || 0} entries`}
                </Box>
              </Box>
            ))}
        </Stack>
      </Paper>
    </EvidenceContext.Provider>
  );
};

export default Evidence;

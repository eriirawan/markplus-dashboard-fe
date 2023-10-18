import { useCallback, useContext, useState } from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  TextField,
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
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { MaterialReactTable } from 'material-react-table';

import { getWindowDimensions, ISODateToLuxon, formatBytes } from '@/helpers/Utils';
import { appBarHeight } from '@/helpers/Constants';
import Loading from '@/components/Loading';
import Upload from '../../components/UploadFile';
import GeneralDeletePopup from '@/components/DeletePopup';
import { EvidenceContext, useEvidenceStore } from './EvidenceContext';
import MPDropdown from '@/components/mp-dropdown/MPDropdown';

const Evidence = () => {
  const store = useEvidenceStore();
  const location = useLocation();
  const windowDimensions = getWindowDimensions();
  const [sort, setSort] = useState('NEWTOOLD');
  const [search, setSearch] = useState(undefined);
  const [isGridView, setGridView] = useState(false);
  const [openPopupDelete, setOpenPopupDelete] = useState(false);
  const [openPopupRename, setOpenPopupRename] = useState(false);
  const [fileName, setFileName] = useState(undefined);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      size: 500,
      Cell: (params) => (
        <Stack direction="row" alignItems="center" gap={0.5}>
          <InsertDriveFileOutlined />
          <Typography
            sx={{ color: 'black', cursor: 'pointer' }}
            onClick={() => window.open(params?.row?.original?.file_url)}
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
      Cell: (params) => formatBytes(params?.cell?.getValue()),
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
          <Typography>Rename File</Typography>
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
      <Paper sx={{ display: 'flex', height: windowDimensions.height - (appBarHeight + 10), p: 4 }}>
        <Stack width="100%" height="100%">
          <Typography variant="h2" color="primary.main" textTransform="capitalize">
            {location.pathname.replace(/[^a-z0-9]/g, ' ').trim()} Page
          </Typography>
          <Stack sx={{ overflowY: 'scroll', pt: 2, flex: 1 }}>
            <Upload
              key={store?.clientSelected?.id}
              handleSave={store?.handleFileInputChange}
              isHaveFile={false}
              maxSize={20000000}
              disabled={!store?.clientSelected?.id}
            />
            {store?.evidenceList?.length === 0 ? (
              <Stack sx={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Typography color="#000000" variant="h2">
                  No evidence attachment created yet
                </Typography>
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
              </Stack>
            ) : (
              <>
                <Stack direction="row" pt={4.25} justifyContent="space-between" width="100%">
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
                          store?.evidenceList?.length > 0
                            ? store?.evidenceList?.map((item) => ({ ...item, nanoId: item?.id }))
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
                        initialState={{ columnPinning: { right: ['action'] } }}
                      />
                    </Box>
                  ) : (
                    <Grid container spacing={2}>
                      {store?.evidenceList?.map((item) => (
                        <Grid item xs={3}>
                          <Paper
                            sx={{ display: 'flex', height: 280, p: 2, bgcolor: '#f3f6fb', flexDirection: 'column' }}
                          >
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                              <InsertDriveFileOutlined sx={{ fontSize: 20 }} />
                              <Typography
                                sx={{ textAlign: 'center', cursor: 'pointer' }}
                                onClick={() => window.open(item?.file_url)}
                              >
                                {item?.name}
                              </Typography>
                              {/* <MoreVertOutlined sx={{ fontSize: 18 }} /> */}
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
                      ))}
                    </Grid>
                  )}
                </Box>
              </>
            )}
          </Stack>
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              page={store?.page || 1}
              count={store?.metaList?.total_page || 1}
              color="primary"
              sx={{ display: 'flex', flex: 1, justifyContent: 'right', color: 'primary.main' }}
              onChange={(e, val) => store?.setPage(val)}
            />
            <Box
              sx={{ alignItems: 'center', flex: 1, display: 'flex', justifyContent: 'right', color: 'primary.main' }}
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
        </Stack>
      </Paper>
    </EvidenceContext.Provider>
  );
};

export default Evidence;

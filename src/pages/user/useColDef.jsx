import { ISODateToLuxon } from '@/helpers/Utils';
import { InfoOutlined, Edit, SettingsOutlined, Delete, MoreVert } from '@mui/icons-material';
import { Stack } from '@mui/material';
import React, { useContext, useMemo } from 'react';
import { AppContext } from '@/context/AppContext';

/**
 * Date cell renderer component
 * @param {Object} props - Cell props
 * @returns {string} Formatted date string
 */
const DateCellRenderer = ({ cell }) => {
  const value = cell?.getValue();
  return ISODateToLuxon(value)?.toFormat('dd MMMM yyyy') || '-';
};

/**
 * Action cell renderer component for mobile view
 * @param {Object} props - Cell props
 * @param {Function} handleOpenActionSheet - Function to open action sheet
 * @returns {React.ReactElement} Mobile action button
 */
const MobileActionCell = ({ row, handleOpenActionSheet }) => (
  <MoreVert sx={{ cursor: 'pointer' }} onClick={() => handleOpenActionSheet(row?.original?.id)} />
);

/**
 * Action cell renderer component for desktop view
 * @param {Object} props - Cell props
 * @param {Object} actions - Action functions
 * @returns {React.ReactElement} Desktop action buttons
 */
const DesktopActionCell = ({ row, actions }) => {
  const { setAction, setUserId, userDetail, setOpenPopup, setOpenPopupTheme, setOpenPopupDelete } = actions;

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5}>
      <InfoOutlined
        sx={{ cursor: 'pointer', fontSize: 20 }}
        onClick={() => {
          if (userDetail?.id === row?.original?.id) {
            setAction('detail');
            setOpenPopup(true);
          } else {
            setUserId(row?.original?.id);
            setAction('detail');
          }
        }}
      />
      <Edit
        sx={{ cursor: 'pointer', fontSize: 20 }}
        onClick={() => {
          if (userDetail?.id === row?.original?.id) {
            setAction('edit');
            setOpenPopup(true);
          } else {
            setUserId(row?.original?.id);
            setAction('edit');
          }
        }}
      />
      <SettingsOutlined
        onClick={() => {
          setOpenPopupTheme(true);
          setAction('');
          setUserId(row?.original?.id);
        }}
        sx={{ cursor: 'pointer', fontSize: 20 }}
      />
      <Delete
        sx={{ color: '#E56363', cursor: 'pointer', fontSize: 20 }}
        onClick={() => {
          setUserId(row?.original?.id);
          setOpenPopupDelete(true);
        }}
      />
    </Stack>
  );
};

/**
 * Hook to get column definitions for user table
 * @param {Object} props - Props containing functions for user actions
 * @returns {Array} Column definitions for the table
 */
const useColumnDef = ({ setOpenPopupDelete, handleOpenActionSheet, store }) => {
  // @ts-ignore
  const { setOpenPopupTheme, setAction, setUserId, userDetail, setOpenPopup } = store;
  const { isMobile } = useContext(AppContext);

  // Create an object with all action functions to pass to the action cell
  const actionFunctions = {
    setAction,
    setOpenPopup,
    setOpenPopupDelete,
    setOpenPopupTheme,
    setUserId,
    userDetail,
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'nanoId',
        header: 'ID',
        muiTableBodyCellProps: { align: 'center' },
        muiTableHeadCellProps: { align: 'center' },
        size: 50,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiTableBodyCellProps: { align: 'center' },
        muiTableHeadCellProps: { align: 'center' },
      },
      {
        accessorKey: 'first_name',
        header: 'First Name',
        muiTableBodyCellProps: { align: 'center' },
        muiTableHeadCellProps: { align: 'center' },
        size: 142,
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
        muiTableBodyCellProps: { align: 'center' },
        muiTableHeadCellProps: { align: 'center' },
        size: 141,
      },
      {
        accessorKey: 'company_logo_url',
        header: 'Profile Picture',
        muiTableBodyCellProps: { align: 'center' },
        muiTableHeadCellProps: { align: 'center' },
      },
      {
        accessorKey: 'role',
        header: 'Role',
        muiTableBodyCellProps: { align: 'center' },
        muiTableHeadCellProps: { align: 'center' },
        size: 127,
      },
      {
        Cell: (params) => <DateCellRenderer cell={params.cell} />,
        accessorKey: 'created_at',
        header: 'Active Date',
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableHeadCellProps: {
          align: 'center',
        },
        size: 171,
      },
      {
        Cell: (params) => <DateCellRenderer cell={params.cell} />,
        accessorKey: 'updated_at',
        header: 'Last Modified',
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableHeadCellProps: {
          align: 'center',
        },
        size: 171,
      },
      {
        Cell: (params) =>
          isMobile ? (
            <MobileActionCell row={params.row} handleOpenActionSheet={handleOpenActionSheet} />
          ) : (
            <DesktopActionCell row={params.row} actions={actionFunctions} />
          ),
        accessorKey: 'action',
        header: 'Action',
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableHeadCellProps: {
          align: 'center',
        },
        ...(isMobile && { size: 100 }),
      },
    ],
    [isMobile, userDetail, actionFunctions, handleOpenActionSheet]
  );

  return columns;
};

export default useColumnDef;

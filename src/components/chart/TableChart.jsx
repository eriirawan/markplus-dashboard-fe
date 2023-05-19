import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  IconButton,
  TableContainer,
  TableBody,
  TableRow,
  TableHead,
  Table,
  Pagination,
  TableCell,
  Paper,
  tableCellClasses,
} from '@mui/material';

const TableChart = () => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      padding: '10px 0 10px 16px',
      textAlign: 'center',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      backgroundColor: '#EEF0F5',
      lineHeight: '21px',
      padding: '10px 0 10px 16px',
    },
    [`&.${tableCellClasses.root}`]: {
      borderBottom: 'none',
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <Box sx={{ height: 768, my: 'auto', p: 2, width: '100%' }}>
      <TableContainer component={Paper}>
        <Table
          sx={{
            // minWidth: 700,
            '&.MuiTable-root': {
              borderCollapse: 'separate',
              borderSpacing: '2px',
            },
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ margin: '2px', border: 'none' }}>
            {rows?.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell
                  sx={{
                    margin: '2px',
                  }}
                  component="th"
                  scope="row"
                >
                  Content
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  Content
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  Content
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  Content
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  Content
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  Content
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  Content
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction={'row'} justifyContent="center" sx={{ marginTop: '40px' }}>
        <Pagination count={10}></Pagination>
      </Stack>
    </Box>
  );
};

export default TableChart;

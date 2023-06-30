/* eslint-disable import/prefer-default-export */
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(({ height }) => ({
  height: height || 480,
  width: '100%',
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 700,
    fontSize: 12,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#E9EEFA',
    color: '#212121',
  },
  '& .MuiDataGrid-row': {
    width: '100%',
    height: '34px',
    background: '#f8f9fc',
  },
  '& .MuiDataGrid-cell': {
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '17px',
    color: '#212121',
    boxSizing: 'none',
    borderBottom: 'none',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
    border: 'none',
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'red',
  },
  '& .MuiDataGrid-root': {
    '& .MuiDataGrid-colCell:focus': {
      outline: 'none',
    },
  },
  '& .MuiDataGrid-columnHeader--sortable:': {
    outline: 'none',
  },
}));

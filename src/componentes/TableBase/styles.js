import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(({ height, theme }) => ({
  height,
  width: '100%',
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 700,
  },
  '& .MuiDataGrid-columnHeaders': {
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: '#BE8B3C',
    color: theme.palette.secondary.main,
  },
  '& .MuiDataGrid-row': {
    width: '100%',
    height: '34px',
    background: '#f8f9fc',
  },
  '& .MuiDataGrid-cell': {
    fontWeight: 600,
    color: grey[600],
    boxSizing: 'none',
    borderBottom: 'none',
  },
}));

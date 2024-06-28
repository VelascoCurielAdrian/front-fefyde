import React from 'react';
import { Box } from '@mui/material';
import AllInboxSharpIcon from '@mui/icons-material/AllInboxSharp';

const EmptyRows = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      marginTop: 0.2,
      fontSize: 14,
    }}
    className="text-slate-700"
  >
    <AllInboxSharpIcon fontSize="large" />
    <Box
      sx={{ mt: 1 }}
    >
      No se encontraron resultados
    </Box>
  </Box>
);

export default EmptyRows;

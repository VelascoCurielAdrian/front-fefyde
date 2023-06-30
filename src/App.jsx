import React from 'react';
import bgLocale from 'date-fns/locale/es';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { AuthProvider } from './configuracion/auth';
import AppRouter from './configuracion/Routes/appRouter';
import { theme } from './configuracion/theme';
import Loading from './componentes/Loading';

const App = () => (
  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bgLocale}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <AppRouter />
        <Loading />
      </ThemeProvider>
    </AuthProvider>
  </LocalizationProvider>
);

export default App;

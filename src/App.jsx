import React, { Suspense } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js';

import ErrorSnackbar from '@/components/noti-snackbar/ErrorSnackbar';
import SuccessSnackbar from '@/components/noti-snackbar/SuccessSnackbar';
import Loading from '@/components/Loading';
import { AppContext, useStore } from './context/AppContext';
import AppRoutes from './routes';
import makeUseAxios from './hooks/useAxios';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);
makeUseAxios();

const App = () => {
  const store = useStore();

  return (
    <ThemeProvider theme={store.theme}>
      <AppContext.Provider value={store}>
        <SnackbarProvider
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          SnackbarProps={{ style: { maxWidth: '650px' } }}
          Components={{
            error: ErrorSnackbar,
            success: SuccessSnackbar,
          }}
        >
          <CssBaseline />
          <Suspense fallback={<Loading open />}>
            <AppRoutes />
          </Suspense>
        </SnackbarProvider>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;

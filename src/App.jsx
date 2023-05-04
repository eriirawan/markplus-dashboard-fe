import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Suspense } from 'react';

import { SnackbarProvider } from 'notistack';
import ErrorSnackbar from '@/components/noti-snackbar/ErrorSnackbar';
import SuccessSnackbar from '@/components/noti-snackbar/SuccessSnackbar';
import Loading from '@/components/Loading';
import { AppContext, useStore } from './context/AppContext';
import AppRoutes from './routes';
import theme from './theme';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const App = () => {
  const store = useStore();

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={store}>
        <SnackbarProvider
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          SnackbarProps={{ style: { maxWidth: '650px' } }}
          Components={{
            errorSnackbar: ErrorSnackbar,
            successSnackbar: SuccessSnackbar,
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

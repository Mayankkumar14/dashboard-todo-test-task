import './App.css';
import { Snackbar, Alert } from '@mui/material';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';

import Dashboard from './components/Dashboard/index';
import Header from './components/Header';
import { useAppState } from './state';

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/*',
    element: <Navigate to={'/dashboard'} />,
  }
]);

const App = () => {
  const { alert, setAlert } = useAppState();

  const handleSnackbarClose = () => {
    setAlert({
      open: false,
      message: '',
      type: 'info'
    })
  }

  return (
    <>
      <Header />
      <Snackbar 
        open={!!alert.open} 
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={alert.type} 
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

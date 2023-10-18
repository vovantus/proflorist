import './App.css';
import BouquetsPage from './pages/Bouquets/BouquetsPage';
import ViewBouquet from './pages/ViewBouquet/ViewBouquet';
import AddBouquet from './pages/AddBouquet/AddBouquetPage';
import Error404 from './pages/NotFound/404';
import EditBouquet from './pages/EditBouquet/EditBouquet';
import { createTheme, ThemeProvider } from '@mui/material';
import LoginPage from './pages/Login/LoginPage';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import URLS from './routes/urls';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes>
          <Route
            path={URLS.ADMIN}
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<BouquetsPage />} />
            <Route path={URLS.BOUQUET.VIEW} element={<ViewBouquet />} />
            <Route path={URLS.BOUQUET.EDIT} element={<EditBouquet />} />
            <Route path={URLS.BOUQUET.ADD} element={<AddBouquet />} />
          </Route>

          <Route path={URLS.LOGIN} element={<LoginPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

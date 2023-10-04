import './App.css';
import BouquetsPage from './pages/Bouquets/BouquetsPage';
import ViewBouquet from './pages/ViewBouquet/ViewBouquet';
import AddBouquet from './pages/AddBouquet/AddBouquetPage';
import Error404 from './pages/NotFound/404';
import EditBouquet from './pages/EditBouquet/EditBouquet';
import { createTheme, ThemeProvider } from '@mui/material';

import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/proflorist" element={<Layout />}>
          <Route index element={<BouquetsPage />} />
          <Route path="bouquet/">
            <Route path=":id" element={<ViewBouquet />} />
            <Route path="edit" element={<EditBouquet />} />
            <Route path="add" element={<AddBouquet />} />
          </Route>
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

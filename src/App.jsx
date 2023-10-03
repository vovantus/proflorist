import './App.css';
import BouquetsPage from './pages/Bouquets/BouquetsPage';
import ViewBouquet from './pages/ViewBouquet/ViewBouquet';
import Error404 from './pages/NotFound/404';
import EditBouquet from './pages/EditBouquet/EditBouquet';

import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/proflorist">
          <Route index element={<BouquetsPage />} />
          <Route path="bouquet/:id" element={<ViewBouquet />} />
          <Route path="bouquet/edit" element={<EditBouquet />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Layout>
  );
}

export default App;

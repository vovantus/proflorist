import './App.css';
import BouquetsPage from './pages/Bouquets/BouquetsPage';
import ViewBouquet from './pages/ViewBouquet/ViewBouquet';
import { Route, Routes } from 'react-router-dom';

function App() {
  //return <BouquetsPage />;
  return (
    <Routes>
      <Route path="/proflorist" element={<BouquetsPage />} />
      <Route path="/proflorist/bouquet/:id" element={<ViewBouquet />} />
    </Routes>
  );
}

export default App;

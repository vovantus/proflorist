import { Suspense, useState, useEffect, lazy } from 'react';
import SortingBar from './SortingBar';
import FilterBar from './FilterBar';
import Loading from '../../utils/Loading';
import { Grid, Container } from '@mui/material';
import { Server } from '../../utils/config';
import api from '../../api/api';
//import ActionBar from './ActionBar';
const BouquetList = lazy(() => import('./BouquetList'));

function getMinMaxPrices(bouquets) {
  return bouquets.reduce(
    (acc, bouquet) => ({
      min: Math.min(acc.min, bouquet.Price),
      max: Math.max(acc.max, bouquet.Price),
    }),
    { min: Infinity, max: -Infinity },
  );
}

export default function BouquetsPage() {
  const [sorting, setSorting] = useState({ field: 'Name', direction: 'asc' });
  const [priceFilter, setPriceFilter] = useState({});
  const [bouquets, setBouquets] = useState([]);

  useEffect(() => {
    const getBouquets = async () => {
      try {
        const data = await api.listDocuments(
          Server.databaseID,
          Server.collectionID,
        );
        const bouqs = data.documents.map((bouq) => ({
          ...bouq,
          show: true,
        }));
        const { min, max } = getMinMaxPrices(bouqs);
        setPriceFilter({
          minPrice: min,
          maxPrice: max,
          minSelectedPrice: min,
          maxSelectedPrice: max,
        });
        setBouquets(bouqs);
      } catch (e) {
        console.log(e);
      }
    };
    getBouquets();
  }, []);

  function toggleDirection(direction) {
    return direction === 'asc' ? 'desc' : 'asc';
  }

  function updateSorting(field) {
    const direction =
      sorting.field !== field ? 'asc' : toggleDirection(sorting.direction);
    //!!! мне нужен Sorting как стейт?
    setSorting({ field: field, direction: direction });
    const sortedBouqs = bouquets.slice();
    sortedBouqs.sort((a, b) => {
      if (sorting.direction === 'asc') {
        return a[sorting.field] > b[sorting.field] ? 1 : -1;
      } else {
        return a[sorting.field] < b[sorting.field] ? 1 : -1;
      }
    });
    setBouquets(sortedBouqs);
  }

  function priceFilterUpdate(priceRange) {
    const bouqs = bouquets.map((bouq) => ({
      ...bouq,
      show: bouq.Price >= priceRange[0] && bouq.Price <= priceRange[1],
    }));
    console.log(bouqs);
    setBouquets(bouqs);
  }

  return (
    <Container maxWidth="lg">
      <SortingBar updateSorting={updateSorting} />
      {/*<ActionBar /> */}
      <FilterBar
        priceFilter={priceFilter}
        priceFilterUpdate={priceFilterUpdate}
      />
      <Grid container spacing={1}>
        <Suspense fallback={<Loading />}>
          <BouquetList bouquets={bouquets} />
        </Suspense>
      </Grid>
    </Container>
  );
}

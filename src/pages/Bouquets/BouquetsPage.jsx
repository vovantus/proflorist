import { useState, useEffect } from 'react';
import SortingBar from './SortingBar';
import FilterBar from './FilterBar';
import Loading from '../../components/Loading';
import { Grid, Container } from '@mui/material';
import api from '../../api/api';
import BouquetList from './BouquetList';
import { compare, getMinMaxPrices, toggleDirection } from './utils/utils.js';

export default function BouquetsPage() {
  const [sorting, setSorting] = useState({ field: 'Name', direction: 'asc' });
  const [bouquets, setBouquets] = useState([]);
  const [priceFilterRange, setPriceFilterRange] = useState([0, 0]);
  const [priceFilterSelection, setPriceFilterSelection] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState('loading');

  useEffect(() => {
    api
      .fetchBouquets()
      .then((bouqs) => {
        const filterInitial = getMinMaxPrices(bouqs);
        console.log(filterInitial);
        setPriceFilterRange(filterInitial);
        setPriceFilterSelection(filterInitial);
        setBouquets(bouqs);
        setIsLoading('loaded');
      })
      .catch((e) => {
        console.log(e);
        setIsLoading('error');
      });
  }, []);

  function updateSorting(field) {
    const direction =
      sorting.field !== field ? 'asc' : toggleDirection(sorting.direction);
    const sortedBouqs = bouquets
      .slice()
      .sort((a, b) => compare(a, b, field, direction));
    setBouquets(sortedBouqs);
    setSorting({ field: field, direction: direction });
  }

  function priceFilterUpdater(priceRange) {
    setPriceFilterSelection(priceRange);
  }

  const filteredBouquets = bouquets.filter(
    (b) =>
      b.Price >= priceFilterSelection[0] && b.Price <= priceFilterSelection[1],
  );

  return (
    <Container maxWidth="lg">
      <SortingBar updateSorting={updateSorting} />
      <FilterBar
        filterRanges={priceFilterRange}
        filterSelection={priceFilterSelection}
        filterUpdater={priceFilterUpdater}
      />
      <Grid container spacing={1}>
        {isLoading !== 'loaded' ? (
          <Loading loaderState={isLoading} />
        ) : (
          <BouquetList bouquets={filteredBouquets} />
        )}
      </Grid>
    </Container>
  );
}

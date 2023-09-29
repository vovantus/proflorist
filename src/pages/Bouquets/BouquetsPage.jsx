import { useState, useMemo, useEffect } from 'react';
import {
  toggleSortDirection,
  compareBouquets,
  getMinMaxBouquetPrices,
} from '../../utils/utils.js';
import { useGetBouquets } from '../../hooks/useGetBouquets';
import { Grid, Container } from '@mui/material';
import SortingBar from './SortingBar';
import FilterBar from '../../components/FilterBar';
import Loading from '../../components/Loading';
import SearchBar from '../../components/SearchBar';
import BouquetList from './BouquetList';

export default function BouquetsPage() {
  const { bouquets, isLoading } = useGetBouquets();

  const priceFilterRange = useMemo(() => {
    const filterInitial = getMinMaxBouquetPrices(bouquets);
    return [filterInitial[0] - 1, filterInitial[1] + 1];
  }, [bouquets]);

  const [priceFilterSelection, setPriceFilterSelection] = useState([0, 0]);
  const [sorting, setSorting] = useState({ field: 'Name', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPriceFilterSelection(priceFilterRange);
  }, [priceFilterRange]);

  const sortedBouquets = useMemo(() => {
    const sorted = bouquets.sort((a, b) =>
      compareBouquets(a, b, sorting.field, sorting.direction),
    );
    return [...sorted]; // без этого не обновляет filteredBouquets
  }, [bouquets, sorting]);

  const filteredBouquets = useMemo(
    () =>
      sortedBouquets.filter(
        (b) =>
          b.Price >= priceFilterSelection[0] &&
          b.Price <= priceFilterSelection[1] &&
          (!searchTerm ||
            b.Name.toLowerCase().includes(searchTerm.trim().toLowerCase())),
      ),
    [sortedBouquets, searchTerm, priceFilterSelection],
  );

  function updateSorting(field) {
    const direction =
      sorting.field !== field ? 'asc' : toggleSortDirection(sorting.direction);
    setSorting({ field: field, direction: direction });
  }

  function priceFilterUpdater(priceRange) {
    setPriceFilterSelection(priceRange);
  }

  function updateSearchTerm(newTerm) {
    setSearchTerm(newTerm);
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item>
          <SortingBar updateSorting={updateSorting} />
          <FilterBar
            filterRanges={priceFilterRange}
            filterSelection={priceFilterSelection}
            filterUpdater={priceFilterUpdater}
          />
        </Grid>
        <Grid item sx={{ paddingRight: '30px' }}>
          <SearchBar updateSearchTerm={updateSearchTerm} />
        </Grid>
      </Grid>
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

import { useState, useMemo, useLayoutEffect } from 'react';
import {
  toggleSortDirection,
  compareBouquets,
  getMinMaxBouquetPrices,
} from '../../utils/utils.js';
import { useGetBouquets } from '../../hooks/useGetBouquets';
import { Grid } from '@mui/material';
import SortingBar from './SortingBar';
import FilterBar from '../../components/FilterBar';
import Loading from '../../components/Loading';
import SearchBar from '../../components/SearchBar';
import BouquetList from './BouquetList';
import CreateBouquetButton from '../../components/CreateBouquetButton.jsx';

export default function BouquetsPage() {
  const { bouquets, isLoading } = useGetBouquets();

  const priceFilterRange = useMemo(() => {
    if (bouquets.length == 0) {
      return [0, 0];
    } else {
      const filterInitial = getMinMaxBouquetPrices(bouquets);
      return [filterInitial[0] - 1, filterInitial[1] + 1];
    }
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
    <>
      {/* Sorting Bar */}
      <Grid item xs={12} sm={6} md={3}>
        <SortingBar updateSorting={updateSorting} />
      </Grid>

      {/* Filter Bar */}
      <Grid item xs={12} sm={6} md={3}>
        <FilterBar
          filterRanges={priceFilterRange}
          filterSelection={priceFilterSelection}
          filterUpdater={priceFilterUpdater}
        />
      </Grid>

      {/* Search Bar */}
      <Grid item xs={8} sm={6} md={3}>
        <SearchBar updateSearchTerm={updateSearchTerm} />
      </Grid>

      {/* Create bouquet */}
      <Grid item xs={4} sm={6} md={3}>
        <CreateBouquetButton />
      </Grid>

      {/* Bouquet List */}
      <Grid item xs={12}>
        {isLoading === 'loaded' ? (
          <BouquetList bouquets={filteredBouquets} />
        ) : (
          <Loading loaderState={isLoading} />
        )}
      </Grid>
    </>
  );
}

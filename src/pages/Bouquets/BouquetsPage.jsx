import { useState, useEffect } from 'react';
import { toggleSortDirection, compareBouquets } from '../../utils/utils.js';
import { useGetBouquets } from '../../hooks';
import { Grid, Container } from '@mui/material';
import SortingBar from './SortingBar';
import FilterBar from '../../components/FilterBar';
import Loading from '../../components/Loading';
import SearchBar from '../../components/SearchBar';
import BouquetList from './BouquetList';

export default function BouquetsPage() {
  const [sorting, setSorting] = useState({ field: 'Name', direction: 'asc' });
  const [priceFilterSelection, setPriceFilterSelection] = useState([0, 0]);
  const [searchTerm, setSearchTerm] = useState('');

  const { bouquets, isLoading, priceFilterRange } = useGetBouquets();

  useEffect(() => {
    setPriceFilterSelection(priceFilterRange);
  }, [priceFilterRange]);

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

  let filteredAndSortedBouquets = bouquets
    .filter(
      (b) =>
        b.Price >= priceFilterSelection[0] &&
        b.Price <= priceFilterSelection[1],
    )
    .sort((a, b) => compareBouquets(a, b, sorting.field, sorting.direction));

  if (searchTerm !== '') {
    filteredAndSortedBouquets = filteredAndSortedBouquets.filter((b) =>
      b.Name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} justifyContent="space-between">
        {/* Left Column */}
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
          <BouquetList bouquets={filteredAndSortedBouquets} />
        )}
      </Grid>
    </Container>
  );
}

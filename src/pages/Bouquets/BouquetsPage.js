import { useState, useEffect } from 'react';
import SortingBar from './SortingBar';
import FilterBar from './FilterBar';
import Loading from '../../utils/Loading';
import { Grid, Container } from '@mui/material';
import { Server } from '../../utils/config';
import api from '../../api/api';
import BouquetList from './BouquetList';

export default function BouquetsPage() {
  const [sorting, setSorting] = useState({ field: 'Name', direction: 'asc' });
  const [bouquets, setBouquets] = useState([]);
  const [priceFilter, setPriceFilter] = useState({
    minValue: 0,
    maxValue: 0,
    minSelectedValue: 0,
    maxSelectedValue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBouquets = async () => {
      try {
        const data = await api.listDocuments(
          Server.databaseID,
          Server.collectionID,
        );
        const bouqs = data.documents;
        const { min, max } = getMinMaxPrices(bouqs);
        setPriceFilter({
          minValue: min,
          maxValue: max,
          minSelectedValue: min,
          maxSelectedValue: max,
        });
        setBouquets(bouqs);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };
    getBouquets();
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
    setPriceFilter({
      ...priceFilter,
      minSelectedValue: priceRange[0],
      maxSelectedValue: priceRange[1],
    });
  }

  const filteredBouquets = function () {
    return bouquets.filter(
      (b) =>
        b.Price >= priceFilter.minSelectedValue &&
        b.Price <= priceFilter.maxSelectedValue,
    );
  };

  return (
    <Container maxWidth="lg">
      <SortingBar updateSorting={updateSorting} />
      <FilterBar
        filterRanges={priceFilter}
        filterUpdater={priceFilterUpdater}
      />
      <Grid container spacing={1}>
        {isLoading ? (
          <Loading />
        ) : (
          <BouquetList bouquets={filteredBouquets()} />
        )}
      </Grid>
    </Container>
  );
}

function getMinMaxPrices(bouquets) {
  return bouquets.reduce(
    (acc, bouquet) => ({
      min: Math.min(acc.min, bouquet.Price),
      max: Math.max(acc.max, bouquet.Price),
    }),
    { min: Infinity, max: -Infinity },
  );
}

function toggleDirection(direction) {
  return direction === 'asc' ? 'desc' : 'asc';
}

function compare(a, b, field, direction) {
  const comparison = a[field] > b[field] ? 1 : -1;
  return direction === 'asc' ? comparison : -comparison;
}

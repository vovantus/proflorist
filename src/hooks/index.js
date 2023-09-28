import api from '../api/api';
import { useEffect, useState } from 'react';
import { getMinMaxBouquetPrices } from '../utils/utils.js';

export function useGetBouquets() {
  const [bouquets, setBouquets] = useState([]);
  const [isLoading, setIsLoading] = useState('loading');
  const [priceFilterRange, setPriceFilterRange] = useState([0, 0]);

  useEffect(() => {
    api
      .fetchBouquets()
      .then((bouqs) => {
        setBouquets(bouqs);
        const filterInitial = getMinMaxBouquetPrices(bouqs);
        setPriceFilterRange([filterInitial[0] - 1, filterInitial[1] + 1]);
        setIsLoading('loaded');
      })
      .catch((e) => {
        console.log(e);
        setIsLoading('error');
      });
  }, []);

  return {
    bouquets,
    isLoading,
    priceFilterRange,
  };
}

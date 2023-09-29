import api from '../api/api';
import { useEffect, useState } from 'react';

export function useBouquetInfo(bouquetID) {
  const [bouquet, setBouquet] = useState([]);
  const [isLoading, setIsLoading] = useState('loading');

  useEffect(() => {
    api
      .fetchBouquetInfo(bouquetID)
      .then((bouq) => {
        setBouquet(bouq);
        setIsLoading('loaded');
      })
      .catch((e) => {
        console.log(e);
        setIsLoading('error');
      });
  }, []);

  return {
    bouquet,
    isLoading,
  };
}

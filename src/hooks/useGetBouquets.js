import api from '../api/api';
import { useEffect, useState } from 'react';

export function useGetBouquets() {
  const [bouquets, setBouquets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .fetchBouquets()
      .then((bouqs) => {
        setBouquets(bouqs);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        setError(e.name);
      });
  }, []);

  return {
    bouquets,
    isLoading,
    error,
  };
}

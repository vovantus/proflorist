import api from '../api/api';
import { useEffect, useState } from 'react';

export function useGetBouquets() {
  const [bouquets, setBouquets] = useState([]);
  const [isLoading, setIsLoading] = useState('loading');

  useEffect(() => {
    api
      .fetchBouquets()
      .then((bouqs) => {
        setBouquets(bouqs);
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
  };
}

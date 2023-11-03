import { useEffect, useState } from 'react';

const useHttp = (request, dependency, onError) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    request()
      .then((data) => {
        setData(data);
        setError('');
      })
      .catch((e) => {
        setError(e);
        onError();
      })
      .finally(setLoading(false));
  }, [dependency]);

  return { data, loading, error };
};

export default useHttp;

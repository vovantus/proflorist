import api from '../api/api';
import { useState, useEffect } from 'react';

export function useGetUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    api
      .getAccount()
      .then((data) => {
        setUser(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return user;
}

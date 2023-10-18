import { createContext, useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import api from '../api/api';
import URLS from '../routes/urls';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(async () => {
    const creds = await api.getAccount();
    console.log('auth context use state user', creds);
    return creds;
  });
  const navigate = useNavigate();

  console.log('auth context', user);

  const getUser = async () => {
    try {
      const creds = await api.getAccount();
      console.log('auth context getuser', creds);
      setUser(creds);
      navigate(URLS.ADMIN);
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = () => {
    api
      .deleteCurrentSession()
      .then(() => {
        setUser();
        navigate(URLS.LOGIN);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const value = useMemo(
    () => ({
      user,
      getUser,
      logOut,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router';
import api from '../api/api';
import URLS from '../routes/urls';
import { useLocation } from 'react-router-dom';
import useHttp from '../hooks/useHttp';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();
  //Q
  const location = useLocation();
  const { error } = useHttp(api.getAccount, location, () => setUser(null));
  error && console.log('authorization error');

  //   useEffect(() => {
  //     api.getAccount().catch(() => {
  //       setUser(null);
  //     });
  //   }, [location]);

  const loginUser = (email, password) => {
    return api
      .createSession(email, password)
      .then(() => {
        return api.getAccount();
      })
      .then((user) => {
        //console.log('login auth context account', user);
        setUser(user);
        navigate(URLS.ADMIN);
      })
      .catch((e) => {
        //console.log('loginUser error:', e);
        throw e;
      });
  };

  const logOut = () => {
    setUser(null);
    api
      .deleteCurrentSession()
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        navigate(URLS.LOGIN);
      });
  };

  const value = useMemo(
    () => ({
      user,
      loginUser,
      logOut,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

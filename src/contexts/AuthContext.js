import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router';

import { updateUser } from '../features/userInfo/userInfoSlice';
import { useDispatch } from 'react-redux';

import api from '../api/api';
import URLS from '../routes/urls';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = (email, password) => {
    return api
      .createSession(email, password)
      .then(() => {
        return api.getAccount();
      })
      .then((user) => {
        dispatch(
          updateUser({
            isAuthenticated: true,
            email: user.email,
            name: user.name,
          }),
        );

        setUser(user);
        navigate(URLS.ADMIN);
      })
      .catch((e) => {
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

import { useAuth } from '../contexts/AuthContext';

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

const useHttp = (request) => {
  const { logOut } = useAuth();

  const safeRequest = (data) => {
    return request(data)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        if (e.code === 401) {
          setTimeout(() => logOut(), 4000);
          throw new AuthenticationError(e.message);
        }
        throw e;
      });
  };

  return safeRequest;
};

export { useHttp, AuthenticationError };

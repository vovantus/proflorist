import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import URLS from '../routes/urls';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to={URLS.LOGIN} />;
};

export default ProtectedRoute;

import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth.js';

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
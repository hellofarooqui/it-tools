import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => !!localStorage.getItem('token');

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

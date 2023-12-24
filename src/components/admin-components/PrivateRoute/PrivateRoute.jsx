import { useAuthorizated } from '@/store/IsAuthorizatedStore';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, redirectTo = '/login' }) => {
  const { IsAuthorizated } = useAuthorizated();
  console.log('IsAuthorizated : ', IsAuthorizated);
  return IsAuthorizated ? <>{children}</> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;

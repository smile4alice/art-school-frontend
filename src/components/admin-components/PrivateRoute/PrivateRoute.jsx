import { useEffect } from 'react';
import axios from '@/utils/axios';
import { useAuthorized } from '@/store/IsAuthorizedStore';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children, redirectTo = '/login' }) => {
  const isAuthorized = useAuthorized(state => state.isAuthorized);
  const { setUnAuthorized } = useAuthorized();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      await axios
        .post('auth/is-accessible')
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.response.data.detail);
          if (err.response.data.detail === 'Unauthorized') {
            localStorage.removeItem('access_token');
            setUnAuthorized();
            navigate('/login');
          }
        });
    };
    checkAuth();
  }, [navigate, setUnAuthorized]);

  return isAuthorized ? <>{children}</> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;

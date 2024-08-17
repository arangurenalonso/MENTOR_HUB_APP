import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';
import { useEffect } from 'react';
interface PrivateRouterProps {
  children: React.ReactNode;
}

const PrivateRouter = ({ children }: PrivateRouterProps) => {
  const { isLogged, setRedirectPath } = useAuthStore();
  const location = useLocation();
  useEffect(() => {
    if (!isLogged) {
      const { pathname, search } = location;
      const lastPath = pathname + search;
      // console.log('lastPath', lastPath);

      setRedirectPath(lastPath);
    }
  }, []);

  return isLogged ? (
    children
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default PrivateRouter;

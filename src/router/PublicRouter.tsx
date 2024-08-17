import { Navigate } from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';
interface PublicRouterProps {
  children: React.ReactNode;
}

const PublicRouter = ({ children }: PublicRouterProps) => {
  const { isLogged, redirectPath } = useAuthStore();

  return !isLogged ? children : <Navigate to={redirectPath || '/'} replace />;
};

export default PublicRouter;

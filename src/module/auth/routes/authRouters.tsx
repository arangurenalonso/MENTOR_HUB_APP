import { Navigate } from 'react-router-dom';
import authRoutesDefinition from './authRoutesDefinition';

const authRoutes = [
  {
    path: '',
    element: <Navigate to={authRoutesDefinition[0].to} replace />,
  },
  ...authRoutesDefinition.map((route) => ({
    path: route.path,
    element: <route.Component />,
  })),
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
export default authRoutes;

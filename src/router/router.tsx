import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import authRoutes from '../auth/routes/authRouters';
import AuthContainer from '../auth/AuthContainer';
const routesConfig: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthContainer />,
    children: authRoutes,
  },
  {
    path: '*',
    element: <Navigate to="/auth" replace />,
  },
];
const router = createBrowserRouter(routesConfig);
export default router;

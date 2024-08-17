import { Navigate } from 'react-router-dom';
import mainRoutesDefinition from './mainRoutesDefinition';

const mainRouters = [
  {
    path: '',
    element: <Navigate to={mainRoutesDefinition[0].to} replace />,
  },
  ...mainRoutesDefinition.map((route) => ({
    path: route.path,
    element: <route.Component />,
  })),
  {
    path: '*',
    element: <Navigate to="" replace />,
  },
];
export default mainRouters;

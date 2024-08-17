import { Navigate } from 'react-router-dom';
import instructorRoutesDefinition from './instructorRoutesDefinition';

const instructorRouters = [
  {
    path: '',
    element: <Navigate to={instructorRoutesDefinition[0].to} replace />,
  },
  ...instructorRoutesDefinition.map((route) => ({
    path: route.path,
    element: <route.Component />,
  })),
  {
    path: '*',
    element: <Navigate to="" replace />,
  },
];
export default instructorRouters;

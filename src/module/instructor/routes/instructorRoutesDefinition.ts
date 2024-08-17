import { RouteDefinition } from '../../../router/router.interface';
import HomeInstructor from '../pages/HomeInstructor';

const instructorRoutesDefinition: RouteDefinition[] = [
  {
    to: 'about',
    path: 'about',
    Component: HomeInstructor,
    name: 'about',
  },
];
export default instructorRoutesDefinition;

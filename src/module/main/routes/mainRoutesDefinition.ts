import { RouteDefinition } from '../../../router/router.interface';
import HomePage from '../pages/Home.page';

const mainRoutesDefinition: RouteDefinition[] = [
  {
    to: '/home',
    path: '/home',
    Component: HomePage,
    name: 'home',
    isShowNavBar: false,
  },
];
export default mainRoutesDefinition;

import { RouteDefinition } from '../../../router/router.interface';
import ProfileDescription from '../pages/ProfileDescription';

const instructorRoutesDefinition: RouteDefinition[] = [
  {
    to: 'profile-description',
    path: 'profile-description',
    Component: ProfileDescription,
    name: 'Profile Description',
  },
];
export default instructorRoutesDefinition;

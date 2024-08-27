import { RouteDefinition } from '../../../router/router.interface';
import Courses from '../pages/Courses';
import ProfileDescription from '../pages/ProfileDescription';

const instructorRoutesDefinition: RouteDefinition[] = [
  {
    to: 'profile-description',
    path: 'profile-description',
    Component: ProfileDescription,
    name: 'Profile Description',
  },
  {
    to: 'courses',
    path: 'courses',
    Component: Courses,
    name: 'Courses',
  },
];
export default instructorRoutesDefinition;

import { RouteDefinition } from '../../../router/router.interface';
import CourseDetail from '../pages/CourseDetail';
import Courses from '../pages/Courses';
import ProfileDescription from '../pages/ProfileDescription';

const instructorRoutesDefinition: RouteDefinition[] = [
  {
    to: 'profile-description',
    path: 'profile-description',
    Component: ProfileDescription,
    name: 'Profile Description',
    isShowNavBar: true,
  },
  {
    to: 'courses',
    path: 'courses',
    Component: Courses,
    name: 'Courses',
    isShowNavBar: true,
  },
  {
    to: 'course/new',
    path: 'course/new',
    Component: CourseDetail,
    name: 'Course Create',
    isShowNavBar: true,
  },
  {
    to: 'course/:id',
    path: 'course/:id',
    Component: CourseDetail,
    name: 'Course Detail',
    isShowNavBar: false,
  },
];
export default instructorRoutesDefinition;

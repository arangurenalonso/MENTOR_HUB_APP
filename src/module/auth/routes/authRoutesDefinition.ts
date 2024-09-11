import { LoginPage, RegisterPage } from '../pages';
import { RouteDefinition } from '../../../router/router.interface';

const authRoutesDefinition: RouteDefinition[] = [
  {
    to: 'login',
    path: 'login',
    Component: LoginPage,
    name: 'Login',
    isShowNavBar: false,
  },

  {
    to: 'register',
    path: 'register',
    Component: RegisterPage,
    name: 'Register',
    isShowNavBar: false,
  },
];
export default authRoutesDefinition;

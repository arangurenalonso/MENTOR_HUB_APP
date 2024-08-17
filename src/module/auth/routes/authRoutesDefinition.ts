import { LoginPage, RegisterPage } from '../pages';
import { RouteDefinition } from '../../../router/router.interface';

const authRoutesDefinition: RouteDefinition[] = [
  {
    to: 'login',
    path: 'login',
    Component: LoginPage,
    name: 'Login',
  },

  {
    to: 'register',
    path: 'register',
    Component: RegisterPage,
    name: 'Register',
  },
];
export default authRoutesDefinition;

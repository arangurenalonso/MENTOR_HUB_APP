import { Component, LazyExoticComponent } from 'react';
import { LoginPage, RegisterPage } from '../pages';

type JSXComponent = () => JSX.Element;

interface RouteDefinition {
  to: string;
  path: string;
  // Component: React.FC;
  Component: LazyExoticComponent<JSXComponent> | JSXComponent;
  name: string;
}

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

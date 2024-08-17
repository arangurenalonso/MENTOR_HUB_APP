import { LazyExoticComponent } from 'react';

type JSXComponent = () => JSX.Element;

export interface RouteDefinition {
  to: string;
  path: string;
  // Component: React.FC;
  Component: LazyExoticComponent<JSXComponent> | JSXComponent;
  name: string;
}

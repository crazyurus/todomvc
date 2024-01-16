import type { PathRouteProps } from 'react-router-dom';

import Home from './pages/home';

interface Route extends PathRouteProps {
  path: string;
  page(): JSX.Element;
}

const routes: Route[] = [
  {
    path: '/:status',
    page: Home
  },
  {
    path: '/',
    page: Home
  }
];

export default routes;

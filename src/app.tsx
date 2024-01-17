import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import NotFound from './pages/error/404';
import routes from './routes';

function Router(): JSX.Element {
  return (
    <Routes>
      {routes.map(props => {
        const { path, page: Page } = props;

        return <Route key={path} element={<Page />} {...props} />;
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App(): JSX.Element {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
}

export default App;


import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { RouteA, RouteAA, RouteB } from './routes-index';

const history = createBrowserHistory()
// static const hist = history;
export const Routes = {
  home: '/',
  events: '/route-a',
  game: '/route-b'
}

const routes = {
  [Routes.home]: RouteA,
  [Routes.events]: RouteAA,
  [Routes.game]: RouteB
}

const AppRouter = () => (
    <Router history={history}>
      <div>
      {Object.keys(routes).map(r => (
        <Route key={r} path={r} exact={r === '/'} component={routes[r]} />
      ))}
      </div>
    </Router>
)

export default AppRouter


import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import App from './../app';
import RouteSignin from './route-signin';
import RouteContentLogged from './route-contentlogged';
import RouteSignup from './route-signup';

const history = createBrowserHistory()

const routes = {
  '/': RouteSignin,
  '/route-signin': RouteSignin,
  '/route-signup': RouteSignup,
  '/route-contentlogged': RouteContentLogged,
}

const AppRouter = () => (
    <Router history={history}>
      <App>
        {Object.keys(routes).map(r => (
          <Route key={r} path={r} exact={r === '/'} component={routes[r]} />
        ))}
      </App>
    </Router>
)

export default AppRouter

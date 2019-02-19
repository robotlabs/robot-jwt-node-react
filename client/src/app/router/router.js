
import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import App from './../app';

import Signin from './../components/signin/signin';
import Signup from './../components/signup/signup';
import ContentLogged from './../components/content-logged/content-logged';

const history = createBrowserHistory()

const routes = {
  '/': Signin,
  '/route-signin': Signin,
  '/route-signup': Signup,
  '/route-contentlogged': ContentLogged,
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

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/app';
import AppRouter from './app/router/router';
import * as serviceWorker from './services/serviceWorker';

ReactDOM.render(
  <AppRouter>
    <App />
  </AppRouter>, 
  document.getElementById('root')
);

serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/app';
import * as serviceWorker from './services/serviceWorker';


ReactDOM.render(
  <div>
    <App />
  </div>
  , 
document.getElementById('root'));
serviceWorker.unregister();

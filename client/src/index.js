import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import AuthProvider from './provider/';
import App from './components/App';

import 'normalize.css';
import './index.css';

ReactDOM.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);

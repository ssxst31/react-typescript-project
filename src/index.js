/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles/GlobalStyles';
import Main from './pages/Main';
import Navbar from './pages/Navbar';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Navbar />
    <Main />
  </React.StrictMode>,
  document.getElementById('root'),
);

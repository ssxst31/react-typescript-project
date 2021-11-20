/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles/GlobalStyles';
import Main from './pages/Main';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Main />
  </React.StrictMode>,
  document.getElementById('root'),
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(
  <App initData={window.initData} />,
  document.getElementById('root')
);


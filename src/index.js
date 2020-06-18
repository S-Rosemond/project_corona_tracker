import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import ApiState from './context/api/api.state';

ReactDOM.render(
  <ApiState>
    <App />
  </ApiState>,

  document.getElementById('root')
);

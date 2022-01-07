import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app/App.js'



ReactDOM.render(
  <React.StrictMode>
    <div id="default-view">
      <App/>
    </div>
    

  </React.StrictMode>,
  document.getElementById('root')
);


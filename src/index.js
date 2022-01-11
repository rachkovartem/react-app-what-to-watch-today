import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app/App.js'
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>

    <div id="default-view">

      <BrowserRouter>

        <App/>

      </BrowserRouter>
      
    </div>
    
  </React.StrictMode>,
  document.getElementById('root')
);


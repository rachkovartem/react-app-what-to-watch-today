import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app/App.js'
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import { BrowserRouter } from "react-router-dom";



ReactDOM.render(
  <React.StrictMode>

    

      <BrowserRouter>
        <ScrollToTop/>
        <App/>

      </BrowserRouter>
      
    
    
  </React.StrictMode>,
  document.getElementById('root')
);


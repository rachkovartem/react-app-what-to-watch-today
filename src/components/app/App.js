import {  BrowserRouter,  Routes,  Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { createTheme } from '@mui/material';

import { ToWatchList, Page404, AboutFilm } from "../pages"
import Header from '../header/Header';

const App = () => {
  const [appInfoHeight, setAppInfoHeight] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filmsToWatch, setFilmsToWatch] = useState(0)
  const [filterSearch, setFilterSearch] = useState('');


  useEffect(() => {
    if (drawerOpen) {
      document.querySelector('.header__hamburger').classList.add('header__hamburger_active')
    } 
    if (!drawerOpen) {
      document.querySelector('.header__hamburger').classList.remove('header__hamburger_active')
    }
    
    
  },[drawerOpen])

  const onClickDrawerToggle = () => {
    setDrawerOpen(drawerOpen => !drawerOpen)
    onOpenedDriverBodyWidth()
  }

  useEffect(() => {
    onOpenedDriverBodyWidth()
  }, [drawerOpen])

  const onOpenedDriverBodyWidth = () => {

    if (drawerOpen) {
      document.querySelector('html').style.overflowY = 'scroll';
  
    }

    if (!drawerOpen) {
      document.querySelector('html').style.overflowY = '';
      
    }
    
  }

  useEffect(() => {

    const appInfo = document.querySelector('.getHeight');
    // const appInfoHeight = window.getComputedStyle(appInfo).height;
    setAppInfoHeight(appInfoHeight.slice(0, -2));
  }, [])

  
  return (
    
    <BrowserRouter>
          
            <Header
            onClickDrawerToggle={onClickDrawerToggle} 
            filmsToWatch={filmsToWatch} 
            setFilterSearch={setFilterSearch} 
            filterSearch={filterSearch}
            />
         
          <Routes>
            <Route 
              path="/" 
              element={<ToWatchList 
              drawerOpen={drawerOpen} 
              setDrawerOpen={setDrawerOpen}
              setFilmsToWatch={setFilmsToWatch}
              setFilterSearch={setFilterSearch}
              filterSearch={filterSearch}
              appInfoHeight={appInfoHeight}
              />}/>
            <Route path="/film/:id" element={<AboutFilm/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        
      
    </BrowserRouter>
  )
}



export default App
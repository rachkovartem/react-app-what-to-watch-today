import {  BrowserRouter,  Routes,  Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToWatchList, Page404, AboutFilm } from "../pages"
import Header from '../header/Header';
import { Grid, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#8e8e8e',
      main: '#78909c',
      dark: '#373737',
      contrastText: '#fff',
    }
  }
});

const App = () => {
  const [appInfoHeight, setAppInfoHeight] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filmsToWatch, setFilmsToWatch] = useState(0)
  const [filterSearch, setFilterSearch] = useState('');

  const onClickDrawerToggle = () => {
    setDrawerOpen(drawerOpen => !drawerOpen)
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
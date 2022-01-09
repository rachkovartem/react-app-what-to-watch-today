import { Routes,  Route } from "react-router-dom";
import { useState, useEffect } from "react";


import { ToWatchList, Page404, AboutFilm } from "../pages"
import Header from '../header/Header';

const App = () => {
  const [appInfoHeight, setAppInfoHeight] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filmsToWatch, setFilmsToWatch] = useState(0)
  const [filterSearch, setFilterSearch] = useState('');
  const [domContentLoaded, setDomContentLoaded] = useState(false);


  const onDomLoaded = () => {
    setDomContentLoaded(true);    
  }

  window.addEventListener('load', onDomLoaded)
  


  useEffect(() => {
    if (!drawerOpen) {return}
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
      // document.querySelector('html').style.overflowY = 'scroll';
  
    }

    if (!drawerOpen) {
      document.querySelector('html').style.overflowY = '';
      
    }
    
  }
  
  const View = () => {
    if (domContentLoaded) {
      return (
       
            <>
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
              <Route path="/film/:id" element={<AboutFilm />}/>
              <Route path="*" element={<Page404 />}/>
            </Routes>
            </>
        
     
      )}
    
  }

  return (
    <>
    {View()}
    </>
    
  )
}



export default App
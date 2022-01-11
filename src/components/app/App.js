import { Routes,  Route } from "react-router-dom";
import { useState, useEffect } from "react";

import { ToWatchList, Page404, AboutFilm } from "../pages"
import Header from '../header/Header';


const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filmsToWatch, setFilmsToWatch] = useState(0)
  const [domContentLoaded, setDomContentLoaded] = useState(false);
  

  const onDomLoaded = () => {
    setDomContentLoaded(true);  
     
  }

  window.addEventListener('DOMContentLoaded', onDomLoaded)

  useEffect(() => {
    if (!domContentLoaded) {return}
    if (drawerOpen) {
      document.querySelector('.header__hamburger').classList.add('header__hamburger_active')
      if (window.innerWidth > 900) {
        document.querySelector('.header__hamburger').style.marginRight = '3px';
        document.querySelector('.film-list__add-button').style.marginRight = '3px';
      } 
    } 
    if (!drawerOpen) {
      document.querySelector('.header__hamburger').classList.remove('header__hamburger_active')
      if (window.innerWidth > 900) {
        document.querySelector('.header__hamburger').style.marginRight = '';
        document.querySelector('.film-list__add-button').style.marginRight = '';
      }
    }
  },[drawerOpen])

  const onClickDrawerToggle = () => {
    setDrawerOpen(drawerOpen => !drawerOpen)

  }
  
  const View = () => {
    if (domContentLoaded) {
      return (

            <>
              <Header
              onClickDrawerToggle={onClickDrawerToggle}
              drawerOpen={drawerOpen} 
              filmsToWatch={filmsToWatch} 
              />
          
            <Routes>
              <Route 
                path="/" 
                element={<ToWatchList 
                drawerOpen={drawerOpen} 
                setDrawerOpen={setDrawerOpen}
                setFilmsToWatch={setFilmsToWatch}
                />}/>
              <Route path="/film/:id" element={<AboutFilm/>}/>
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
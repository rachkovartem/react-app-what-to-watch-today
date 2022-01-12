import { Routes,  Route, useLocation } from "react-router-dom";
import { useState, useEffect, createRef } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ToWatchList, Page404, AboutFilm } from "../pages"

import Header from '../header/Header';
import Footer from '../footer/Footer'




const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filmsToWatch, setFilmsToWatch] = useState(0)
  const [domContentLoaded, setDomContentLoaded] = useState(false);
  const [rendered, setRendered] = useState(false)
  const location = useLocation()
  const onDomLoaded = () => {
    setDomContentLoaded(true);  
     
  }
  useEffect(() => {
    window.addEventListener('DOMContentLoaded', onDomLoaded)  
    setRendered(true)
  }, [])
  
  

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
      return (
        <>
        <CSSTransition appear={true} key={location.key} classNames="scale" timeout={300}>
            <Header
              onClickDrawerToggle={onClickDrawerToggle}
              drawerOpen={drawerOpen} 
              filmsToWatch={filmsToWatch} 
              />
              </CSSTransition>

              <TransitionGroup component={null}>
              <CSSTransition appear={true} key={location.key} classNames="scale" timeout={300}>
                
                <Routes>
            
                  <Route 
                  path="/" 
                  element={
                    <div className="default-view scale">
                        <ToWatchList 
                        drawerOpen={drawerOpen} 
                        setDrawerOpen={setDrawerOpen}
                        setFilmsToWatch={setFilmsToWatch}
                        />
                    </div>}
                  /> 

                  <Route path="/film/:id" element={
                    <div className="default-view scale">
                     <AboutFilm/>
                    </div>}
                  />
                
                  <Route path="*" element={
                    <div className="default-view scale">
                      <Page404 />
                    </div>}
                  />  

                </Routes>
              </CSSTransition>
            </TransitionGroup>
            <Footer/>
                 </>

      )
  }

  return (
    <>
    {View()}
    </>
  )
}


export default App
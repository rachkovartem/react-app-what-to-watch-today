import './Header.scss'


import { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'react-router';

export default function Header({filmsToWatch, currentLocation, onClickDrawerToggle}) {

  const [displyedHamburger, setDisplayedHamburger] = useState(false);

  const displayHamburger = () => {
    setDisplayedHamburger(true)
  }

  const hiddenHamburger = () => {
    setDisplayedHamburger(false)
  }

const location = useLocation()

  useEffect(() => {
    if (location.pathname === undefined) {
      return
    } else if (location.pathname === '/') {
      
      displayHamburger()
    } else hiddenHamburger()
  }, [location])

  const filmsSwitcher = (num) => {
    const lastNum = num.toString().slice(-1);
    if ((num > 100 && lastNum === '1') ||
        num === 1) {
      return 'фильм'
    } else if ((num > 100 && 
              (lastNum === '2' ||
              lastNum === '3' || 
              lastNum === '4')) ||
              num === 2 ||
              num === 3 ||
              num === 4) {
      return 'фильма'
    } else {
      return 'фильмов'
    }
  }

  const onClickHamburger = (e) => {
    e.currentTarget.classList.toggle('header__hamburger_active')
  }
  return (
      <Fragment>
        {header({onClickDrawerToggle, filmsSwitcher, filmsToWatch, onClickHamburger, displyedHamburger})}
      </Fragment>
  );
}


const header = ({onClickDrawerToggle, filmsSwitcher, filmsToWatch, displyedHamburger}) => {
  return (
  <section className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__films-counter">Нужно посмотреть {filmsToWatch} {filmsSwitcher(filmsToWatch)}</div>
              <div className="header__nav-ham-wrapper">
                <nav className="header__nav-menu">
                  <ul className="header__nav-menu-list">
                    <li className="header__nav-menu-list-item">
                      <a href="#" className="header__nav-el">Главная</a>
                    </li>
                    <li className="header__nav-menu-list-item">
                      <a href="#" className="header__nav-el">Профиль</a>
                    </li>
                  </ul>
                </nav>
  
              
                <div style={{display: !displyedHamburger ? "none" : ""}} onClick={onClickDrawerToggle} className="header__hamburger">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                    <g strokeWidth="6.5" strokeLinecap="round">
                      <path
                        d="M72 82.286h28.75"
                        fill="#009100"
                        fillRule="evenodd"
                        stroke="#fff"
                      />
                      <path
                        d="M100.75 103.714l72.482-.143c.043 39.398-32.284 71.434-72.16 71.434-39.878 0-72.204-32.036-72.204-71.554"
                        fill="none"
                        stroke="#fff"
                      />
                      <path
                        d="M72 125.143h28.75"
                        fill="#009100"
                        fillRule="evenodd"
                        stroke="#fff"
                      />
                      <path
                        d="M100.75 103.714l-71.908-.143c.026-39.638 32.352-71.674 72.23-71.674 39.876 0 72.203 32.036 72.203 71.554"
                        fill="none"
                        stroke="#fff"
                      />
                      <path
                        d="M100.75 82.286h28.75"
                        fill="#009100"
                        fillRule="evenodd"
                        stroke="#fff"
                      />
                      <path
                        d="M100.75 125.143h28.75"
                        fill="#009100"
                        fillRule="evenodd"
                        stroke="#fff"
                      />
                    </g>
                  </svg>
                </div>
              
              </div>
            </div>
          </div>
        </section>
      )
}
import './Header.scss'

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Logout from '@mui/icons-material/Logout';



export default function Header({filmsToWatch, onClickDrawerToggle, drawerOpen}) {

  const [displyedHamburger, setDisplayedHamburger] = useState(false);
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } = useAuth0();
  const [ loggedUser, setloggedUser ] = useState();
  const [ isRendered, setRendered ] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setRendered(true);
    return setRendered(false)
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      setloggedUser(user)
    }
  }, [])

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

  const avatar = !isLoading && isAuthenticated ? <button type="button" className="header__button-avatar">
    <img onClick={handleClick} className="header__avatar" src={user.picture} alt="avatar"/>
    </button> : null;
     
  const logProfileButton = !isAuthenticated ? <button 
    type="button" 
    onClick={() => loginWithRedirect({
      screen_hint: 'signup',
    })} 
    className="header__nav-el header__button">Войти</button> : null;

  const avatarMenu = (
  <Menu
    anchorEl={anchorEl}
    id="account-menu"
    open={open}
    onClose={handleClose}
    onClick={handleClose}
    PaperProps={{
      elevation: 0,
      sx: {
        borderRadius: '12px',
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 20,
          width: 10,
          height: 10,
          bgcolor: 'var(--grey-500)',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    }}
    transformOrigin={{ horizontal: 'left', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
  >
    <MenuItem>
      <ListItemIcon>
        <AccountBoxIcon fontSize="small"/>
      </ListItemIcon>
       Профиль
    </MenuItem>
    <Divider />
    <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
      <ListItemIcon>
        <Logout fontSize="small" />
      </ListItemIcon>
      Выйти
    </MenuItem>
  </Menu>
  )

  return (
  <header className="header">
        <div className="container">
          <div className="header__wrapper">
          {avatar}
          {avatarMenu}
          {logProfileButton}
            {/* <div style={{display: !displyedHamburger ? "none" : ""}} className="header__films-counter">Нужно посмотреть {filmsToWatch} {filmsSwitcher(filmsToWatch)}</div> */}
            <div className="header__nav-ham-wrapper">
              <nav className="header__nav-menu">
                <ul className="header__nav-menu-list">
                  <li className="header__nav-menu-list-item">
                    <Link to='/' className="header__nav-el">Главная</Link>
                  </li>
                </ul>
              </nav>

            
              <div 
              style={{display: !displyedHamburger ? "none" : ""}} 
              onClick={onClickDrawerToggle} 
              className={`header__hamburger ${drawerOpen ? 'header__hamburger_active' : ''}`}>
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
      </header>
  )
};


 
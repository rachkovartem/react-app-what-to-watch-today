import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import { useLocation, Link } from 'react-router-dom';
import { Fragment } from 'react';


import SearchIcon from '@mui/icons-material/Search';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header({filmsToWatch, setFilterSearch, filterSearch, onClickDrawerToggle}) {

  let location = useLocation()

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

  const filmsCounter = location.pathname === '/' ? <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
    >
      Нужно посмотреть {filmsToWatch} {filmsSwitcher(filmsToWatch)}
    </Typography> : null
    
  const searchInput = location.pathname === '/' ? <Search>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Найти..."
      inputProps={{ 'aria-label': 'search' }}
      value={filterSearch}
      onChange={(e) => setFilterSearch(e.target.value)}
    />
  </Search> : null

  const filtersMenuButton = location.pathname === '/' ? <IconButton
  size="large"
  edge="start"
  color="inherit"
  aria-label="open drawer"
  onClick={onClickDrawerToggle}
  sx={{ display: { xs: 'block', md: 'none' }, mr: 2 }}
>
  <MenuIcon />
</IconButton> : null

  const backButton = location.pathname === '/' ? null : <Link style={{textDecoration: 'none'}} to="/">
    <Button 
    sx={{backgroundColor: '#8e8e8e'}} 
    color="primary" 
    variant="contained" 
    startIcon={<ArrowBackSharpIcon />}>
      Назад
  </Button>
  </Link>

   

    const onClickHamburger = (e) => {
      e.currentTarget.classList.toggle('header__hamburger_active')
    }

   

    const haburgerStyle = location.pathname === '/' ? {display: ""} : {display: "none"};
    console.log(location.pathname)

  return (
      <Fragment>
        {header(onClickDrawerToggle, filmsSwitcher, filmsToWatch, onClickHamburger, haburgerStyle, location)}
      </Fragment>
    

  );
}


const header = (onClickDrawerToggle, filmsSwitcher, filmsToWatch, haburgerStyle, location) => {
  return (
  <section className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__films-counter">Нужно посмотреть {filmsToWatch} {filmsSwitcher(filmsToWatch)}</div>
              <div className="header__nav-ham-wrapper">
                <nav className="header__nav-menu">
                  <ul className="header__nav-menu-list">
                    <li className="header__nav-menu-list-item">
                      <a  href="#" className="header__nav-el">Главная</a>
                    </li>
                    <li className="header__nav-menu-list-item">
                      <a  href="#" className="header__nav-el">Профиль</a>
                    </li>
                  </ul>
                </nav>
  
              
                <div onClick={(e) => {onClickDrawerToggle()}} className="header__hamburger">
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
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import { useLocation, Link } from 'react-router-dom'

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

export default function AppInfo({filmsToWatch, setFilterSearch, filterSearch, onClickDrawerToggle}) {

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

  return (
    <Box  sx={{ flexGrow: 1 }}>
      <AppBar classes={{root: 'getHeight'}} sx={{position:{xs: 'static', md: 'fixed'}}}>
        <Toolbar>
          {backButton}
          {filtersMenuButton}
          {filmsCounter}
          {searchInput}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
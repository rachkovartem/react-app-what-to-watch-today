import * as React from 'react';
import PropTypes from 'prop-types';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SideMenuGenreFilter from '../sidemenuGenreFilter/SidemenuGenreFilter';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



const drawerWidth = 240;

function AppSidemenu(props) {
  const { window, drawerOpen, onClickDrawerToggle } = props;

  //стоковое открытие на хуках, не использую пока

  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  const selectedButton = (text) => {
    if (props.filterDate === text) {
      return true
    } else {return false}
  }

  const drawer = (
    <div>
      <Typography
            variant="div"
            noWrap
            component="div"
            sx={{ textAlign: 'center', flexGrow: 1, mt: {xs: 3, md: 1}, mr: 1, ml: 1, whiteSpace: 'normal'}}
          >
            Отобразить фильмы, добавленные за какой период?
      </Typography>
      <List>
        {['Неделя', 'Месяц', 'Год', 'Всё время'].map((text) => (
          <ListItem onClick={(e) => props.filterSetter.date(text)} selected={selectedButton(text)} button key={text} id={text}>
            {/* <ListItemIcon>
              
            </ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <SideMenuGenreFilter genres={props.genres} filterSetter={props.filterSetter} filterGenre={props.filterGenre}/>
      </List>
      <Divider />
      <Stack>
      <Button onClick={() => props.filtersReset()} sx={{mt: '25px', ml: 'auto', mr: 'auto'}} 
              variant="outlined">
                Сбросить фильтры
      </Button>
      </Stack>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div>
          <Drawer
            container={container}
            variant="temporary"
            open={drawerOpen}
            onClose={onClickDrawerToggle}
            ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { position: { xs: 'fixed', sm: 'initial' }, boxSizing: 'border-box', border: 'none'
            // width: drawerWidth 
            },
            }}
            open
          >
            {drawer}
          </Drawer>
      </div>
        
    )
}

AppSidemenu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AppSidemenu;
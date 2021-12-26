import './App.css';
import { Grid } from '@mui/material';
import AppInfo from '../App-info/App-info';
import FilmList from '../Film-list/Film-list';
import AppSidemenu from '../App-sidemenu/App-sidemenu';


export default function App() {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AppInfo/>
      </Grid>
      <Grid item xs={2}>
        <AppSidemenu/>
      </Grid>
      <Grid item xs={10}>
        <FilmList/>
      </Grid>
    </Grid>
  )
}


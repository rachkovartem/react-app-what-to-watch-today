import { Component } from 'react';
import './App.css';
import { Grid } from '@mui/material';
import nextId from "react-id-generator";
import AppInfo from '../App-info/App-info';
import FilmList from '../Film-list/Film-list';
import AppSidemenu from '../App-sidemenu/App-sidemenu';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {title: 'Меняющие реальность', subtitle: 'доп инфы нет', id: nextId(), timestamp: 1635358962, genre: 'action'},
        {title: 'Бумажный дом', subtitle: 'не помню, что такое', id: nextId(), timestamp: 1638296562, genre: 'drama'},
        {title: 'Игра в кальмара', subtitle: 'спорный сирик', id: nextId(), timestamp: 1639160562, genre: 'action'},
        {title: 'Новейший завет', subtitle: '2015', id: nextId(), timestamp: 1639161562, genre: 'comedy'},
        {title: 'Главный герой', subtitle: 'хз чтоэто', id: nextId(), timestamp: 1636160512, genre: 'drama'},
        {title: 'Вторжение', subtitle: '2007', id: nextId(), timestamp: 1635388962, genre: 'horror'},
        {title: 'ДМБ 1 часть', subtitle: 'говорят фильм годный', id: nextId(), timestamp: 1635358942, genre: 'thriller'},
      ],
      filterDate: '',
      filterGenre: [],
      filterSearch: ''
    }
  }

  genres = () => {
    return [...new Set(this.state.data.map(item => {
      return item.genre
    }))]
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id)
      } 
    })
  }

  addItem = ({title, subtitle}) => {
    this.setState(({data}) => {
      return {
        data: data.concat({
          title: title,
          subtitle: subtitle,
          id: nextId()
        })
      }
    })
  }

  filmsToWatch = () => {
    return this.state.data.length
  }

  filterSetter = (key) => {
    if (key ===  'Неделя' || 'Месяц' || 'Год' || 'Всё время') {
      console.log(key)
      this.setState({
        filterDate: key
      }) 
    } else if (typeof key === 'array') {
      this.setState({
        filterGenre: key
      }) 
    } else {
      this.setState({
        filterSearch: key
      }) 
    }
    
  }

  render() {
    const {data} = this.state;

    return(
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <AppInfo filmsToWatch={this.filmsToWatch()}/>
      </Grid>
      <Grid item xs={2}>
        <AppSidemenu genres={this.genres} filterSetter={this.filterSetter}/>
      </Grid>
      <Grid item xs={10}>
        <FilmList data={data} onAdd={this.addItem} onDelete={this.deleteItem}/>
      </Grid>
    </Grid>
    )

  }
}

export default App
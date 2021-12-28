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
        
      ],
      filterDate: 'Всё время',
      filterGenre: [],
      filterSearch: ''
    }
  }

  componentDidMount() {
    if (localStorage.getItem('movies')) {
      console.log('погнали')
      const newData = JSON.parse(localStorage.getItem('movies'))
      this.setState({
        data: newData.map((item) => {
          item.id = nextId()
          return item
        })
      })  
    } else {
      console.log('нету')
    }
  }
  
  
  localStorageSetter = (state) => {
    localStorage.setItem('movies', JSON.stringify(state))
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
    }, () => this.localStorageSetter(this.state.data))
  }

  addItem = ({title, subtitle, genre, timestamp}) => {
    this.setState(({data}) => {
      return {
        data: data.concat({
          title: title,
          subtitle: subtitle,
          id: nextId(),
          genre: genre,
          timestamp: timestamp
        })
      }
    }, () => this.localStorageSetter(this.state.data) )
    
  }

  filmsToWatch = () => {
    return this.state.data.length
  }

  filterGenreSetter = (key) => {
    this.setState({
      filterGenre: key
    }) 
  }

  filterDateSetter = (key) => {
    this.setState({
      filterDate: key
    }) 
  }

  filterSearchSetter = (key) => {
    this.setState({
      filterSearch: key
    }) 
  }

  filterGenre = (data, filter) => {
    if (filter.length === 0) {
      return data
    }
    return data.filter((item) => {
      return filter.some((genre) => {
        return genre === item.genre
      })
    })
  }

  filterDate = (data, filter) => {
    switch (filter) {
      case 'Неделя':
        return data.filter(item => (Date.now()/1000 - item.timestamp < 604800))
      case 'Месяц':
        return data.filter(item => (Date.now()/1000 - item.timestamp < 2629743))
      case 'Год':
        return data.filter(item => (Date.now()/1000 - item.timestamp < 31556926))
      default:
        return data
    }
  }

  filtersReset = () => {
    this.filterGenreSetter([])
    this.filterDateSetter('Всё время')
    this.filterSearchSetter('')
  }

  filterSearch = (data, filter) => {
    return data.filter((item) => {
      return (item.title.toLowerCase().includes(filter.toLowerCase()) 
      || item.subtitle.toLowerCase().includes(filter.toLowerCase()))
    })
  }

  render() {
    const {data, filterGenre, filterDate, filterSearch} = this.state;
    const filtredData = this.filterGenre(this.filterDate(this.filterSearch(data, filterSearch), filterDate), filterGenre);
    return(
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <AppInfo filmsToWatch={this.filmsToWatch()} filterSetter={this.filterSearchSetter} filterSearch={filterSearch}/>
      </Grid>
      <Grid item xs={2}>
        <AppSidemenu genres={this.genres} filterSetter={{genre: this.filterGenreSetter, date: this.filterDateSetter}} 
        filtersReset={this.filtersReset} filterGenre={filterGenre} filterDate={filterDate}/>
      </Grid>
      <Grid item xs={10}>
        <FilmList data={filtredData} onAdd={this.addItem} onDelete={this.deleteItem}/>
      </Grid>
    </Grid>
    )

  }
}

export default App
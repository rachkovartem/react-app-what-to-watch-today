import { Component } from 'react';
import { Grid, responsiveFontSizes } from '@mui/material';

import nextId from "react-id-generator";
import AppInfo from '../App-info/App-info';
import FilmList from '../Film-list/Film-list';
import AppSidemenu from '../App-sidemenu/App-sidemenu';

import './App.scss';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        
      ],
      filterDate: 'Всё время',
      filterGenre: [],  //массив с массивами, которые содержат несколько жанров каждого фильма
      filterSearch: '',
      drawerOpen: false
    }
  }

  // функция делает одномерный массив без повторений и из массива с массивами жанров
  filterGenreSpreaded = (arr) => {
    let arrSpreaded = []
    arr.forEach((e) => {
      e.forEach((e) => {
        if (!arrSpreaded.some(arrItem => arrItem === e)) {
          arrSpreaded.push(e)
        }
      })
    });

    return arrSpreaded

  }

  componentDidMount() {
    if (localStorage.getItem('movies')) {
      const newData = JSON.parse(localStorage.getItem('movies'))
      this.setState({
        data: newData.map((item) => {
          item.id = nextId()
          return item
        })
      })  
    } else {
      this.setState({
        data: [
          {title: 'тестовый', subtitle: 'фильм', id: nextId(), genre: ['драма'], timestamp: 1635449866},
          {title: 'тестовый', subtitle: 'фильм', id: nextId(), genre: ['боевик'], timestamp: 1610307466},
          {title: 'тестовый', subtitle: 'фильм', id: nextId(), genre: ['боевик'], timestamp: 1640633866},
          {title: 'тестовый', subtitle: 'фильм', id: nextId(), genre: ['драма'], timestamp: 1590608266},
          {title: 'тестовый', subtitle: 'фильм', id: nextId(), genre: ['комедия'], timestamp: Math.round(Date.now()/1000)},
        ]
      }) 
    }
  }
  
  
  localStorageSetter = (state) => {
    localStorage.setItem('movies', JSON.stringify(state))
  }

//функция возвращает массив неповторяющихся жанров вместо массива с массивами жанров каждого фильма
  genres = () => {
    let arr = []
    this.state.data.forEach(item => {
      item.genre.forEach((e) => {
        if (!arr.some(arrItem => arrItem === e)) {
          arr.push(e)
        }
      })
    })
    return arr
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id)
      } 
    }, () => this.localStorageSetter(this.state.data))
  }

  addItem = ({title, subtitle, genre, timestamp, posterUrlPreview}) => {
    this.setState(({data}) => {
      return {
        data: data.concat({
          title: title,
          subtitle: subtitle,
          id: nextId(),
          genre: genre,
          timestamp: timestamp,
          posterUrlPreview: posterUrlPreview
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

  // filterGenre = (data, filter) => {
  //   if (filter.length === 0) {
  //     return data
  //   }
  //   return data.filter((item) => {

  //     let res
  //     item.genre.reduce((allFilmGenres, filmGenre) => {
  
  //       if (filter.some(filterGenre => filterGenre === filmGenre)) {
  //         allFilmGenres.push(filmGenre)

  //       }
  //       let numOfMatch = 0;

  //       allFilmGenres.forEach((filmGenre) => {
  //         if (filter.some(filterGenre => filterGenre === filmGenre)) {
  //           numOfMatch = numOfMatch + 1;
  //         }
  //       })

  //       if (numOfMatch === filter.length) {
  //         res = true
  //       }

  //       return allFilmGenres

  //     }, [])
  //     return res
  //   })
  // }

  filterGenre = (data, filter) => {
    return data.filter(film => {
      return filter.every(filterGenre => {
        return film.genre.includes(filterGenre)
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

  onClickDrawerToggle = () => {
    this.setState(({drawerOpen}) => ({
      drawerOpen: !drawerOpen
    }))
  }

 

  render() {
    const {data, filterGenre, filterDate, filterSearch} = this.state;
    const filtredData = this.filterGenre(this.filterDate(this.filterSearch(data, filterSearch), filterDate), filterGenre);
    return(
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <AppInfo onClickDrawerToggle={this.onClickDrawerToggle} filmsToWatch={this.filmsToWatch()} filterSetter={this.filterSearchSetter} filterSearch={filterSearch}/>
      </Grid>
      <Grid item xs={2}>
        <AppSidemenu onClickDrawerToggle={this.onClickDrawerToggle} drawerOpen={this.state.drawerOpen} genres={this.genres} filterSetter={{genre: this.filterGenreSetter, date: this.filterDateSetter}} 
        filtersReset={this.filtersReset} filterGenre={filterGenre} filterDate={filterDate}/>
      </Grid>
      <Grid item xs={12} md={10}>
        <FilmList data={filtredData} onAdd={this.addItem} onDelete={this.deleteItem}/>
      </Grid>
    </Grid>
    )

  }
}

export default App
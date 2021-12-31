import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NewFilmDatePicker from '../New-film-date-picker/New-film-date-picker';
import KinopoiskServices from '../Services/KinopoiskServices';
import Autocomplete from '@mui/material/Autocomplete';
import nextId from "react-id-generator";
import debounce from 'lodash.debounce';




class NewFilmDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      subtitle: '',
      genre: '',
      timestamp: Math.round(Date.now()/1000),
      open: false,
      canClose: false,
      filmOptions: [],
      userTitleChoise: null
    }
  }

  services = new KinopoiskServices();

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  };
  
  handleClose = () => {
    this.setState({
      open: false
    })
  };

  timestampToPicker = () => {
    const stamp = new Date(this.state.timestamp * 1000)
    const newDate = `${stamp.getMonth() + 1}/${stamp.getDate()}/${stamp.getFullYear()}` 
    return newDate
  }

  onDateChange = (value) => {
    this.setState({
      timestamp: Math.round(Date.parse(value)/1000)
    }) 

  }

  handleAdd = () => {
    const title = this.state.title;
    const subtitle = this.state.subtitle;
    const genre = this.state.genre.toLocaleLowerCase();
    const timestamp = this.state.timestamp;
    this.props.onAdd({title, subtitle, genre, timestamp});
    this.setState({
      title: '',
      subtitle: '',
      genre: '',
      open: false
    })
  }

  onValueTitleChange = (e, newValue) => {
    this.setState({
      // [e.target.id]: e.target.value
      title: newValue,
      userTitleChoise: '',
      canClose: false
    }, () => {
      // if (this.state.title.length < 3 || this.state.genre.length < 3) {
      //   this.setState({
      //     canClose: false
      //   })
      // } else {
      //   this.setState({
      //     canClose: true
      //   })
      // }
    })
    this.dbGetFilmsAndSetState(newValue)
  }

  onValueSubtitleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  

  dbGetFilmsAndSetState = debounce((e) => this.getFilmsAndSetState(e), 250, {
    'leading': true,
    'trailing': false
  }); 


  getFilmsAndSetState = async (input) => {
    const response = await this.services.getFilmByKeyWord(input);
    this.setState({filmOptions: response.films.map((item) => {

      return {label: `${item.nameRu ? item.nameRu : ''}${item.nameEn ? ` (${item.nameEn})` : ''}, ${item.year}`,
              id: item.filmId, 
              genres: item.genres.map(item => (item.genre)),
              posterUrlPreview: item.posterUrlPreview,
              description: item.description,
              key: nextId()}
    })})
  }

  onUserChoise = (e, newValue) => {
    this.setState({
      userTitleChoise: newValue,
      canClose: true,
      subtitle: this.state.userTitleChoise.description
    })
    setTimeout(() => {
      this.setState({
        userTitleChoise: newValue,
        canClose: true,
        subtitle: this.state.userTitleChoise.description
      })
    }, 200)
  }

  validationTextForm = () => {
    if (!this.state.userTitleChoise) {
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <div>
          <Fab onClick={this.handleClickOpen} size="medium" color="primary" aria-label="add" sx={{ml: 2, mt: 2, width: 40, height: 40}}>
              <AddIcon />
          </Fab>
          <Dialog open={this.state.open} onClose={this.handleClose}>
              <DialogTitle>Запланировать фильм</DialogTitle>
              <DialogContent>
              <DialogContentText>
                  Какой фильм нужно будет посмотреть?
              </DialogContentText>

              <Autocomplete
                isOptionEqualToValue={(option, value) => option.id === value.id}
                input={this.state.userTitleChoise}
                onChange={this.onUserChoise}
                inputValue={this.state.title}
                onInputChange={this.onValueTitleChange}
                options={this.state.filmOptions}
                renderInput={(params) => this.TextFieldTitle(params)}
              />
              
              <TextField
                  margin="dense"
                  id="subtitle"
                  label="Описание"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={this.state.subtitle ? this.state.subtitle : ''}
                  onChange={this.onValueSubtitleChange}
              />
              <TextField
                  required
                  error={this.validationTextForm(this.state.genre)}
                  margin="dense"
                  id="genre"
                  label="Жанр"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={this.state.genre}
                  onChange={this.onValueChange}
              />
              <NewFilmDatePicker timestampToPicker={this.timestampToPicker} onDateChange={this.onDateChange}/>
              </DialogContent>
              <DialogActions>
              <Button onClick={this.handleClose}>Отменить</Button>
              <Button disabled={this.state.canClose ? false : true} onClick={this.handleAdd}>Добавить</Button>
              </DialogActions>
          </Dialog>
      </div>
    );
  }
  
  TextFieldTitle = (params) => {
    return (
      <TextField
        {...params}
        autoFocus
        required
        error={this.validationTextForm()}
        margin="dense"
        id="title"
        label="Название"
        type="text"
        fullWidth
        variant="standard"
      />
    )
  }
  
  
}



export default NewFilmDialog
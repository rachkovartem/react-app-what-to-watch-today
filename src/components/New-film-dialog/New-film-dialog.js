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
      userTitleChoise: '',
      posterUrlPreview: ''
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
    const genre = this.state.userTitleChoise.genres;
    const {title, subtitle, timestamp, posterUrlPreview} = this.state
    this.props.onAdd({title, subtitle, genre, timestamp, posterUrlPreview});
    this.setState({
      title: '',
      subtitle: '',
      genre: '',
      posterUrlPreview: '',
      open: false
    })
  }

  onValueTitleChange = (e, newValue) => {

    this.setState({
      // [e.target.id]: e.target.value
      title: newValue,
      userTitleChoise: '',
      canClose: false
    }, () => this.dbGetFilmsAndSetState(newValue))

  }

  onValueSubtitleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  

  dbGetFilmsAndSetState = debounce((e) => this.getFilmsAndSetState(e), 250); 


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
      subtitle: this.state.userTitleChoise ? this.state.userTitleChoise.description : '',
      genre: this.state.userTitleChoise ? this.state.userTitleChoise.genres.join(', ') : '',
      posterUrlPreview: this.state.userTitleChoise ? this.state.userTitleChoise.posterUrlPreview : ''
    })
    setTimeout(() => {
      this.setState({
        userTitleChoise: newValue,
        canClose: true,
        subtitle: this.state.userTitleChoise ? this.state.userTitleChoise.description : '',
        genre: this.state.userTitleChoise ? this.state.userTitleChoise.genres.join(', ') : '',
        posterUrlPreview: this.state.userTitleChoise ? this.state.userTitleChoise.posterUrlPreview : ''
      })
    }, 300)
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
                isOptionEqualToValue={(option, value) => {
                  return option.id === value.id
                }}
                input={this.state.userTitleChoise}
                onChange={this.onUserChoise}
                inputValue={this.state.title}
                onInputChange={this.onValueTitleChange}
                options={this.state.filmOptions}
                renderInput={(params) => this.TextFieldTitle(params)}
              />
              
              <TextField
                  multiline={true}
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
                  disabled
                  // required
                  // error={this.validationTextForm(this.state.genre)}
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
              <Button disabled={this.state.title === "" ? true : !this.state.canClose} onClick={this.handleAdd}>Добавить</Button>
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
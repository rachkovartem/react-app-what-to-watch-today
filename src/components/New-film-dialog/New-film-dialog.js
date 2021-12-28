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



class NewFilmDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      subtitle: '',
      genre: '',
      timestamp: Math.round(Date.now()/1000),
      open: false,
      canClose: false
    }
  }

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

  onValueChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    }, () => {
      if (this.state.title.length < 3 || this.state.genre.length < 3) {
        this.setState({
          canClose: false
        })
      } else {
        this.setState({
          canClose: true
        })
      }
    })
    
  }

  validationTextForm = (text) => {
    if (text.length < 3) {
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
              <TextField
                  autoFocus
                  required
                  error={this.validationTextForm(this.state.title)}
                  margin="dense"
                  id="title"
                  label="Название"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={this.state.title}
                  onChange={this.onValueChange}
              />
              <TextField
                  margin="dense"
                  id="subtitle"
                  label="Описание"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={this.onValueChange}
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
  
  
  
}

export default NewFilmDialog
import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NewFilmDatePicker from '../newFilmDatePicker/NewFilmDatePicker';
import KinopoiskServices from '../../services/KinopoiskServices';
import Autocomplete from '@mui/material/Autocomplete';
import nextId from "react-id-generator";
import debounce from 'lodash.debounce';





const NewFilmDialog = (props) => {
  const {loading, error, getFilmByKeyWord} = KinopoiskServices();
  const [title, setTitle] = useState('');
  const [timestamp, setTimeStamp] = useState(() => Math.round(Date.now()/1000));
  const [open, setOpen] = useState(false);
  const [filmOptions, setFilmOptions] = useState([]);
  const [userChoise, setUserChoise] = useState(null);

  const timestampToPicker = () => {
    const stamp = new Date(timestamp * 1000)
    const newDate = `${stamp.getMonth() + 1}/${stamp.getDate()}/${stamp.getFullYear()}` 
    return newDate
  }

  const onDateChange = (value) => {
    setTimeStamp(Math.round(Date.parse(value)/1000))
  }


  const handleAdd = () => {
    const genre = userChoise.genres;
    const title = userChoise.label;
    const subtitle = userChoise.description;
    const {id, posterUrlPreview} = userChoise;
    props.onAdd({title, subtitle, genre, timestamp, posterUrlPreview, id});
    setUserChoise(null);
    setOpen(false);
  }


  useEffect(() => {
    dbGetFilmsAndSetState(title);
  }, [title])

  const onValueSubtitleChange = (e) => {
    setUserChoise((prevChoise => {
      const newChoise = {...prevChoise};
      newChoise.description = e.target.value;
      return newChoise
      
    }))
  }
  
  const dbGetFilmsAndSetState = debounce((e) => getFilmsAndSetState(e), 250); 


  const getFilmsAndSetState = (input) => {
    
    getFilmByKeyWord(input)
      .then(response => {
        const newFilmOptions = response.films.map((item) => {
          return {label: `${item.nameRu ? item.nameRu : ''}${item.nameEn ? ` (${item.nameEn})` : ''}, ${item.year}`,
                  id: item.filmId, 
                  genres: item.genres.map(item => (item.genre)),
                  posterUrlPreview: item.posterUrlPreview,
                  description: item.description,
                  key: nextId()}
        })
        setFilmOptions(newFilmOptions);

      })
      .catch(setFilmOptions([])) 
  }


  const validationTextForm = () => {
    if (!userChoise) {
      return true
    } else {
      return false
    }
  }

  const TextFieldTitle = (params) => {
    return (
      <TextField
        {...params}
        autoFocus
        required
        error={validationTextForm()}
        margin="dense"
        id="title"
        label="Название"
        type="text"
        fullWidth
        variant="standard"
      />
    )
  }

  return (
    <div>
        <Fab onClick={() => setOpen(true)} 
            size="medium" 
            color="primary" 
            aria-label="add" 
            sx={{ml: 2, mt: 2, width: 40, height: 40}}>
            <AddIcon />
        </Fab>
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Запланировать фильм</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Какой фильм нужно будет посмотреть?
            </DialogContentText>

            <Autocomplete
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id
              }}
              input={userChoise}
              onChange={(e, newValue) => setUserChoise(newValue)}
              inputValue={title}
              onInputChange={(e, newValue) => setTitle(newValue)}
              options={filmOptions}
              renderInput={(params) => TextFieldTitle(params)}
              noOptionsText={'Не нашли такой фильм :('}
              loading={loading}
              loadingText={error ? 'Ошибка на сервере, попробуйте позже' : 'Уже ищем...'}
            />
            
            <TextField
                multiline={true}
                margin="dense"
                id="subtitle"
                label="Описание"
                type="text"
                fullWidth
                variant="standard"
                value={userChoise ? userChoise.description : ''}
                onChange={onValueSubtitleChange}
            />
            <TextField
                disabled
                margin="dense"
                id="genre"
                label="Жанр"
                type="text"
                fullWidth
                variant="standard"
                value={userChoise ? userChoise.genres.join(', ') : ''}
            />
            <NewFilmDatePicker timestampToPicker={timestampToPicker} onDateChange={onDateChange}/>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpen(false)}>Отменить</Button>
            <Button disabled={userChoise ? false : true} onClick={handleAdd}>Добавить</Button>
            </DialogActions>
        </Dialog>
    </div>
  );  
}



export default NewFilmDialog
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NewFilmDatePicker from '../newFilmDatePicker/NewFilmDatePicker';
import KinopoiskServices from '../../services/KinopoiskServices';
import Autocomplete from '@mui/material/Autocomplete';
import nextId from "react-id-generator";
import { ThemeProvider, createTheme } from '@mui/material';

import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography';

import './NewFilmDialog.scss';

let timer;
function debounce(func, timeout = 500){
  
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const NewFilmDialog = (props) => {

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Montserrat',
        '-apple-system',
        'BlinkMacSystemFont', 
        'Segoe UI', 
        'Roboto', 
        'Oxygen', 
        'Ubuntu', 
        'Cantarell', 
        'Open Sans', 
        'Helvetica Neue', 
        'sans-serif'
      ].join(','),
    }
  });
  const {onAdd, isIdAlreadyExists} = props;
  const {loading, error, getFilmByKeyWord} = KinopoiskServices();
  const [title, setTitle] = useState('');
  const [timestamp, setTimeStamp] = useState(() => Math.round(Date.now()/1000));
  const [open, setOpen] = useState(false);
  const [filmOptions, setFilmOptions] = useState([]);
  const [userChoise, setUserChoise] = useState(null);
  const [searchInProgress, setSearchInProgress] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const titleInput = useRef(null);
  const delay = 500;

  const timestampToPicker = () => {
    const stamp = new Date(timestamp * 1000)
    const newDate = `${stamp.getMonth() + 1}/${stamp.getDate()}/${stamp.getFullYear()}` 
    return newDate
  }

  const onDateChange = (value) => {
    setTimeStamp(Math.round(Date.parse(value)/1000))
  }
  

  //всплывающее окно о уже сущестующем фильме, триггер по нажантию добавить
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
 
  const openPopover = Boolean(anchorEl);

  const id = openPopover ? 'simple-popover' : undefined;

  const handleAdd = (e) => {
    
    if (isIdAlreadyExists(userChoise.id)) {
      setAnchorEl(e.currentTarget);
      return
    }
    const genre = userChoise.genres;
    const title = userChoise.label;
    const subtitle = userChoise.description;
    const {id, posterUrlPreview} = userChoise;
    onAdd({title, subtitle, genre, timestamp, posterUrlPreview, id});
    setUserChoise(null);
    setOpen(false);
  }

  const debouncedGetFilmsAndSetState = debounce((title) => getFilmsAndSetState(title), delay);
  
  useEffect(() => {
    
    debouncedGetFilmsAndSetState(title)
    setSearchInProgress(true)
    
  }, [title])


  //а нужно было просто взять другой инпут из MUI, спать надо ложиться раньше
  const onFocusInputTitle = (e) => {
    e.target.parentNode.parentNode.classList.add('MuiFormControl-root-primary-border')
  }
  const outFocusInputTitle = (e) => {
    e.target.parentNode.parentNode.classList.remove('MuiFormControl-root-primary-border')
   
  }
  const onFocusInputSubtitle = (e) => {
    e.target.parentNode.parentNode.classList.add('MuiFormControl-root-primary-border-subtitle')

  }
  const outFocusInputSubtitle = (e) => {
    e.target.parentNode.parentNode.classList.remove('MuiFormControl-root-primary-border-subtitle')
  }
  

  const onValueSubtitleChange = (e) => {
    setUserChoise((prevChoise => {
      const newChoise = {...prevChoise};
      newChoise.description = e.target.value;
      return newChoise
      
    }))
  }
 
  useEffect(() => {
    setSearchInProgress(false)
  }, [filmOptions])


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
        onFocus={onFocusInputTitle}
        onBlur={outFocusInputTitle}
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

  const loadingCatcher = (loading) => {
    let res = loading
    if (loading) {
      setTimeout(() => {
        res = false
        return res
      }, delay)
    }

    if (!loading) {
      setTimeout(() => {
        res = true
        return res
      }, 250)
    }
    return res
  }

 const noOptionText = () => {
    if (searchInProgress) {
      return '' 
    } else if (!searchInProgress && title === '') {
      return 'Введите название фильма, чтобы найти его...'
    } else if (!loading && !searchInProgress) {
      return 'Не нашли такой фильм :('
    } 
 }
 

  return (
    <div>
        <button className="film-list__add-button" onClick={() => setOpen(true)}>
          <svg rotate="45" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.75781 7.75732L16.2431 16.2426" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.75781 16.2426L16.2431 7.75732" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <ThemeProvider theme={theme}>
          <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>Запланировать фильм</DialogTitle>
              <DialogContent>
                <DialogContentText sx={{color: 'var(--grey-100)'}}>
                    Какой фильм нужно будет посмотреть?
                </DialogContentText>

                <Autocomplete
                  ref={titleInput}
                  isOptionEqualToValue={(option, value) => {
                    return option.id === value.id
                  }}
                  input={userChoise}
                  
                  onChange={(e, newValue) => setUserChoise(newValue)}
                  inputValue={title}
                  onInputChange={(e, newValue) => setTitle(newValue)}
                  options={filmOptions}
                  renderInput={(params) => TextFieldTitle(params)}
                  noOptionsText={noOptionText()}
                  loading={loadingCatcher(loading) || searchInProgress}
                  loadingText={error ? 'Ошибка на сервере, попробуйте позже' : 'Уже ищем...'}
                />
                
                <TextField
                    onFocus={onFocusInputSubtitle}
                    onBlur={outFocusInputSubtitle}
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
                    classes={{root: "Mui_textfield_genres"}}
                    inputProps={{color: 'white'}}
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
              <Button aria-describedby={id} disabled={userChoise ? false : true} onClick={handleAdd}>Добавить</Button>
              <Popover
              sx={{
                '& .MuiPopover-paper': {backgroundColor: 'var(--grey-600)', color: 'var(--grey-100)'}}}
              id={id}
              open={openPopover}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{
                 vertical: 'top',
                 horizontal: 'left',

              }}
              transformOrigin={{ vertical: 'top', horizontal: 'right', }

              }
              >
                <Typography sx={{ p: 2 }}>Этот фильм уже есть в списке</Typography>
               </Popover>
              </DialogActions>
          </Dialog>
        </ThemeProvider>
    </div>
  );  
}



export default NewFilmDialog
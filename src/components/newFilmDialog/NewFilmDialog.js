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
import useDebounce from '../../hooks/debounce';
import { ThemeProvider, createTheme } from '@mui/material';

import './NewFilmDialog.scss';
import { set } from 'lodash';







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
    },
    palette: {
      primary: {
        main: "#362c92",
        contrastText: "#fff"
      },
      secondary: {
        main: "#362c92"
      },
      error: {
        main: "#362c92"
      },
      warning: {
        main: "#362c92"
      },
      info: {
        main: "#362c92"
      },
      success: {
        main: "#362c92"
      },

    }
  });

  const {loading, error, getFilmByKeyWord} = KinopoiskServices();
  const [title, setTitle] = useState('');
  const [timestamp, setTimeStamp] = useState(() => Math.round(Date.now()/1000));
  const [open, setOpen] = useState(false);
  const [filmOptions, setFilmOptions] = useState([]);
  const [userChoise, setUserChoise] = useState(null);
  const titleInput = useRef(null);

  // useEffect(() => {
  //   console.dir(titleInput.current)
  //   if (titleInput.current) {
  //     titleInput.current.children[0].addEventListener('focus', onFocusInput());
  //     titleInput.current.children[0].addEventListener('blur', outFocusInput());
  //     // document.querySelector('.css-1x51dt5-MuiInputBase-input-MuiInput-input').addEventListener('focus', onFocusInput())
  //     // document.querySelector('.css-1x51dt5-MuiInputBase-input-MuiInput-input').addEventListener('blur', outFocusInput())
  //   }
  // },[open])

  // useEffect(() => {   
  //   return () => {
  //     document.querySelector('.css-1x51dt5-MuiInputBase-input-MuiInput-input').removeEventListener('focus', onFocusInput);
  //     document.querySelector('.css-1x51dt5-MuiInputBase-input-MuiInput-input').removeEventListener('blur', outFocusInput);
  //   }
  // }, [])
   

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

  const debouncedTitle = useDebounce(title, 250) 

  useEffect(() => {
    if (title && !loading) {
      getFilmsAndSetState(title)
    }
}, [debouncedTitle])

  const onFocusInputTitle = (e) => {
    e.target.parentNode.parentNode.classList.add('MuiFormControl-root-primary-border')
    // document.querySelector('.css-1z10yd4-MuiFormControl-root-MuiTextField-root').classList.add('MuiFormControl-root-primary-border')
  }

  const outFocusInputTitle = (e) => {
    e.target.parentNode.parentNode.classList.remove('MuiFormControl-root-primary-border')
    // document.querySelector('.css-1z10yd4-MuiFormControl-root-MuiTextField-root').classList.remove('MuiFormControl-root-primary-border')
  }


  const onFocusInputSubtitle = (e) => {
    e.target.parentNode.parentNode.classList.add('MuiFormControl-root-primary-border-subtitle')
    // document.querySelector('.css-1z10yd4-MuiFormControl-root-MuiTextField-root').classList.add('MuiFormControl-root-primary-border')
  }

  const outFocusInputSubtitle = (e) => {
    e.target.parentNode.parentNode.classList.remove('MuiFormControl-root-primary-border-subtitle')
    // document.querySelector('.css-1z10yd4-MuiFormControl-root-MuiTextField-root').classList.remove('MuiFormControl-root-primary-border')
  }
  

  

  

  const onValueSubtitleChange = (e) => {
    setUserChoise((prevChoise => {
      const newChoise = {...prevChoise};
      newChoise.description = e.target.value;
      return newChoise
      
    }))
  }
 

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
        // sx={{color: '#c3c8d4'}}
        // color='secondary'
      />
    )
  }

  const loadingCatcher = (loading) => {
    let res = loading
    if (loading) {
      setTimeout(() => {
        res = false
        return res
      }, 250)
    }

    if (!loading) {
      setTimeout(() => {
        res = true
        return res
      }, 250)
    }
    return res
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
                noOptionsText={'Не нашли такой фильм :('}
                loading={loadingCatcher(loading)}
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
            <Button disabled={userChoise ? false : true} onClick={handleAdd}>Добавить</Button>
            </DialogActions>
        </Dialog>
        </ThemeProvider>
    </div>
  );  
}



export default NewFilmDialog
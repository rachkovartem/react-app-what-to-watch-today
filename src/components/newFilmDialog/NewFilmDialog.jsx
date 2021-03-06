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
import { ThemeProvider, createTheme } from '@mui/material';
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography';

import nextId from "react-id-generator";

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
  const {onAdd, isIdAlreadyExists, open, setOpen} = props;
  const {loading, error, clearError, getFilmByKeyWord} = KinopoiskServices();
  const [title, setTitle] = useState('');
  const [timestamp, setTimeStamp] = useState(() => Math.round(Date.now()/1000));
  
  const [filmOptions, setFilmOptions] = useState([]);
  const [userChoise, setUserChoise] = useState(null);
  const [searchInProgress, setSearchInProgress] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMounted, setIsMounted] = useState(false)

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
  
  //?????????????????????? ???????? ?? ?????? ?????????????????????? ????????????, ?????????????? ???? ???????????????? ????????????????
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
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {

    debouncedGetFilmsAndSetState(title)
    setSearchInProgress(true)
  
  }, [title])

  //?? ?????????? ???????? ???????????? ?????????? ???????????? ?????????? ???? MUI, ?????????? ???????? ???????????????? ????????????
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
        if (!isMounted) return
        setFilmOptions(newFilmOptions);

      })
      .catch(() => {
        if (!isMounted) return
        setFilmOptions([])
      }) 
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
        label="????????????????"
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
      return '?????????????? ???????????????? ????????????, ?????????? ?????????? ??????...'
    } else if (!loading && !searchInProgress) {
      return '???? ?????????? ?????????? ?????????? :('
    } 
  }

  const onInputChange = (newValue) => {
    setTitle(newValue);
    clearError()
  }

  return (
    <>
        
        <ThemeProvider theme={theme}>
          <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>?????????????????????????? ??????????</DialogTitle>
              <DialogContent>
                <DialogContentText sx={{color: 'var(--grey-100)'}}>
                    ?????????? ?????????? ?????????? ?????????? ?????????????????????
                </DialogContentText>

                <Autocomplete
                  ref={titleInput}
                  isOptionEqualToValue={(option, value) => {
                    return option.id === value.id
                  }}
                  input={userChoise}
                  
                  onChange={(e, newValue) => setUserChoise(newValue)}
                  inputValue={title}
                  onInputChange={(e, newValue) => onInputChange(newValue)}
                  options={filmOptions}
                  renderInput={(params) => TextFieldTitle(params)}
                  noOptionsText={noOptionText()}
                  loading={loadingCatcher(loading) || searchInProgress}
                  loadingText={error ? '???????????? ???? ??????????????, ???????????????????? ??????????' : '?????? ????????...'}
                />
                
                <TextField
                    onFocus={onFocusInputSubtitle}
                    onBlur={outFocusInputSubtitle}
                    multiline={true}
                    margin="dense"
                    id="subtitle"
                    label="????????????????"
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
                    label="????????"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={userChoise ? userChoise.genres.join(', ') : ''}
                />
                <NewFilmDatePicker timestampToPicker={timestampToPicker} onDateChange={onDateChange}/>
              </DialogContent>
              <DialogActions>
              <Button onClick={() => setOpen(false)}>????????????????</Button>
              <Button aria-describedby={id} disabled={userChoise ? false : true} onClick={handleAdd}>????????????????</Button>
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
                <Typography sx={{ p: 2 }}>???????? ?????????? ?????? ???????? ?? ????????????</Typography>
               </Popover>
              </DialogActions>
          </Dialog>
        </ThemeProvider>
    </>
  );  
}



export default NewFilmDialog
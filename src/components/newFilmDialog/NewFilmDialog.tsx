import { useTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { $userFilmsList, addFilm } from "../../models/films";
import KinopoiskService from "../../services/KinopoiskService";
import Autocomplete from "@mui/material/Autocomplete";
import { ThemeProvider } from "@mui/material";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import "./NewFilmDialog.scss";
import { useStore, useStoreMap } from "effector-react";
import { $isAddModalOpened, toggleAddModal } from "../../models/app";

let timer;
function debounce(func, timeout = 500) {
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const NewFilmDialog = () => {
  const theme = useTheme();
  const open = useStore($isAddModalOpened);

  const userFilmsIds = useStoreMap($userFilmsList, (films) =>
    Array.isArray(films) ? films.map((film) => film.kinopoiskId) : []
  );

  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [filmOptions, setFilmOptions] = useState([]);
  const [userChoose, setUserChoose] = useState(null);
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [alreadyExistAnchorEl, setAlreadyExistAnchorEl] = useState(null);

  const { getFilmByKeyWord, getFilmById } = KinopoiskService;

  const delay = 500;

  const handleClosePopover = () => {
    setAlreadyExistAnchorEl(null);
  };

  const openPopover = Boolean(alreadyExistAnchorEl);

  const handleAdd = async (e) => {
    if (userFilmsIds.includes(userChoose.filmId)) {
      setAlreadyExistAnchorEl(e.currentTarget);
      return;
    }

    const fullFilmData = await getFilmById(userChoose.filmId);
    addFilm(fullFilmData);

    setUserChoose(null);
    toggleAddModal(false);
  };

  const debouncedGetFilmsAndSetState = debounce(
    (title) => getFilmsAndSetState(title),
    delay
  );

  const onFocusInputTitle = (e) => {
    e.target.parentNode.parentNode.classList.add(
      "MuiFormControl-root-primary-border"
    );
  };
  const outFocusInputTitle = (e) => {
    e.target.parentNode.parentNode.classList.remove(
      "MuiFormControl-root-primary-border"
    );
  };
  const onFocusInputSubtitle = (e) => {
    e.target.parentNode.parentNode.classList.add(
      "MuiFormControl-root-primary-border-subtitle"
    );
  };
  const outFocusInputSubtitle = (e) => {
    e.target.parentNode.parentNode.classList.remove(
      "MuiFormControl-root-primary-border-subtitle"
    );
  };

  const getFilmsAndSetState = (input) => {
    setError(false);
    setSearchInProgress(true);
    getFilmByKeyWord(input)
      .then((response) => {
        setFilmOptions(response.films);
      })
      .catch(() => {
        setError(true);
        setFilmOptions([]);
      })
      .finally(() => {
        setSearchInProgress(false);
      });
  };

  const loadingCatcher = (loading) => {
    let res = loading;
    if (loading) {
      setTimeout(() => {
        res = false;
        return res;
      }, delay);
    }

    if (!loading) {
      setTimeout(() => {
        res = true;
        return res;
      }, 250);
    }
    return res;
  };
  console.log(searchInProgress);
  const noOptionText = useMemo(() => {
    if (searchInProgress) {
      return "";
    } else if (!searchInProgress && title === "") {
      return "Введите название фильма, чтобы найти его...";
    } else if (!searchInProgress) {
      return "Не нашли такой фильм :(";
    }
  }, [searchInProgress, title]);

  const onInputChange = (newValue: string) => {
    setTitle(newValue);
    debouncedGetFilmsAndSetState(newValue);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Dialog open={open} onClose={() => toggleAddModal(false)}>
          <DialogTitle>Запланировать фильм</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "var(--grey-100)" }}>
              Какой фильм нужно будет посмотреть?
            </DialogContentText>
            <Autocomplete
              isOptionEqualToValue={(option, value) => {
                return option.kinopoiskId === value.kinopoiskId;
              }}
              getOptionLabel={(item) =>
                `${item.nameRu ? item.nameRu : ""}${
                  item.nameEn ? ` (${item.nameEn})` : ""
                }, ${item.year}`
              }
              onChange={(_, newValue) => setUserChoose(newValue)}
              inputValue={title}
              onInputChange={(_, newValue) => onInputChange(newValue)}
              options={filmOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoFocus
                  required
                  onFocus={onFocusInputTitle}
                  onBlur={outFocusInputTitle}
                  error={!userChoose}
                  margin="dense"
                  id="title"
                  label="Название"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              )}
              noOptionsText={noOptionText}
              loading={loadingCatcher(searchInProgress)}
              loadingText={
                error ? "Ошибка на сервере, попробуйте позже" : "Идет поиск..."
              }
            />
            <TextField
              onFocus={onFocusInputSubtitle}
              onBlur={outFocusInputSubtitle}
              multiline
              margin="dense"
              label="Описание"
              type="text"
              fullWidth
              InputProps={{ readOnly: true }}
              variant="standard"
              value={userChoose?.description || ""}
            />
            <TextField
              classes={{ root: "Mui_textfield_genres" }}
              inputProps={{ color: "white" }}
              disabled
              margin="dense"
              label="Жанр"
              type="text"
              fullWidth
              variant="standard"
              value={
                userChoose
                  ? userChoose.genres.map((item) => item.genre).join(", ")
                  : ""
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => toggleAddModal(false)}>Отменить</Button>
            <Button disabled={!userChoose} onClick={handleAdd}>
              Добавить
            </Button>
            <Popover
              sx={{
                "& .MuiPopover-paper": {
                  backgroundColor: "var(--grey-600)",
                  color: "var(--grey-100)",
                },
              }}
              open={openPopover}
              anchorEl={alreadyExistAnchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Typography sx={{ p: 2 }}>
                Этот фильм уже есть в списке
              </Typography>
            </Popover>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default NewFilmDialog;

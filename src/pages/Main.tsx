import { useStore } from "effector-react";
import { useState } from "react";
import { $userFilmsList, Film } from "../models/films";

import FilmList from "../components/filmList/FilmList";
import AppSidemenu from "../components/appSidemenu/AppSideMenu";
import KinopoiskServices from "../services/KinopoiskServices";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

import Search from "../components/search/Search";
import NewFilmDialog from "../components/newFilmDialog/NewFilmDialog";

const Main = () => {
  const [filterDate, setFilterDate] = useState<string>("Всё время");
  const [filterGenre, setFilterGenre] = useState<Array<unknown>>([]);
  const [filterSearch, setFilterSearch] = useState("");
  const [open, setOpen] = useState(false);
  const userFilmsList = useStore($userFilmsList);
  const { loading } = KinopoiskServices();

  const genres = () => {
    let result = [];
    userFilmsList.forEach((film) => {
      film.genres.forEach((genresObject) => {
        if (!result.some((resultItem) => resultItem === genresObject.genre)) {
          result.push(genresObject.genre);
        }
      });
    });
    return result;
  };

  const filterGenreSetter = (key) => {
    setFilterGenre(key);
  };

  const filterDateSetter = (key) => {
    setFilterDate(key);
  };

  const onFilterGenre = (data: Film[], filter) => {
    if (!data) return;
    return data.filter((film) =>
      filter.every((filterGenre) =>
        film.genres.some((genreObject) => genreObject.genre === filterGenre)
      )
    );
  };

  const onFilterDate = (data, filter) => {
    switch (filter) {
      case "Неделя":
        return data.filter(
          (item) => Date.now() / 1000 - item.timestamp < 604800
        );
      case "Месяц":
        return data.filter(
          (item) => Date.now() / 1000 - item.timestamp < 2629743
        );
      case "Год":
        return data.filter(
          (item) => Date.now() / 1000 - item.timestamp < 31556926
        );
      default:
        return data;
    }
  };

  const filtersReset = () => {
    filterGenreSetter([]);
    filterDateSetter("Всё время");
    setFilterSearch("");
  };

  const onFilterSearch = (data: Film[], filter) => {
    if (data || filter) {
      return data.filter((item) => {
        const isInclude = (text: string) =>
          text ? text.toLowerCase().includes(filter.toLowerCase()) : false;
        return (
          isInclude(item.nameRu) ||
          isInclude(item.nameEn) ||
          isInclude(item.nameOriginal)
        );
      });
    }
  };

  const filtredFilms = onFilterGenre(
    onFilterDate(onFilterSearch(userFilmsList, filterSearch), filterDate),
    filterGenre
  );

  return (
    <>
      <Search setFilterSearch={setFilterSearch} filterSearch={filterSearch} />
      <ErrorBoundary>
        <AppSidemenu
          genres={genres}
          filterSetter={{ genre: filterGenreSetter, date: filterDateSetter }}
          filtersReset={filtersReset}
          filterGenre={filterGenre}
          filterDate={filterDate}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <FilmList
          loading={loading}
          films={filtredFilms}
          setOpen={setOpen}
          loadingPantry={loading}
          isLoading={false}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <NewFilmDialog setOpen={setOpen} open={open} />
      </ErrorBoundary>
    </>
  );
};

export default Main;

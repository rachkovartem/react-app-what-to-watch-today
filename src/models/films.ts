import { createEffect, createEvent, createStore, sample } from "effector";
import apolloClient from "../config/apollo-client";
import { ApiService } from "../services/ApiService";
import { $isAuthenticated, checkAuthFx, logoutFx } from "./auth";
import KinopoiskService from "../services/KinopoiskService";

export type Film = {
  kinopoiskId: number;
  imdbId: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl: string;
  logoUrl: string;
  reviewsCount: number;
  ratingGoodReview: number;
  ratingGoodReviewVoteCount: number;
  ratingKinopoisk: number;
  ratingKinopoiskVoteCount: number;
  ratingImdb: number;
  ratingImdbVoteCount: number;
  ratingFilmCritics: number;
  ratingFilmCriticsVoteCount: number;
  ratingAwait: number;
  ratingAwaitCount: number;
  ratingRfCritics: number;
  ratingRfCriticsVoteCount: number;
  webUrl: string;
  year: number;
  filmLength: number;
  slogan: string;
  description: string;
  shortDescription: string;
  editorAnnotation: string;
  isTicketsAvailable: boolean;
  productionStatus: string;
  type: string;
  ratingMpaa: string;
  ratingAgeLimits: string;
  hasImax: boolean;
  has3D: boolean;
  lastSync: string;
  countries: Array<{ country: string }>;
  genres: Array<{ genre: string }>;
  startYear: number;
  endYear: number;
  serial: boolean;
  shortFilm: boolean;
  completed: boolean;
};

export type FilmsTypes = "all" | "films" | "serials";

type FilterParams = {
  genres?: string[];
  search?: string;
  type?: FilmsTypes;
};

export const STOCK_FILMS = [435, 326, 3498, 448, 258687];

const filterFilms = (films: Film[]) => {
  let filtered = [...films];

  const api = {
    filterByGenre(genres: string[]) {
      if (!genres) return api;
      filtered = filtered.filter((film) =>
        genres.every((filterGenre) =>
          film.genres.some((genre) => genre.genre === filterGenre)
        )
      );

      return api;
    },
    filterBySearch(filter: string) {
      if (!filter) return api;

      filtered = filtered.filter((film) => {
        const isInclude = (text: string) =>
          !!text?.toLowerCase().includes(filter.toLowerCase());
        return (
          isInclude(film.nameRu) ||
          isInclude(film.nameEn) ||
          isInclude(film.nameOriginal)
        );
      });
      return api;
    },
    filterByType(type?: FilmsTypes) {
      if (!type || type === "all") return api;

      filtered = filtered.filter((film) =>
        type === "serials" ? film.serial : !film.serial
      );
      return api;
    },
    _getFiltered() {
      return filtered;
    },
    get result() {
      return this._getFiltered();
    },
  };

  return api;
};

export const getFilmsFromServerFx = createEffect(async () => {
  const result = await apolloClient.query({ query: ApiService.GET_FILMS });
  return result.data.getFilms;
});

export const getFilmsFromLSFx = createEffect(async () => {
  const films = JSON.parse(localStorage.getItem("movies"));

  if (!films) {
    const result = await Promise.all(
      STOCK_FILMS.map((id) => KinopoiskService.getFilmById(id))
    );

    localStorage.setItem("movies", JSON.stringify(result));
    return result;
  }

  return films || [];
});

export const addFilmToServerFx = createEffect(async (kinopoiskId: number) => {
  const result = await apolloClient.mutate({
    mutation: ApiService.ADD_FILM,
    variables: { kinopoiskId },
  });
  return result.data;
});

export const addFilmToLSFx = createEffect((film: Film) => {
  const films = JSON.parse(localStorage.getItem("movies"));
  localStorage.setItem("movies", JSON.stringify([...films, film]));
});

export const deleteFilmFromServerFx = createEffect(
  async (kinopoiskId: number) => {
    const result = await apolloClient.mutate({
      mutation: ApiService.DELETE_FILM,
      variables: { kinopoiskId },
    });

    return result.data;
  }
);

export const deleteFilmFromLS = createEffect((kinopoiskId: number) => {
  const filmsFromLS = JSON.parse(localStorage.getItem("movies"));
  const newFilms = filmsFromLS.filter(
    (film) => film.kinopoiskId !== kinopoiskId
  );
  localStorage.setItem("movies", JSON.stringify(newFilms));
});

export const addFilm = createEvent<Film>();
export const deleteFilm = createEvent<number>();
export const filterUserFilms = createEvent<FilterParams>();
export const resetFilmsFilter = createEvent();

export const $userFilmsList = createStore<Film[]>([]);
export const $userFilmsGenres = $userFilmsList.map((films) =>
  films.reduce((acc, film) => {
    const filmGenres = film.genres
      .map((genre) => genre.genre)
      .filter((genre) => !acc.includes(genre));

    return [...acc, ...filmGenres];
  }, [])
);
export const $filteredUserFilmList = createStore<Film[]>([]);
export const $filmsFilter = createStore<FilterParams>({
  search: "",
  genres: [],
  type: "all",
});
export const $initialFilmsLoading = createStore(true);

$userFilmsList
  .on(getFilmsFromServerFx.doneData, (_, data) => data)
  .on(getFilmsFromLSFx.doneData, (_, data) => data);
$filteredUserFilmList.on($userFilmsList, (_, data) => data);

$filmsFilter
  .on(filterUserFilms, (state, filter) => ({ ...state, ...filter }))
  .reset(resetFilmsFilter);

sample({
  clock: $filmsFilter,
  source: $userFilmsList,
  fn: (films, filter) => {
    console.log(filter);
    return filterFilms(films)
      .filterByGenre(filter.genres)
      .filterBySearch(filter.search)
      .filterByType(filter.type).result;
  },
  target: $filteredUserFilmList,
});

sample({
  clock: $isAuthenticated,
  filter: (isAuthenticated) => isAuthenticated,
  target: getFilmsFromServerFx,
});

sample({
  clock: [checkAuthFx.failData, logoutFx.doneData],
  target: getFilmsFromLSFx,
});

sample({
  clock: $isAuthenticated,
  filter: (isAuthenticated) => !isAuthenticated,
  fn: () => [],
  target: $userFilmsList,
});

sample({
  clock: deleteFilm,
  source: $isAuthenticated,
  filter: (isAuthenticated) => isAuthenticated,
  fn: (_, clock) => clock,
  target: deleteFilmFromServerFx,
});

sample({
  clock: deleteFilm,
  source: $isAuthenticated,
  filter: (isAuthenticated) => !isAuthenticated,
  fn: (_, clock) => clock,
  target: deleteFilmFromLS,
});

sample({
  clock: [addFilmToServerFx.doneData, deleteFilmFromServerFx.doneData],
  target: getFilmsFromServerFx,
});

sample({
  clock: [addFilmToLSFx.doneData, deleteFilmFromLS.doneData],
  target: getFilmsFromLSFx,
});

sample({
  clock: addFilm,
  source: $isAuthenticated,
  filter: (isAuthenticated) => isAuthenticated,
  fn: (_, film) => film.kinopoiskId,
  target: addFilmToServerFx,
});

sample({
  clock: addFilm,
  source: $isAuthenticated,
  filter: (isAuthenticated) => !isAuthenticated,
  fn: (_, film) => film,
  target: addFilmToLSFx,
});

sample({
  clock: [getFilmsFromServerFx.doneData, getFilmsFromServerFx.failData],
  fn: () => false,
  target: $initialFilmsLoading,
});

import { createEffect, createEvent, createStore, sample } from "effector";
import apolloClient from "../config/apollo-client";
import { ApiService } from "../services/ApiService";
import { $isAuthenticated } from "./auth";
import { isArray } from "@apollo/client/cache/inmemory/helpers";

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

export const STOCK_FILMS = [
  {
    title: "Зеленая миля (The Green Mile), 1999",
    subtitle:
      "Пол Эджкомб — начальник блока смертников в тюрьме «Холодная гора», каждый из узников которого однажды проходит «зеленую милю» по пути к месту казни. Пол повидал много заключённых и надзирателей за время работы. Однако гигант Джон Коффи, обвинённый в страшном преступлении, стал одним из самых необычных обитателей блока.",
    id: 435,
    genre: ["детектив", "драма", "криминал", "фантастика", "фэнтези"],
    timestamp: 1609362000,
    posterUrlPreview:
      "https://kinopoiskapiunofficial.tech/images/posters/kp_small/435.jpg",
    ratingImdb: 8.6,
    ratingKinopoisk: 9.1,
  },
  {
    title: "Побег из Шоушенка (The Shawshank Redemption), 1994",
    subtitle:
      "Бухгалтер Энди Дюфрейн обвинён в убийстве собственной жены и её любовника. Оказавшись в тюрьме под названием Шоушенк, он сталкивается с жестокостью и беззаконием, царящими по обе стороны решётки. Каждый, кто попадает в эти стены, становится их рабом до конца жизни. Но Энди, обладающий живым умом и доброй душой, находит подход как к заключённым, так и к охранникам, добиваясь их особого к себе расположения.",
    id: 326,
    genre: ["драма"],
    timestamp: 1611781200,
    posterUrlPreview:
      "https://kinopoiskapiunofficial.tech/images/posters/kp_small/326.jpg",
    ratingImdb: 9.3,
    ratingKinopoisk: 9.1,
  },
  {
    title:
      "Властелин колец: Возвращение короля (The Lord of the Rings: The Return of the King), 2003",
    subtitle:
      "Повелитель сил тьмы Саурон направляет свою бесчисленную армию под стены Минас-Тирита, крепости Последней Надежды. Он предвкушает близкую победу, но именно это мешает ему заметить две крохотные фигурки — хоббитов, приближающихся к Роковой Горе, где им предстоит уничтожить Кольцо Всевластья.",
    id: 3498,
    genre: ["драма", "приключения", "фэнтези"],
    timestamp: 1618347600,
    posterUrlPreview:
      "https://kinopoiskapiunofficial.tech/images/posters/kp_small/3498.jpg",
    ratingImdb: 8.9,
    ratingKinopoisk: 8.6,
  },
  {
    title: "Форрест Гамп (Forrest Gump), 1994",
    subtitle:
      "Сидя на автобусной остановке, Форрест Гамп — не очень умный, но добрый и открытый парень — рассказывает случайным встречным историю своей необыкновенной жизни.\n\nС самого малолетства он страдал от заболевания ног, и соседские хулиганы дразнили мальчика, и в один прекрасный день Форрест открыл в себе невероятные способности к бегу. Подруга детства Дженни всегда его поддерживала и защищала, но вскоре дороги их разошлись",
    id: 448,
    genre: ["военный", "драма", "история", "комедия", "мелодрама"],
    timestamp: 1636405200,
    posterUrlPreview:
      "https://kinopoiskapiunofficial.tech/images/posters/kp_small/448.jpg",
    ratingImdb: 8.8,
    ratingKinopoisk: 8.9,
  },
  {
    title: "Интерстеллар (Interstellar), 2014",
    subtitle:
      "Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину (которая предположительно соединяет области пространства-времени через большое расстояние) в путешествие, чтобы превзойти прежние ограничения для космических путешествий человека и найти планету с подходящими для человечества условиями.",
    id: 258687,
    genre: ["драма", "приключения", "фантастика"],
    timestamp: 1640811600,
    posterUrlPreview:
      "https://kinopoiskapiunofficial.tech/images/posters/kp_small/258687.jpg",
    ratingImdb: 8.6,
    ratingKinopoisk: 8.6,
  },
];

export const $userFilmsList = createStore<Film[]>([]);
export const $isAddModalOpened = createStore(false);

export const getFilmsFromServerFx = createEffect(async () => {
  const result = await apolloClient.query({ query: ApiService.GET_FILMS });
  return result.data.getFilms;
});

export const getFilmsFromLSFx = createEffect(() => {
  const films = JSON.parse(localStorage.getItem("movies"));
  if (!isArray(films)) {
    localStorage.setItem("movies", JSON.stringify(STOCK_FILMS));
    return STOCK_FILMS;
  }

  return films;
});

export const addFilmToServerFx = createEffect((kinopoiskId: number) => {
  console.log(kinopoiskId);
  apolloClient.query({
    query: ApiService.ADD_FILM,
    variables: { kinopoiskId },
  });
});

export const addFilmToLSFx = createEffect((film: Film) => {
  const films = JSON.parse(localStorage.getItem("movies"));
  films.concat(film);
  localStorage.setItem("movies", JSON.stringify(films));
});

export const addFilm = createEvent<Film>();
export const toggleAddModal = createEvent<boolean>();

$userFilmsList
  .on(getFilmsFromServerFx.doneData, (_, data) => data)
  .on(getFilmsFromLSFx, (_, data) => data);

$isAddModalOpened.on(toggleAddModal, (_, data) => data);

sample({
  clock: $isAuthenticated,
  filter: (isAuthenticated) => isAuthenticated,
  target: getFilmsFromServerFx,
});

sample({
  clock: addFilmToServerFx.doneData,
  target: getFilmsFromServerFx,
});

sample({
  clock: $isAuthenticated,
  filter: (isAuthenticated) => !isAuthenticated,
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

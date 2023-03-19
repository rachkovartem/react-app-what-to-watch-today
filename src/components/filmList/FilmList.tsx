import "./FilmList.scss";

import { Box } from "@mui/material";

import FilmItem from "../filmItem/FilmItem";
import { useStore } from "effector-react";
import {
  $filteredUserFilmList,
  $initialFilmsLoading,
  getFilmsFromServerFx,
} from "../../models/films";
import { toggleAddModal } from "../../models/app";
import { SkeletonFilms } from "./SkeletonFilms";

const FilmList = () => {
  const filteredFilms = useStore($filteredUserFilmList);
  const loading = useStore(getFilmsFromServerFx.pending);
  const initialLoading = useStore($initialFilmsLoading);

  return (
    <section className="film-list">
      <div className="container">
        <Box className="film-list__grid">
          {filteredFilms.length > 0 && !initialLoading
            ? filteredFilms.map((film) => {
                return <FilmItem key={film.webUrl} film={film} />;
              })
            : null}
        </Box>
        {filteredFilms.length === 0 && !loading && !initialLoading ? (
          <div className="film-list__grid">
            <span className="film-list__notfound">Ничего не найдено</span>
          </div>
        ) : null}
        {loading && initialLoading && <SkeletonFilms />}
        <button
          className="film-list__add-button"
          onClick={() => toggleAddModal(true)}
        >
          <svg
            rotate="45"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.75781 7.75732L16.2431 16.2426"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.75781 16.2426L16.2431 7.75732"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default FilmList;

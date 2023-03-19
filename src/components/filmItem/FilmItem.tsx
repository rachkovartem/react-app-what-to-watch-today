import "./Ratings.scss";
import "./FilmItem.scss";

import Skeleton from "@mui/material/Skeleton";

import { Link } from "react-router-dom";
import { memo, useRef } from "react";

import { deleteFilm, Film, getFilmsFromServerFx } from "../../models/films";
import { useStore } from "effector-react";
import { Properties } from "csstype";
import kinopoiskImg from "../../resources/img/kinopoisk.svg";
import imdbImg from "../../resources/img/IMDB.svg";
import Typography from "@mui/material/Typography";

function propsChecker(prevProps, nexProps) {
  return prevProps.film === nexProps.film && prevProps.style === nexProps.style;
}

export const FilmItem = memo(
  ({
    style,
    film,
  }: {
    style?: Properties<string | number, string & {}>;
    film: Film;
  }) => {
    const loading = useStore(getFilmsFromServerFx.pending);
    const descriptionRef = useRef<HTMLDivElement | null>(null);
    const posterRef = useRef<HTMLImageElement | null>(null);
    const onDescrAction = (e) => {
      if (e._reactName === "onMouseLeave") {
        e.target.parentNode.children[4].style.zIndex = -1;
      } else if (e._reactName === "onMouseEnter") {
        e.target.parentNode.children[4].style.height = window.getComputedStyle(
          e.target.parentNode.children[1]
        ).height;
        e.target.parentNode.children[4].style.width = window.getComputedStyle(
          e.target.parentNode.children[1]
        ).width;
        e.target.parentNode.children[4].style.zIndex = 500;
      }
    };

    return (
      <li style={style} className="film">
        <div className="ratings">
          <img
            className="rating-icon"
            src={kinopoiskImg as unknown as string}
            alt="Кинопоиск"
          />
          <span className="rating">{film.ratingKinopoisk}</span>
          <img
            className="rating-icon"
            src={imdbImg as unknown as string}
            alt="IMDB"
          />
          <span className="rating">{film.ratingImdb}</span>
        </div>
        <Link
          key={`/film/${film.kinopoiskId}`}
          to={`/film/${film.kinopoiskId}`}
        >
          <div className="film__poster-link">
            {loading ? (
              <Skeleton
                sx={{ backgroundColor: "rgb(255 255 255 / 20%)" }}
                variant="rectangular"
              >
                <img
                  className="film__poster"
                  src={film.posterUrlPreview}
                  alt="Обложка"
                />
              </Skeleton>
            ) : (
              <img
                ref={posterRef}
                className="film__poster"
                src={film.posterUrlPreview}
                alt="Обложка"
              />
            )}
          </div>
        </Link>
        <Link className="film__title-link" to={`/film/${film.kinopoiskId}`}>
          <h2 className="film__title">
            {film.nameRu || film.nameEn || film.nameOriginal}
          </h2>
        </Link>
        <div
          onClick={onDescrAction}
          onMouseLeave={onDescrAction}
          onMouseEnter={onDescrAction}
          className="film__descr"
        >
          Описание
        </div>
        <div ref={descriptionRef} className="film__descr-text">
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 10,
              lineClamp: `${10}`,
              WebkitBoxOrient: "vertical",
            }}
          >
            {film.description}
          </Typography>
        </div>
        <div
          onClick={() => deleteFilm(film.kinopoiskId)}
          className="film__delete-icon"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="trash-alt"
            className="svg-inline--fa fa-trash-alt fa-w-14"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"
            ></path>
          </svg>
        </div>
      </li>
    );
  },
  propsChecker
);

export default FilmItem;

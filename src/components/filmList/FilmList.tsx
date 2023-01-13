import "./FilmList.scss";
import nextId from "react-id-generator";

import { Transition, TransitionGroup } from "react-transition-group";
import { cloneElement, useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

import poster from "../../resources/img/poster.jpg";
import FilmItem from "../filmItem/FilmItem";
import { useStore } from "effector-react";
import {
  $filteredUserFilmList,
  getFilmsFromServerFx,
} from "../../models/films";
import { toggleAddModal } from "../../models/app";

const FilmList = () => {
  const filteredFilms = useStore($filteredUserFilmList);
  const loading = useStore(getFilmsFromServerFx.pending);
  const [initialLoading, setInitialLoading] = useState(true);

  const duration = 300;
  const removeStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 1,
  };

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  useEffect(() => {
    setInitialLoading(false);
  }, []);

  return (
    <section className="film-list">
      <div className="container">
        {filteredFilms.length > 0 && (!initialLoading || !loading) ? (
          <TransitionGroup
            className="film-list__grid"
            childFactory={(child) =>
              cloneElement(child, {
                style: { removeStyle },
              })
            }
          >
            {filteredFilms.map((film) => {
              return (
                <Transition
                  component="li"
                  appear={false}
                  in
                  timeout={duration}
                  key={nextId()}
                >
                  {(state) => (
                    <FilmItem
                      style={{
                        ...defaultStyle,
                        ...transitionStyles[state],
                      }}
                      key={nextId()}
                      film={film}
                    />
                  )}
                </Transition>
              );
            })}
          </TransitionGroup>
        ) : null}
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

const SkeletonFilms = () => (
  <div className="film-list__grid">
    <li className="film" style={{ minWidth: "100%" }}>
      <div className="film__poster-link">
        <Skeleton
          sx={{
            backgroundColor: "rgb(255 255 255 / 20%)",
            borderRadius: "12px",
            minWidth: "400px",
          }}
          variant="rectangular"
        >
          <img className="film__poster" src={poster} alt="Обложка" />
        </Skeleton>
      </div>
      <Skeleton
        sx={{
          backgroundColor: "rgb(255 255 255 / 20%)",
          borderRadius: "12px",
          minWidth: "40%",
          mt: "10px",
        }}
      >
        <div className="film__title-link">
          <h2 className="film__title">title</h2>
        </div>
      </Skeleton>
      <Skeleton
        sx={{
          backgroundColor: "rgb(255 255 255 / 20%)",
          borderRadius: "12px",
          minWidth: "80%",
          mt: "10px",
        }}
      >
        <div className="film__descr">Desription</div>
      </Skeleton>
    </li>
    <li className="film" style={{ minWidth: "100%" }}>
      <div className="film__poster-link">
        <Skeleton
          sx={{
            backgroundColor: "rgb(255 255 255 / 20%)",
            borderRadius: "12px",
            minWidth: "400px",
          }}
          variant="rectangular"
        >
          <img className="film__poster" src={poster} alt="Обложка" />
        </Skeleton>
      </div>
      <Skeleton
        sx={{
          backgroundColor: "rgb(255 255 255 / 20%)",
          borderRadius: "12px",
          minWidth: "40%",
          mt: "10px",
        }}
      >
        <div className="film__title-link">
          <h2 className="film__title">title</h2>
        </div>
      </Skeleton>
      <Skeleton
        sx={{
          backgroundColor: "rgb(255 255 255 / 20%)",
          borderRadius: "12px",
          minWidth: "80%",
          mt: "10px",
        }}
      >
        <div className="film__descr">Desription</div>
      </Skeleton>
    </li>
    <li className="film" style={{ minWidth: "100%" }}>
      <div className="film__poster-link">
        <Skeleton
          sx={{
            backgroundColor: "rgb(255 255 255 / 20%)",
            borderRadius: "12px",
            minWidth: "400px",
          }}
          variant="rectangular"
        >
          <img className="film__poster" src={poster} alt="Обложка" />
        </Skeleton>
      </div>
      <Skeleton
        sx={{
          backgroundColor: "rgb(255 255 255 / 20%)",
          borderRadius: "12px",
          minWidth: "40%",
          mt: "10px",
        }}
      >
        <div className="film__title-link">
          <h2 className="film__title">title</h2>
        </div>
      </Skeleton>
      <Skeleton
        sx={{
          backgroundColor: "rgb(255 255 255 / 20%)",
          borderRadius: "12px",
          minWidth: "80%",
          mt: "10px",
        }}
      >
        <div className="film__descr">Desription</div>
      </Skeleton>
    </li>
    <li className="film" style={{ minWidth: "100%" }}>
      <div className="film__poster-link">
        <Skeleton
          sx={{
            backgroundColor: "rgb(255 255 255 / 20%)",
            borderRadius: "12px",
            minWidth: "400px",
          }}
          variant="rectangular"
        >
          <img className="film__poster" src={poster} alt="Обложка" />
        </Skeleton>
      </div>
      <Skeleton
        sx={{
          backgroundColor: "rgb(255 255 255 / 20%)",
          borderRadius: "12px",
          minWidth: "40%",
          mt: "10px",
        }}
      >
        <div className="film__title-link">
          <h2 className="film__title">title</h2>
        </div>
      </Skeleton>
      <Skeleton
        sx={{
          backgroundColor: "rgb(255 255 255 / 20%)",
          borderRadius: "12px",
          minWidth: "80%",
          mt: "10px",
        }}
      >
        <div className="film__descr">Desription</div>
      </Skeleton>
    </li>
  </div>
);

export default FilmList;

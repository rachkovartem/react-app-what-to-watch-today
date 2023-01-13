import "./Search.scss";
import "./InputForm.scss";
import { useStore } from "effector-react";

import { CSSTransition } from "react-transition-group";
import { $filmsFilter, filterUserFilms } from "../../models/films";

import search from "../../resources/icons/search.svg";

const Search = () => {
  const filmsFilter = useStore($filmsFilter);
  const onChange = (event) => {
    filterUserFilms({ search: event.target.value });
  };

  return (
    <section className="search">
      <CSSTransition
        in={true}
        appear={true}
        timeout={200}
        classNames="transition"
      >
        <div className="container container__search">
          <h1 className="search__title">Запиши, что хотел посмотреть</h1>
          <p className="search__subtitle">
            И потом не нужно будет искать в безликих заметках, какие фильмы ты
            видел в Тик&#8209;токе, пока бездельничал на работе.
          </p>
          <div className="input-form">
            <img
              className="input-form__icon"
              src={search as unknown as string}
              alt="Поиск"
            />
            <input
              value={filmsFilter.search}
              onChange={onChange}
              autoComplete="off"
              placeholder="название фильма или описание"
              id="search"
              type="text"
              className="input-form__input"
            />
            <label className="input-form__label" htmlFor="search">
              Поиск по записанным фильмам
            </label>
          </div>
        </div>
      </CSSTransition>
    </section>
  );
};

export default Search;

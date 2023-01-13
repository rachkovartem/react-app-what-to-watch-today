import "./Description.scss";
import "./Ratings.scss";

import kinopoiskImg from "../../resources/img/kinopoisk.svg";
import imdbImg from "../../resources/img/IMDB.svg";

const Description = (props) => {
  const {
    poster,
    shortDescription,
    description,
    ratingKinopoisk,
    ratingImdb,
    type,
    year,
    genres,
    filmLength,
  } = props;

  return (
    <section className="description">
      <div className="container">
        <div className="description__grid">
          <div className="description__poster-wrapper">
            <img className="description__poster" src={poster} alt="poster" />
          </div>

          <div className="description__about">
            <h2 className="description__slogan">{shortDescription}</h2>

            <p className="description__main-text">{description}</p>

            <div className="ratings ratings_position_initial">
              <img
                className="rating-icon rating-icon_big"
                src={kinopoiskImg as unknown as string}
                alt="Кинопоиск"
              />
              <span className="rating rating_big">{ratingKinopoisk}</span>
              <img
                className="rating-icon rating-icon_big rating-icon_margin_left"
                src={imdbImg as unknown as string}
                alt="IMDB"
              />
              <span className="rating rating_big">{ratingImdb}</span>
            </div>

            <div className="description__detalis">
              <p className="description__details__title">Тип</p>
              <p className="description__details__value">{type}</p>
            </div>

            <div className="description__detalis">
              <p className="description__details__title">Год релиза</p>
              <p className="description__details__value">{year}</p>
            </div>

            <div className="description__detalis">
              <p className="description__details__title">Длительность</p>
              <p className="description__details__value">{filmLength}</p>
            </div>

            <div className="description__detalis">
              <p className="description__details__title">Жанры</p>
              <p className="description__details__value">{genres}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;

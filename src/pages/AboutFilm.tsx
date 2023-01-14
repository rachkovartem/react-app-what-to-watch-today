import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import KinopoiskService from "../services/KinopoiskService";
import Cover from "../components/cover/Cover";
import Description from "../components/description/Description";
import { Film } from "../models/films";

const AboutFilm = () => {
  const { getFilmById, getImagesById } = KinopoiskService;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<{ items: { imageUrl: string }[] }>();
  const [imagesUpdated, setImagesUpdated] = useState(false);
  const [stringGenres, setStringGenres] = useState("");
  const [film, setFilm] = useState<Film>({} as Film);

  useEffect(() => {
    updateFilm(id);
  }, []);

  const updateFilm = (id) => {
    getFilmById(id)
      .then(filmUpdate)
      .catch(() => setLoading(false));
  };

  const filmUpdate = (data) => {
    setFilm(data);
    const { genres } = data;
    setStringGenres(genres.map((item) => item.genre).join(", "));
  };

  const isType = (type) => {
    switch (type) {
      case "FILM":
        return "Фильм";

      case "VIDEO":
        return "Видео";

      case "TV_SERIES":
        return "Сериал";

      case "MINI_SERIES":
        return "Мини-сериал";

      case "TV_SHOW":
        return "ТВ-шоу";

      default:
        return null;
    }
  };

  const getImageForBigPoster = async () => {
    const values = ["WALLPAPER", "SCREENSHOT", "COVER", "SHOOTING", "STILL"];
    let value = 0;
    let res = await getImagesByType(values[value]);
    while (res.items.length === 0 && values[value]) {
      res = await getImagesByType(values[value]);
      value++;
    }

    onImagesLoaded(res);
  };

  const onImagesLoaded = (images) => {
    setImages(images);
    setImagesUpdated(true);
  };

  const getImagesByType = async (type = "STILL") => {
    setImagesUpdated(false);
    const initRes = await getImagesById(id, type);
    let images = initRes.items;
    for (let i = 2; i < initRes.totalPages; i++) {
      const res = await getImagesById(id, type, i);
      images.concat(res.items);
    }

    return { total: initRes.total, items: images };
  };

  useEffect(() => {
    getImageForBigPoster();
  }, []);

  return (
    <>
      <Cover
        imagesUpdated={imagesUpdated}
        loading={loading}
        title={film.nameRu || film.nameEn || film.nameOriginal}
        image={
          imagesUpdated && images.items[0] ? images.items[0].imageUrl : null
        }
      />
      <Description
        poster={film.posterUrl}
        shortDescription={film.shortDescription}
        description={film.description}
        ratingKinopoisk={film.ratingKinopoisk}
        ratingImdb={film.ratingImdb}
        type={isType(film.type)}
        year={film.year}
        genres={stringGenres}
        filmLength={film.filmLength}
      />
    </>
  );
};

export default AboutFilm;

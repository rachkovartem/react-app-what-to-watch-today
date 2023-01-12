import { gql } from "@apollo/client";

export const ApiService = {
  ADD_FILM: gql`
    mutation AddFilm($kinopoiskId: Float!) {
      addFilm(kinopoiskId: $kinopoiskId)
    }
  `,
  DELETE_FILM: gql`
    mutation DeleteFilm($kinopoiskId: Float!) {
      deleteFilm(kinopoiskId: $kinopoiskId)
    }
  `,
  GET_FILMS: gql`
    {
      getFilms {
        kinopoiskId
        imdbId
        nameRu
        nameEn
        nameOriginal
        posterUrl
        posterUrlPreview
        coverUrl
        logoUrl
        reviewsCount
        ratingGoodReview
        ratingGoodReviewVoteCount
        ratingKinopoisk
        ratingKinopoiskVoteCount
        ratingImdb
        ratingImdbVoteCount
        ratingFilmCritics
        ratingFilmCriticsVoteCount
        ratingAwait
        ratingAwaitCount
        ratingRfCritics
        ratingRfCriticsVoteCount
        webUrl
        year
        filmLength
        slogan
        description
        shortDescription
        editorAnnotation
        isTicketsAvailable
        productionStatus
        type
        ratingMpaa
        ratingAgeLimits
        hasImax
        has3D
        lastSync
        countries {
          country
        }
        genres {
          genre
        }
        startYear
        endYear
        serial
        shortFilm
        completed
      }
    }
  `,
};

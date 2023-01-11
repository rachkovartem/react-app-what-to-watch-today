import { gql } from "@apollo/client";

export const ApiService = {
  ADD_FILM: gql`
    mutation AddFilm($kinopoiskId: Float!) {
      addFilm(kinopoiskId: $kinopoiskId)
    }
  `,
  GET_FILMS: gql`
    {
      getFilms {
        nameEn
      }
    }
  `,
};

import env from "../config/env";
import axios from "axios";
import { Film } from "../models/films";

const kinopoiskAxiosInstance = axios.create({
  baseURL: "https://kinopoiskapiunofficial.tech/api/",
  headers: {
    "X-API-KEY": env.X_API_KEY,
  },
});

const KinopoiskService = {
  getFilmByKeyWord: async (word, page = 1) => {
    const response = await kinopoiskAxiosInstance.get(
      `/v2.1/films/search-by-keyword?keyword=${word}&page=${page}`
    );
    return response.data;
  },

  getFilmById: async (id) => {
    const response = await kinopoiskAxiosInstance.get<Film>(`v2.2/films/${id}`);
    return response.data;
  },

  getImagesById: async (id, type, timeout?, page = 1) => {
    const response = await kinopoiskAxiosInstance.get(
      `v2.2/films/${id}/images?type=${type}&page=${page}`,
      { timeout }
    );
    return response.data;
  },
};

export default KinopoiskService;

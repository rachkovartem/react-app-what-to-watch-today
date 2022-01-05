import { useHttp } from '../hooks/hook.http';

const KinopoiskServices = () => {

    const {loading, error, request, clearError} = useHttp();

    const _apiURL = 'https://kinopoiskapiunofficial.tech/api/'
    const _apiOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-KEY': '9261fd63-b1c8-4121-bea1-7d81ae93b210'
        },
    }


    const getFilmByKeyWord = async (word, page = 1) => {
        let response = await request(`${_apiURL}v2.1/films/search-by-keyword?keyword=${word}&page=${page}`, _apiOptions.method, _apiOptions.headers)
        return response
    }

    const getFilmById = async (id) => {
        let response = await request(`${_apiURL}v2.2/films/${id}`, _apiOptions.method, _apiOptions.headers)
        return response
    }

    const getVideosById = async(id) => {
        let response = await request(`${_apiURL}v2.2/films/${id}/videos`, _apiOptions.method, _apiOptions.headers)
        return response
    }

    return {loading, error, request, clearError, getFilmByKeyWord, getFilmById, getVideosById}
}

export default KinopoiskServices;
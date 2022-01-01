

class KinopoiskServices {
    _apiURL = 'https://kinopoiskapiunofficial.tech/api/'

    getFilmByKeyWord = async (word, page = 1) => {
        let response = await fetch(`${this._apiURL}v2.1/films/search-by-keyword?keyword=${word}&page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-API-KEY': '9261fd63-b1c8-4121-bea1-7d81ae93b210'
            },
        })

        const filmByKeyword = response.json().then(data => (data))
        return filmByKeyword
    }

}

export default KinopoiskServices;
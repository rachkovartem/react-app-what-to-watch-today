import debounce from 'lodash.debounce';

class KinopoiskServices {
    _apiURL = 'https://kinopoiskapiunofficial.tech/api/'
    _apiOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-KEY': '9261fd63-b1c8-4121-bea1-7d81ae93b210'
        },
    }

    getFilmByKeyWord = async (word, page = 1) => {
        let response = await fetch(`${this._apiURL}v2.1/films/search-by-keyword?keyword=${word}&page=${page}`, this._apiOptions)

        const filmByKeyword = response.json().then(data => (data))
        return filmByKeyword
    }

    dbGetFilmById = debounce((e) => this.getFilmById(e), 250)
    
    getFilmById = async (id) => {

        let response
        try {
            response = await fetch(`${this._apiURL}v2.2/films/${id}`, this._apiOptions)
        } catch (err) {
            console.log(err)
        }
        

        const filmByKeyword = response.json().then(data => (data))
        return filmByKeyword
    }


}

export default KinopoiskServices;
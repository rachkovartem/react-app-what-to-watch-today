import { useState, useEffect } from 'react';
import { useParams, } from 'react-router-dom';

import KinopoiskServices from '../../services/KinopoiskServices';
import Cover from '../cover/Cover';
import Description from '../description/Description'


const AboutFilm = () => {

    const {loading, error, clearError, getFilmById, getImagesById} = KinopoiskServices();
    const { id } = useParams();
    const [ images, setImages ] = useState({});
    const [imagesUpdated, setImagesUpdated] = useState(false);
    const [stringCountries, setStringCountries] = useState('');
    const [stringGenres, setStringGenres] = useState('');
    const [film, setFilm] = useState({});
    const {nameRu, nameEn, nameOriginal, type} = film;
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false)
    }, [])

    useEffect(() => {
        updateFilm(id)
    }, [])

    const updateFilm = (id) => {
        getFilmById(id)
        .then(filmUpdated) 
    }

    const filmUpdated = (data) => {

        setFilm(data);
        const {year, filmLength, serial, endYear, startYear, description, countries, genres} = data
        setStringCountries(countries.map(item => item.country).join(', '))
        setStringGenres(genres.map(item => item.genre).join(', '))
    }

    const isType = (type) => {
        switch (type) {
            case 'FILM':
            return 'Фильм'

            case 'VIDEO':
            return 'Видео'

            case 'TV_SERIES':
            return 'Сериал'

            case 'MINI_SERIES':
            return 'Мини-сериал'

            case 'TV_SHOW':
            return 'ТВ-шоу'

            default:
            return null
        }
    } 

    const typeValues = ['STILL', 'SHOOTING', 'POSTER', 'FAN_ART', 'PROMO', 'CONCEPT', 'WALLPAPER', 'COVER', 'SCREENSHOT'];
    
    useEffect(() => {
        getImageForBigPoster()       
    }, [])

    const getImageForBigPoster = async () => {
        
        const values = ['WALLPAPER', 'SCREENSHOT', 'COVER', 'SHOOTING', 'STILL']
        let value = 0;
        let res = await getImagesByType(values[value]);
        while (res.items.length === 0 && values[value]) {
            console.log(values[value])
            res = await getImagesByType(values[value])
            value++
        }

        onImagesLoaded(res)
    }

    const onImagesLoaded = (images) => {
        setImages(images)
        setImagesUpdated(true);
    }

    const getImagesByType = async (type = 'STILL') => {
        setImagesUpdated(false);
        const initRes = await getImagesById(id, type);
        let images = initRes.items
        for (let i = 2; i < initRes.totalPages; i++) {
            const res = await getImagesById(id, type, i);
            images.concat(res.items);
        }

        return ({total: initRes.total, items: images})
        
    }

    const ratingStyle = (rating) => {
        if (rating >= 7) {
            return {color: '#3bb33b'}
        }
        if (rating >= 5 && rating < 7) {
            return {color: '#777'}
        }
        if (rating < 5) {
            return {color: '#ff1717'}
        } else {return {color: '#000'}}
    }

    

    return (
       <>
            <Cover imagesUpdated={imagesUpdated} loading={loading} title={nameRu} image={imagesUpdated && images.items[0] ? images.items[0].imageUrl : null}/>
            <Description poster={film.posterUrl} 
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
        
    )
}


export default AboutFilm;
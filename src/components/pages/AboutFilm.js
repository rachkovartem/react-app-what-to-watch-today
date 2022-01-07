import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import KinopoiskServices from '../../services/KinopoiskServices';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import nextId from 'react-id-generator';
import kinopoisk from '../../resources/img/kinopoisk.svg'
import imdb from '../../resources/img/IMDB.svg';

import AccordionAboutFilm from '../accordionAboutFilm/AccordionAboutFilm';
import Spinner from '../spinner/Spinner';
import ImagesGallery from '../imagesGallery/ImagesGallery'
import Cover from '../cover/Cover';
import Description from '../description/Description'
import Footer from '../footer/Footer';
// import './AboutFilm.scss'

const AboutFilm = () => {

    const {loading, error, clearError, getFilmById, getImagesById} = KinopoiskServices();
    const {id} = useParams();
    const [film, setFilm] = useState({});
    const [filmLoaded, setFilmLoaded] = useState(false)

    const [ images, setImages ] = useState({});
    const [countsOfImages, setCountsOfImages] = useState([]);
    const [imagesUpdated, setImagesUpdated] = useState(false)
    const [countsOfImagesUpdated, setCountsOfImagesUpdated] = useState(false)
    const [stringCountries, setStringCountries] = useState('');
    const [stringGenres, setStringGenres] = useState('');

    const updateFilm = (id) => {
        
        getFilmById(id)
        .then(filmUpdated)
       
    }

    const filmUpdated = (data) => {
        setFilm(data);
        setFilmLoaded(true);
        const {year, filmLength, serial, endYear, startYear, description, countries, genres} = data
        setStringCountries(countries.map(item => item.country).join(', '))
        setStringGenres(genres.map(item => item.genre).join(', '))
        

    }

    useEffect(() => {
        updateFilm(id)
    }, []) 

    const {nameRu, nameEn, nameOriginal, type} = film;

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
        updateImages('WALLPAPER')
        

    }, [])


    const updateImages = async (type = 'STILL') => {
        setImagesUpdated(false);
        const initRes = await getImagesById(id, type);
        let images = initRes.items
    
        for (let i = 2; i < initRes.totalPages; i++) {
            const res = await getImagesById(id, type, i);
            images.concat(res.items);
        }

        setImages({total: initRes.total, items: images})
        setImagesUpdated(true);
        
    }

    

    

    const spinner = loading && !error && !filmLoaded ? <Spinner/> : null;
 
    const rightGridContent = !loading && !error && filmLoaded ? rightBlock(film) : null;
    const poster = !loading && !error && filmLoaded ? <img className="about-film__poster" src={film.posterUrl} alt={film.nameRu}/> : null;
    const accordion = !loading && !error && filmLoaded ? <AccordionAboutFilm id={id}/> : null;
    const gallery = !loading && !error && filmLoaded ? <ImagesGallery id={id}/> : null;

    return (
       <>
       <Cover title={nameRu} image={images.items ? images.items[0].imageUrl : null}/>

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
       <Footer/>
       </>
        
    )
}


const rightBlock = (film) => {

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
        <div className='about-film__ratings-wrapper'>
            <div className='about-film__rating-wrapper'>
                <img className='about-film__logo about-film__logo_kinopoisk' src={kinopoisk} alt="Кинопоиск" />
                <p className='about-film__rating' style={ratingStyle(film.ratingKinopoisk)}>{film.ratingKinopoisk}</p>
            </div>
            <div className='about-film__rating-wrapper'>
                <img className='about-film__logo about-film__logo_IMDB' src={imdb} alt="IMDB" />
                <p className='about-film__rating' style={ratingStyle(film.ratingImdb)}>{film.ratingImdb}</p>
            </div>
        </div>
    )
    
}


export default AboutFilm;
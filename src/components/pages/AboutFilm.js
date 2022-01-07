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

    const {loading, error, clearError, getFilmById} = KinopoiskServices();
    const {id} = useParams();
    const [film, setFilm] = useState({});
    const [filmLoaded, setFilmLoaded] = useState(false)

    const updateFilm = (id) => {
        getFilmById(id)
        .then(filmUpdated)
    }

    const filmUpdated = (data) => {
        setFilm(data);
        setFilmLoaded(true);
    }

    useEffect(() => {
        updateFilm(id)
    }, []) 



    const spinner = loading && !error && !filmLoaded ? <Spinner/> : null;
    const descriptionBlock = !loading && !error && filmLoaded ? descriptionBlockView(film) : null;
    const rightGridContent = !loading && !error && filmLoaded ? rightBlock(film) : null;
    const poster = !loading && !error && filmLoaded ? <img className="about-film__poster" src={film.posterUrl} alt={film.nameRu}/> : null;
    const accordion = !loading && !error && filmLoaded ? <AccordionAboutFilm id={id}/> : null;
    const gallery = !loading && !error && filmLoaded ? <ImagesGallery id={id}/> : null;

    return (
       <>
       <Cover/>

       <Description/>
       <Footer/>
       </>
        
    )
}


const descriptionBlockView = (film) => {
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

    const tableRows = () => {
        const {year, filmLength, serial, endYear, startYear, description, countries, genres} = film
        const stringCountries = countries.map(item => item.country).join(', ');
        const stringGenres = genres.map(item => item.genre).join(', ');
        return <>
        <TableRow
                key={nextId()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">Год произовдства</TableCell>
                    <TableCell align="right">{year}</TableCell>
            </TableRow>
    
            <TableRow
                key={nextId()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">Страна</TableCell>
                    <TableCell align="right">{stringCountries}</TableCell>
            </TableRow>
    
            <TableRow
                key={nextId()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">Длительность</TableCell>
                    <TableCell align="right">{filmLength} мин.</TableCell>
            </TableRow>
    
            <TableRow
                key={nextId()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">Жанры</TableCell>
                    <TableCell align="right">{stringGenres}</TableCell>
            </TableRow>
    
            {serial ? <TableRow
                key={nextId()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">Первый сезон</TableCell>
                    <TableCell align="right">{startYear} г.</TableCell>
                </TableRow>
                : null
            }
    
            {serial ? <TableRow
                key={nextId()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">Последний сезон</TableCell>
                    <TableCell align="right">{endYear ? endYear : 'Ещё снимается'} г.</TableCell>
                </TableRow>
                : null
            }
    
            <TableRow
                key={nextId()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                
                    <TableCell component="th" scope="row">Описание</TableCell>
                    <TableCell align="justify">{description}</TableCell>
                    
                    
            </TableRow>
        </>
    }

    return (
        <>
            <h1 className="about-film__title">{nameRu}</h1>
            <div className="about-film__second-title-wrapper">
                <p className="about-film__second-title">{nameOriginal || nameEn}</p>
                <p className="about-film__type">{isType(type)}</p>
            </div>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                    <TableBody>
                        
                        {tableRows(film)}

                    </TableBody>
                </Table>
            </TableContainer>


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
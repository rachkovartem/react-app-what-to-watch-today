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

import Spinner from '../spinner/Spinner';
import './AboutFilm.scss'

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
    const mainContent = !loading && !error && filmLoaded ? mainBlock(film) : null;

    const poster = !loading && !error && filmLoaded ? <img className="about-film__poster" src={film.posterUrl} alt={film.nameRu}/> : null;

    return (
        <>
            <Grid 
            item 
            xs={3}
            sx={{display: 'flex',}}
            >
                {poster}
            </Grid>

            <Grid 
            item 
            xs={6}
            >
                {spinner}
                {mainContent}
            </Grid>
            <Grid 
            item 
            xs={3}
            >
                
            </Grid>
        </>
        
    )
}


const mainBlock = (film) => {
    const {nameRu, nameEn, nameOriginal, year, countries} = film;
    const stringCountries = countries.map(item => item.country).join(', ')
    return (
        <>
            <h1>{nameRu}</h1>
            <p>{nameOriginal || nameEn}</p>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        
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

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}



export default AboutFilm;
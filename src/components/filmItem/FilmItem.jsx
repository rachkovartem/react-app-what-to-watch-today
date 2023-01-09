import './Ratings.scss'
import './FilmItem.scss'

import Skeleton from '@mui/material/Skeleton';

import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';
import { memo } from 'react';

import kinopoiskImg from '../../resources/img/kinopoisk.svg';
import imdbImg from '../../resources/img/IMDB.svg';


function propsChecker(prevProps, nexProps) {
  return prevProps.title === nexProps.title &&
  prevProps.subtitle === nexProps.subtitle &&
  prevProps.posterUrlPreview === nexProps.posterUrlPreview &&
  prevProps.ratingImdb === nexProps.ratingImdb &&
  prevProps.ratingKinopoisk === nexProps.ratingKinopoisk &&
  prevProps.id === nexProps.id &&
  prevProps.style.opacity === nexProps.style.opacity
}

export const FilmItem = memo((props) => {
  const {title, subtitle, onDelete, posterUrlPreview , ratingImdb, ratingKinopoisk, id, style, loading, isLoading, loadingPantry} = props;

  const onDescrAction = (e) => {
    if (e._reactName === 'onMouseLeave') {
 
      e.target.parentNode.children[4].style.zIndex = -1

    } else if (e._reactName === 'onMouseEnter') {

      e.target.parentNode.children[4].style.height = window.getComputedStyle(e.target.parentNode.children[1]).height;
      e.target.parentNode.children[4].style.width = window.getComputedStyle(e.target.parentNode.children[1]).width;
      e.target.parentNode.children[4].style.zIndex = 500;

    }
  }

  const eplipsedDescr = (text) => (<LinesEllipsis
    text={text}
    maxLine='14'
    ellipsis='...'
    component='p'
    trimRight
    basedOn='letters'
  />)
  
  const posterView = loadingPantry || isLoading || loading || !posterUrlPreview ? 
  <Skeleton sx={{backgroundColor: 'rgb(255 255 255 / 20%)'}} variant='rectangular'>
    <img className="film__poster" src={posterUrlPreview} alt="Обложка"/>
  </Skeleton> :
    <img className="film__poster" src={posterUrlPreview} alt="Обложка"/>

  return ( 
          <li style={style} className="film">
            <div className="ratings">
              <img className="rating-icon" src={kinopoiskImg} alt="Кинопоиск"/>
              <span className="rating">{ratingKinopoisk}</span>
              <img className="rating-icon" src={imdbImg} alt="IMDB"/>
              <span className="rating">{ratingImdb}</span>
            </div>
            <Link key={`/film/${id}`} to={`/film/${id}`}>
              <div className="film__poster-link">
                {posterView}
              </div>
            </Link>
            <Link className="film__title-link" to={`/film/${id}`}><h2 className="film__title">{title}</h2></Link>
            <div onClick={onDescrAction} 
            onMouseLeave={onDescrAction} 
            onMouseEnter={onDescrAction} className="film__descr">Описание</div>
            <div className="film__descr-text">{eplipsedDescr(subtitle)}</div>
            <div onClick={() => onDelete(id)} className="film__delete-icon"><svg  aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" className="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>
            </div>
          </li>
  )
}, propsChecker)

export default FilmItem;
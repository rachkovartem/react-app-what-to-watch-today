import ReactDom from 'react-dom';
import * as React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom'

import './FilmItem.scss'
import kinopoiskImg from '../../resources/img/kinopoisk.svg';
import imdbImg from '../../resources/img/IMDB.svg';
import poster from '../../resources/img/poster.jpg'




export default function FilmItem(props) {
  const {title, subtitle, timestamp, genre, onDelete, posterUrlPreview, ratingImdb, ratingKinopoisk, id} = props;
  const date = new Date(timestamp*1000);
  const dateToItem = `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`
  
  const [hoveredImgOpen, setHoveredImgOpen] = React.useState(false);
  const [clientX, setclientX] = React.useState(0)
  const [clientY, setclientY] = React.useState(0)
  const [fullDescrShowed, toggleFullDescrShowed] = React.useState(false)

  const hoveredImg = () => {
    if (!hoveredImgOpen) return null 

    

    const poster = document.querySelector('.film-poster')
    const node = document.querySelector('body');
    return ReactDom.createPortal(
      <img alt="Постер фильма" className="film-poster" src={posterUrlPreview}
          />, node);
  }

  const onMouseMove = (e) => {
    setclientX(e.clientX)
    setclientY(e.clientY)
  }

  const secondaryTypographyProps = () => {
    let mainProps = {
      component: 'div', 
      display: 'block',
    }
    if (fullDescrShowed) {
      return mainProps
    } else {
      mainProps.height = '3.75375rem'
      return mainProps
    }
  } 

  const showedSubtitle = (textOfSubtitle) => {
    if (fullDescrShowed) {
      return <span onClick={() => toggleFullDescrShowed(!fullDescrShowed)}>{textOfSubtitle}</span>
     } else {
        return <LinesEllipsis
        onClick={() => toggleFullDescrShowed(!fullDescrShowed)}
        text={textOfSubtitle}
        maxLine='3'
        ellipsis='...далее'
        component='div'
        trimRight
        basedOn='letters'
      />
     } 
            
  }

  return (
<>
            <li className="film">
            <div className="ratings">
              <img className="rating-icon" src={kinopoiskImg} alt="Кинопоиск"/>
              <span className="rating">8.8</span>
              <img className="rating-icon" src={imdbImg} alt="IMDB"/>
              <span className="rating">9</span>
            </div>
            <Link to={`/film/${id}`} className="film__poster-link" href="#">
            <img className="film__poster" src={posterUrlPreview} alt="Обложка"/>
            </Link>
            <a className="film__title-link" href="#"><h2 className="film__title">{title}</h2></a>
            <div className="film__descr">Описание</div>
            <div className="film__descr-text">{subtitle}</div>
            <div className="film__delete-icon"><svg  aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" className="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>
            </div>
          </li>



          </>




      // <li style={{maxWidth:'100%'}}
        
      //   secondaryAction={
      //       <IconButton onClick={onDelete} edge="end" aria-label="delete">
      //           <DeleteIcon />
      //       </IconButton>
      //   }
      //   sx={{display: {xs: 'grid', md: 'flex'}, gridTemplate: 'repeat(3, auto) / repeat(12, 1fr)'}}
      // >
      //   <ListItemAvatar sx={{gridArea: {xs: '1/1/2/2', sm: ''} }}>
      //     <Avatar onMouseMove={onMouseMove}
      //             onMouseEnter={hoveredImgOpen ? null : () => {document.querySelector('body').style.position = 'relative'; setHoveredImgOpen(true)}}
      //             onMouseLeave={hoveredImgOpen ? () => {document.querySelector('body').style.position = 'relative'; setHoveredImgOpen(false)} : null}>
      //       <React.Fragment>
      //         {
      //         posterUrlPreview ?
      //         <img alt={'Постер фильма'} src={posterUrlPreview} style={{transform: 'scale(0.1)'}}/> :
      //         <MovieIcon />
      //         }
      //         {hoveredImg()}
              
      //       </React.Fragment>
      //     </Avatar>
      //     {ratings(ratingKinopoisk, ratingImdb)}
      //   </ListItemAvatar>
      //   <ListItemText
          
      //     primary={
      //     <Link 
      //     className='film-item__title'
      //     to={`/film/${id}`}>{title}</Link>
      //     }
      //     secondary={showedSubtitle(subtitle)}
      //     secondaryTypographyProps={secondaryTypographyProps()}
      //     sx={{width:{ xs: 1, md: 1/4}, gridArea: {xs: '1/2/2/13', sm: ''}}}
      //   />
      //   <Typography
      //     variant="div"
      //     noWrap
      //     component="div"
      //     sx={{
      //       width: {xs: '1', md: 1/4},
      //       flexGrow: 1, 
      //       display: { xs: 'block', md: 'block' }, 
      //       marginBottom: { xs: '8px'},
      //       gridArea: { xs: '2/1/3/13'},
      //       color: 'rgba(0, 0, 0, 0.6)',
      //       whiteSpace: 'normal',
      //       fontSize: '12px',
      //       textAlign: 'right',
      //     }}
      //   >
      //     <div>Жанр: </div> <div>{genre.join(', ')}</div>
      //   </Typography>
      //   <Typography
      //     variant="div"
      //     noWrap
      //     component="div"
      //     sx={{ flexGrow: 1, display: { xs: 'block', md: 'block' }, gridArea: { xs: '3/6/4/13'}, textAlign: 'right', fontSize:{xs: 10}}}
      //   >
      //     Добавлен: {dateToItem}
      //   </Typography>
      // </li>
  )



}

const ratings = (kinopoisk = "---", imdb = "---") => {
  return (
    <div className='Film-item__ratings-wrapper'>
      <div className='Film-item__rating-wrapper'>
        <img className='Film-item__logo' src={kinopoiskImg} alt="Лого кинопоиска"/>
        <p className='Film-item__rating'>{kinopoisk ? kinopoisk : '---'}</p>
      </div>
      <div className='Film-item__rating-wrapper'>
        <img className='Film-item__logo Film-item__logo_imdb' src={imdbImg} alt="Лого IMDB"/>
        <p className='Film-item__rating'>{imdb ? imdb : '---'}</p>
      </div>
    </div>
  )
}
import './FilmList.scss'
import './Ratings.scss'

import { Transition, TransitionGroup } from 'react-transition-group';
import { useRef, cloneElement, useMemo } from 'react';
import { Skeleton } from '@mui/material';

import poster from '../../resources/img/poster.jpg'
import FilmItem from '../filmItem/FilmItem';

const FilmList = (props) => {
  const { setOpen, loadingPantry, isLoading } = props;
  const nodeRef = useRef(null)
  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  }

  const removeStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 1,
  }
  
  const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
  };

  const {onAdd, data} = props;
  const elements = (data) => {
    return (
        data ? data.map(item => {
          const {id, ...itemProps} = item;
          return (
            <Transition 
              component='li' 
              nodeRef={nodeRef} 
              appear={false} 
              in={true} 
              timeout={duration}  
              key={id}
              >
              {state => (
                <FilmItem
                  style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                  }}
                  key={id}
                  id={id}
                  onDelete={() => props.onDelete(id)}
                  onAdd={onAdd}
                  {...itemProps}
                /> 
              )}
            </Transition>
          )
        }) : null
    )
  }

  const memoizedElements = useMemo(() => elements(data), [elements]);
  const notFound = memoizedElements.length === 0 && !loadingPantry && !isLoading ? <div className="film-list__grid">
    <span className='film-list__notfound'>Ничего не найдено</span>
    </div> : null;
  const skeleton = isLoading || loadingPantry ? (
    <div className="film-list__grid">
      <li className="film" style={{minWidth: '100%'}}>
        <div className="film__poster-link">
          <Skeleton sx={{backgroundColor: 'rgb(255 255 255 / 20%)', borderRadius: '12px', minWidth:'400px'}} variant='rectangular'>
            <img className="film__poster" src={poster} alt="Обложка"/>
          </Skeleton>
        </div>
        <Skeleton sx={{backgroundColor: 'rgb(255 255 255 / 20%)', borderRadius: '12px', minWidth:'40%', mt: '10px'}} variant='h2'>
          <div className="film__title-link"><h2 className="film__title">title</h2></div>
        </Skeleton>
        <Skeleton sx={{backgroundColor: 'rgb(255 255 255 / 20%)', borderRadius: '12px', minWidth:'80%', mt: '10px'}} variant='h3'>
          <div className="film__descr">Desription</div>
        </Skeleton>
      </li>
      <li className="film" style={{minWidth: '100%'}}>
        <div className="film__poster-link">
          <Skeleton sx={{backgroundColor: 'rgb(255 255 255 / 20%)', borderRadius: '12px', minWidth:'400px'}} variant='rectangular'>
            <img className="film__poster" src={poster} alt="Обложка"/>
          </Skeleton>
        </div>
        <Skeleton sx={{backgroundColor: 'rgb(255 255 255 / 20%)', borderRadius: '12px', minWidth:'40%', mt: '10px'}} variant='h2'>
          <div className="film__title-link"><h2 className="film__title">title</h2></div>
        </Skeleton>
        <Skeleton sx={{backgroundColor: 'rgb(255 255 255 / 20%)', borderRadius: '12px', minWidth:'80%', mt: '10px'}} variant='h3'>
          <div className="film__descr">Desription</div>
        </Skeleton>
      </li>
      <li className="film" style={{minWidth: '100%'}}>
        <div className="film__poster-link">
          <Skeleton sx={{backgroundColor: 'rgb(255 255 255 / 20%)', borderRadius: '12px', minWidth:'400px'}} variant='rectangular'>
            <img className="film__poster" src={poster} alt="Обложка"/>
          </Skeleton>
        </div>
        <Skeleton sx={{backgroundColor: 'rgb(255 255 255 / 20%)', borderRadius: '12px', minWidth:'40%', mt: '10px'}} variant='h2'>
          <div className="film__title-link"><h2 className="film__title">title</h2></div>
        </Skeleton>
        <Skeleton sx={{backgroundColor: 'rgb(255 255 255 / 20%)', borderRadius: '12px', minWidth:'80%', mt: '10px'}} variant='h3'>
          <div className="film__descr">Desription</div>
        </Skeleton>
      </li>
      <li className="film" style={{minWidth: '100%'}}>
        <div className="film__poster-link">
          <Skeleton sx={{backgroundColor: 'rgb(255 255 255 / 20%)', borderRadius: '12px', minWidth:'400px'}} variant='rectangular'>
            <img className="film__poster" src={poster} alt="Обложка"/>
          </Skeleton>
        </div>
        <Skeleton sx={{backgroundColor: 'rgb(255 255 255 / 20%)', borderRadius: '12px', minWidth:'40%', mt: '10px'}} variant='h2'>
          <div className="film__title-link"><h2 className="film__title">title</h2></div>
        </Skeleton>
        <Skeleton sx={{backgroundColor: 'rgb(255 255 255 / 20%)', borderRadius: '12px', minWidth:'80%', mt: '10px'}} variant='h3'>
          <div className="film__descr">Desription</div>
        </Skeleton>
      </li>
    </div>) : null;



  const list = memoizedElements.length > 0 && !loadingPantry && !isLoading ? (
    <TransitionGroup 
      className="film-list__grid"
      childFactory={child => cloneElement(
      child,
      {
        style: {removeStyle}
      }
      )}>
        {memoizedElements}
    </TransitionGroup> 
  ) : null;

  return (
    <section className="film-list">
      <div className="container"> 
        {list}
        {notFound}
        {skeleton}
        <button className="film-list__add-button" onClick={() => setOpen(true)}>
          <svg rotate="45" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.75781 7.75732L16.2431 16.2426" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.75781 16.2426L16.2431 7.75732" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
  
}

export default FilmList
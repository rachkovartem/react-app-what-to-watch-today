import './FilmList.scss'
import './Ratings.scss'
import nextId from 'react-id-generator';

import {
  Transition,
  TransitionGroup,
} from 'react-transition-group';

import { useRef, cloneElement } from 'react';
import FilmItem from '../filmItem/FilmItem';




const FilmList = (props) => {
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
      <TransitionGroup 
      className="film-list__grid"
      childFactory={child => cloneElement(
        child,
        {
          style: {removeStyle}
        }
      )}>
        {data.map(item => {
          const {id, ...itemProps} = item;
          return (
            <Transition 
              component='li' 
              nodeRef={nodeRef} 
              appear={false} 
              in={true} 
              timeout={duration}  
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
        })}
      </TransitionGroup>
    )
    
  }
  
    

  return (

      <section className="film-list">
        <div className="container">
          <div className="film-list__wrapper">
            
           
              {elements(data)}
          
           
          </div>

        </div>

      </section>




    );
  
}

export default FilmList
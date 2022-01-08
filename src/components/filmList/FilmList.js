import * as React from 'react';
import FilmItem from '../filmItem/FilmItem';





const FilmList = (props) => {

  const {onAdd, data} = props;
  const elements = (data) => {
    return (
      data.map(item => {
        const {id, ...itemProps} = item;
        return (
          <FilmItem
          key={id}
          id={id}
          onDelete={() => props.onDelete(id)}
          onAdd={onAdd}
          {...itemProps}
          /> 
        )
      })
    )
    
  }
  
    

  return (

      <section className="film-list">
        <div className="container">
          <div className="film-list__wrapper">
            <ul className="film-list__grid">
            {elements(data)}
            
            </ul>
          </div>

        </div>

      </section>




    );
  
}

export default FilmList
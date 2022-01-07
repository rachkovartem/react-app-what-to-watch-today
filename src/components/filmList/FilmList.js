import * as React from 'react';
import List from '@mui/material/List';
import FilmItem from '../filmItem/FilmItem';
import NewFilmDialog from '../newFilmDialog/NewFilmDialog';





class FilmList extends React.Component {


  elements = (data) => {
    return (
      data.map(item => {
        const {id, ...itemProps} = item;
        return (
          <FilmItem
          key={id}
          id={id}
          onDelete={() => this.props.onDelete(id)}
          {...itemProps}
          /> 
        )
      })
    )
    
  }

  render() {
    const {onAdd, data} = this.props;
    return (
        // <ul>
        //   {this.elements(data)}
        //   <NewFilmDialog onAdd={onAdd}/>
        // </ul>

        <section className="film-list">
          <div className="container">
            <div className="film-list__wrapper">
              <ul className="film-list__grid">
              {this.elements(data)}
              <FilmItem onAdd={onAdd}/>
              
              </ul>
            </div>

          </div>

        </section>




      );
    }
}

export default FilmList
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
        <List>
          {this.elements(data)}
          <NewFilmDialog onAdd={onAdd}/>
        </List>
      );
    }
}

export default FilmList
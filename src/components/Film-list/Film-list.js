import * as React from 'react';
import List from '@mui/material/List';
import FilmItem from '../Film-item/Film-item';
import NewFilmDialog from '../New-film-dialog/New-film-dialog';





class FilmList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
    
  }
  

  elements = (data) => {
    return (
      data.map(item => {
        const {id, ...itemProps} = item;
        return (
          <FilmItem
          key={id}
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
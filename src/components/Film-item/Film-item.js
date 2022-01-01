import ReactDom from 'react-dom';
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import MovieIcon from '@mui/icons-material/Movie';



export default function FilmItem({title, subtitle, timestamp, genre, onDelete, posterUrlPreview}) {
  const date = new Date(timestamp*1000);
  const dateToItem = `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`
  
  const [hoveredImgOpen, setHoveredImgOpen] = React.useState(false);
  const [clientX, setclientX] = React.useState(0)
  const [clientY, setclientY] = React.useState(0)

  const hoveredImg = () => {
    if (!hoveredImgOpen) return null 

    let styles = () => {
      if (!poster) return {
        
        opacity: 0, 
        left: `${clientX}px`, 
        position: 'absolute',
        transition: 'left 0.1s, right 0.1s, opacity 0.3s',
        top: `${window.scrollY + clientY - 200}px`,}
      let style = {}
      console.log([poster.clientHeight, clientY])
      if (poster.clientHeight > clientY) {
        
        style = {
          position: 'absolute',
          left: `${clientX - poster.clientWidth - 15}px`,
          top: `${window.scrollY + clientY + 15}px`,
          transition: 'opacity 0.3s',
          opacity: 1,
          height: 200
        }
      } else {
        style = {
          position: 'absolute',
          left: `${clientX}px`,
          top: `${window.scrollY + clientY - poster.clientHeight}px`,
          transition: 'opacity 0.3s',
          opacity: 1,
          height: 200
        }
      }
 
      return style

    } 

    const poster = document.querySelector('.film-poster')
    const node = document.querySelector('body');
    return ReactDom.createPortal(
      <img className="film-poster" src={posterUrlPreview}
          style={styles()}/>, node);
  }

  const onMouseMove = (e) => {
    setclientX(e.clientX)
    setclientY(e.clientY)
  }

  

  

  return (
      <ListItem
        onMouseMove={onMouseMove}
        secondaryAction={
            <IconButton onClick={onDelete} edge="end" aria-label="delete">
                <DeleteIcon />
            </IconButton>
        }
        sx={{display: {xs: 'grid', md: 'flex'}, gridTemplate: 'repeat(3, auto) / repeat(12, 1fr)'}}
      >
        <ListItemAvatar sx={{gridArea: {xs: '1/1/2/2', sm: ''} }}>
          <Avatar onMouseEnter={hoveredImgOpen ? null : () => {document.querySelector('body').style.position = 'relative'; setHoveredImgOpen(true)}}
                  onMouseLeave={hoveredImgOpen ? () => {document.querySelector('body').style.position = 'relative'; setHoveredImgOpen(false)} : null}>
            <React.Fragment>
              {
              posterUrlPreview ?
              <img src={posterUrlPreview} style={{transform: 'scale(0.1)'}}/> :
              <MovieIcon />
              }
              {hoveredImg()}
              
            </React.Fragment>

            
              


          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={subtitle}
          sx={{width:{ xs: 1, md: 1/4}, gridArea: {xs: '1/2/2/13', sm: ''}}}
        />
        <Typography
          variant="div"
          noWrap
          component="div"
          sx={{width: {xs: '1', md: 1/4}, flexGrow: 1, display: { xs: 'block', md: 'block' }, gridArea: { xs: '2/1/3/12'}}}
        >
          Жанр: {genre.join(', ')}
        </Typography>
        <Typography
          variant="div"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'block', md: 'block' }, gridArea: { xs: '3/6/4/13'}, textAlign: 'right', fontSize:{xs: 10}}}
        >
          Добавлен: {dateToItem}
        </Typography>
      </ListItem>
  )
}


import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import MovieIcon from '@mui/icons-material/Movie';



export default function FilmItem({title, subtitle, timestamp, genre, onDelete}) {
    const date = new Date(timestamp*1000);
    const dateToItem = `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`

    return (
        <ListItem
          secondaryAction={
              <IconButton onClick={onDelete} edge="end" aria-label="delete">
                  <DeleteIcon />
              </IconButton>
          }
          sx={{display: {xs: 'grid', md: 'flex'}, gridTemplate: '1fr 1fr / repeat(12, 1fr)'}}
        >
          <ListItemAvatar sx={{gridArea: {xs: '1/1/2/2', sm: ''} }}>
            <Avatar>
                <MovieIcon />
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
            sx={{width: {xs: '1', md: 1/4}, flexGrow: 1, display: { xs: 'block', md: 'block' }, gridArea: { xs: '2/1/3/9'}}}
          >
            Жанр: {genre.join(', ')}
          </Typography>
          <Typography
            variant="div"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'block', md: 'block' }, gridArea: { xs: '2/9/3/12'} }}
          >
            Добавлен: {dateToItem}
          </Typography>
        </ListItem>
    )
}


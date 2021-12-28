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
        >
            <ListItemAvatar>
            <Avatar>
                <MovieIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText
            primary={title}
            secondary={subtitle}
            sx={{width: 1/4}}
            />
            <Typography
            variant="div"
            noWrap
            component="div"
            sx={{width: 1/4, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Жанр: {genre}
          </Typography>
          <Typography
            variant="div"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Добавлен: {dateToItem}
          </Typography>
        </ListItem>
    )
}


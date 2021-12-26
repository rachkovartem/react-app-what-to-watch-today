import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';


function generate(element) {
  return [0, 1, 2, 3].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

// List = styled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
// }));

export default function FilmList() {

  return (
    <List>
        {generate(
            <ListItem
                secondaryAction={
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
                }
            >
                <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText
                primary="Single-line item"
                secondary="Secondary text"
                />
            </ListItem>,
            )}
        </List>
    );
}
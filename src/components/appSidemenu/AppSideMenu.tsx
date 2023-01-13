import "./AppSideMenu.scss";

import * as React from "react";
import PropTypes from "prop-types";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SideMenuGenreFilter from "../sidemenuGenreFilter/SidemenuGenreFilter";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useStore } from "effector-react";
import { $isDrawerOpened, toggleDrawer } from "../../models/app";

const drawerWidth = 240;

function AppSidemenu(props: {
  genres: () => Array<string>;
  filterSetter: { genre: unknown; date: (string) => void };
  filtersReset: () => void;
  filterGenre: unknown[];
  filterDate: string;
}) {
  const isDrawerOpened = useStore($isDrawerOpened);

  const handleCloseDrawer = () => {
    toggleDrawer(false);
  };

  const selectedButton = (text) => {
    return props.filterDate === text;
  };

  return (
    <Drawer
      anchor="right"
      variant="temporary"
      open={isDrawerOpened}
      onClose={handleCloseDrawer}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: "block",
        left: "initial",
        right: "0",
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      <Typography
        noWrap
        component="div"
        sx={{
          textAlign: "center",
          mt: { xs: 3, md: 1 },
          mr: 1,
          ml: 1,
          whiteSpace: "normal",
        }}
      >
        Отобразить фильмы, добавленные за какой период?
      </Typography>
      <List>
        {["Неделя", "Месяц", "Год", "Всё время"].map((text) => (
          <ListItem
            onClick={() => props.filterSetter.date(text)}
            selected={selectedButton(text)}
            button
            key={text}
            id={text}
          >
            {/* <ListItemIcon>

            </ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <SideMenuGenreFilter
          genres={props.genres}
          filterSetter={props.filterSetter}
          filterGenre={props.filterGenre}
        />
      </List>
      <Divider />
      <Stack>
        <Button
          onClick={() => props.filtersReset()}
          sx={{ mt: "25px", ml: "auto", mr: "auto" }}
          variant="outlined"
        >
          Сбросить фильтры
        </Button>
      </Stack>
    </Drawer>
  );
}

AppSidemenu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AppSidemenu;

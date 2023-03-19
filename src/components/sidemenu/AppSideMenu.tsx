import "./AppSideMenu.scss";

import * as React from "react";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import SideMenuGenreFilter from "../sidemenuGenreFilter/SidemenuGenreFilter";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useStore } from "effector-react";
import { $isDrawerOpened, toggleDrawer } from "../../models/app";
import {
  $filmsFilter,
  FilmsTypes,
  filterUserFilms,
  resetFilmsFilter,
} from "../../models/films";
import { ListItemButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const filterValues: { title: string; value: FilmsTypes }[] = [
  { title: "Всё", value: "all" },
  { title: "Фильмы", value: "films" },
  { title: "Сериалы", value: "serials" },
];

function AppSidemenu() {
  const isDrawerOpened = useStore($isDrawerOpened);
  const filmsFilter = useStore($filmsFilter);
  const resetFilter = () => resetFilmsFilter();

  const handleCloseDrawer = () => {
    toggleDrawer(false);
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
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 320 },
      }}
    >
      <CloseIcon
        sx={{ position: "absolute", top: 10, left: 10, cursor: "pointer" }}
        onClick={handleCloseDrawer}
      />
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
        Что показать?
      </Typography>
      <List>
        {filterValues.map((value, index) => (
          <ListItemButton
            onClick={() => filterUserFilms({ type: value.value })}
            selected={value.value === filmsFilter.type}
            key={index}
          >
            <ListItemText primary={value.title} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        <SideMenuGenreFilter />
      </List>
      <Divider />
      <Stack>
        <Button
          onClick={resetFilter}
          sx={{ mt: "25px", ml: "auto", mr: "auto", width: "250px" }}
          variant="outlined"
        >
          Сбросить фильтры
        </Button>
      </Stack>
    </Drawer>
  );
}

export default AppSidemenu;

import { useStore, useStoreMap } from "effector-react";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  $filmsFilter,
  $userFilmsGenres,
  filterUserFilms,
} from "../../models/films";

export default function SideMenuGenreFilter() {
  const theme = useTheme();
  const genres = useStore($userFilmsGenres);
  const selectedGenres = useStoreMap($filmsFilter, (filter) => filter.genres);

  const handleChange = (event) => {
    const value = event.target.value;
    filterUserFilms({ genres: value });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormControl sx={{ width: 250, m: "17px 0" }}>
        <Select
          multiple
          displayEmpty
          value={selectedGenres}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span>Фильтр по жанру</span>;
            }

            return selected.join(", ");
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 224,
                width: 250,
              },
            },
          }}
        >
          <MenuItem disabled value="">
            <span>Фильтр по жанру</span>
          </MenuItem>
          {genres.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={{
                fontWeight: selectedGenres.includes(name)
                  ? theme.typography.fontWeightRegular
                  : theme.typography.fontWeightMedium,
              }}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

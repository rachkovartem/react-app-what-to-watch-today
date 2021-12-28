import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


export default function NewFilmDatePicker(props) {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Дата добавления"
        value={props.timestampToPicker()}
        onChange={(newValue) => {
            props.onDateChange(newValue);
        }}
        renderInput={(params) => <TextField {...params}
        sx={{mt: 2}}
        />}
      />
    </LocalizationProvider>
  );
}
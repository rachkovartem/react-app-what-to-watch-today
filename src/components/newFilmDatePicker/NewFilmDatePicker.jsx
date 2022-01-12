import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


export default function NewFilmDatePicker(props) {
  const onFocusInput = (e) => {
    console.dir(e.target.parentNode.children[2])
    e.target.parentNode.children[2].classList.add('css-1d3z3hw-MuiOutlinedInput-notchedOutline-primary')
    // document.querySelector('.css-1z10yd4-MuiFormControl-root-MuiTextField-root').classList.add('MuiFormControl-root-primary-border')
  }

  const outFocusInput = (e) => {
    e.target.parentNode.children[2].classList.remove('css-1d3z3hw-MuiOutlinedInput-notchedOutline-primary')
    // document.querySelector('.css-1z10yd4-MuiFormControl-root-MuiTextField-root').classList.remove('MuiFormControl-root-primary-border')
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        Format="dd/mm/yyyy"
        label="Дата добавления"
        value={props.timestampToPicker()}
        onChange={(newValue) => {
            props.onDateChange(newValue);
        }}
        renderInput={(params) => <TextField onFocus={onFocusInput} onBlur={outFocusInput} {...params}
        sx={{mt: 2}}
        />}
      />
    </LocalizationProvider>
  );
}
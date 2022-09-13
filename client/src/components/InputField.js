import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputField(props) {
  const placeholder = "<Team A name> <Team A registration date in DD/MM> <Team A group number>" 
    + " or\n" + "<Team A name> <Team B name> <Team A goals scored> <Team B goals scored>";
  return (
    <TextField
        id="outlined-multiline-static"
        label="Input"
        multiline
        rows={20}
        fullWidth
        placeholder={placeholder}
        value = {props.value}
        onChange = {(event) => {props.onChange(event.target.value)}}
    />
  );
}

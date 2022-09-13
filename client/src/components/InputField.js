import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputField(props) {
  return (
    <TextField
        id="outlined-multiline-static"
        label="Input"
        multiline
        rows={20}
        fullWidth
        placeholder="Your input here"
        value = {props.value}
        onChange = {(event) => {props.onChange(event.target.value)}}
    />
  );
}

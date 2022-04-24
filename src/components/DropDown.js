import React from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'


export default function DropDown(props) {
  const { onChangeHandler, options, label, value } = props;
  console.log('DropDown :: props :: ', props);

  const DropDownHandler = val => {
    // console.log('DropDown :: DropDownHandler:: val :: ', val);
    // console.log('DropDown :: DropDownHandler:: val :: ', val.target.value);
    onChangeHandler(val.target.value)
  }
  return (
    <FormControl size="small">
      <InputLabel id="demo-select-small">{label}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={value}
        label={label}
        onChange={DropDownHandler}
        style={{ maxWidth: '120px' }}
      >
        {options.map(op => <MenuItem value={op.deviceId}>{op.label}</MenuItem>)}
      </Select>
    </FormControl>
  )
}

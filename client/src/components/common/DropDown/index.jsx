import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropDownComponent({months, pageArray, title, selectedValue, setSelectedValue}) {

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div style={{ minWidth: 120, color: "black" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label={title}
          onChange={handleChange}
        >
          {months && months.map((month, index) => {
            return <MenuItem key={index} value={`0${index + 1}`}>{month}</MenuItem>
          })}
          {pageArray && pageArray.map((page, index) => {
            return <MenuItem key={index} value={page}>{page}</MenuItem>
          })}
        </Select>
      </FormControl>
    </div>
  )
};
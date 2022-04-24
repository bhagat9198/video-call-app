import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BsCameraVideo, BsDot } from 'react-icons/bs';
import { getDay, getTime } from '../utils/config';

export default function Navbar() {
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    setTime(getTime())
    setInterval(() => {
      const t = getTime();
      setTime(t)
    }, 1000 * 60)

    setDay(getDay())
  }, [])

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <BsCameraVideo />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Let's Meet
        </Typography>
        <Typography>
          {time} <BsDot /> {day}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

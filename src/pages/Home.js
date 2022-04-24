import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Button, Card, CardContent, CardMedia, Divider, Grid, IconButton, TextField, Toolbar, Typography } from '@mui/material';

import { RiVideoAddLine } from 'react-icons/ri';
import { TiTickOutline } from 'react-icons/ti';
import { getDay, getTime } from '../utils/config';
import { Box } from '@mui/system';
import Navbar from '../components/Navbar';
export default function Home() {
  const navigator = useNavigate();


  // const clickHandler = () => {
  //   const roomId = Math.random()
  //   navigator(`/room/${roomId}`);
  // }



  return (
    <>
      <Box style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar />
        <Grid container spacing={2} style={{ flexGrow: 1, alignItems: 'center' }}>
          <Grid item xs={12} sm={6}  >
            <Box style={{ width: '70%', marginLeft: '15%' }}>
              <Typography variant='h3' >
                No Rechange in phone? <br />
                Talk here for free
              </Typography>
              <Box style={{ margin: '20px' }} ></Box>
              <Divider />
              <Box style={{ margin: '20px' }} ></Box>
              <Box style={{ margin: '20px' }}>
                <Button startIcon={<RiVideoAddLine />} fullWidth variant="contained">New Meeting</Button>
              </Box>
              <Box style={{ margin: '20px', display: 'flex', alignItems: 'center' }}>
                <Box style={{ flexGrow: 1 }}>
                  <TextField fullWidth id="outlined-basic" label="Enter Meeting Id" variant="outlined" />
                </Box>
                <Box>
                  <Button style={{ height: '55px' }} startIcon={<TiTickOutline />} variant="contained" />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} >
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  image="https://i.pinimg.com/736x/53/1f/91/531f91133aa51c1e3eda1a7efd1fd278.jpg"
                  alt="Let's Meet"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Let's Meet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Connect with your family and friends
                  </Typography>
                </CardContent>
              </Card>

            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

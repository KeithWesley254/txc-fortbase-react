import { Box, Card, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'

const SoldierProfile = ({ oneGeneral }) => {
    
  return (
    <>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Box sx={{xs: {ml: 5}, ml: 5, display: "flex", justifyContent: "center" }}>
              <Card sx={{ maxWidth: 345}}>
                  <CardMedia
                    component="img"
                    height="230"
                    image={oneGeneral?.image_url}
                    alt={oneGeneral?.name}
                    sx={{width: "auto"}}
                  />
              </Card>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box sx={{ textAlign: "left", ml: 5}}>
              <Typography variant="h5" component="h2">
                Full Name
              </Typography>
              <Typography variant="body2" component="h2">
                {oneGeneral?.name}
              </Typography>
            </Box>
            <br />
            <Box sx={{ textAlign: "left", ml: 5}}>
              <Typography variant="h5" component="h2">
                Gender
              </Typography>
              <Typography variant="body2" component="h2">
                {oneGeneral?.gender}
              </Typography>
            </Box>
            <br />
            <Box sx={{ textAlign: "left", ml: 5}}>
              <Typography variant="h5" component="h2">
                Age
              </Typography>
              <Typography variant="body2" component="h2">
                {oneGeneral?.age}
              </Typography>
            </Box>                    
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box sx={{ textAlign: "left", ml: 5}}>
              <Typography variant="h5" component="h2">
                 Bio
                </Typography>
                <Typography variant="body2" component="h2">
                  {oneGeneral?.bio}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <Box sx={{ textAlign: "left", ml: 5}}>
              <Typography variant="h5" component="h2">
                Favourite Foot
              </Typography>
              <Typography variant="body2" component="h2">
                {oneGeneral?.favourite_foot}
              </Typography>
            </Box>
        </Grid>
        <Grid item xs={6} md={6}>
          <Box sx={{ textAlign: "left", ml: 5}}>
              <Typography variant="h5" component="h2">
                Interests
              </Typography>
              <Typography variant="body2" component="h2">
                {oneGeneral?.interests}
              </Typography>
            </Box>
        </Grid>
    </Grid>
    </>
  )
}

export default SoldierProfile;
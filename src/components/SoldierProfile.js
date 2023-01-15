import { Box, Card, CardMedia, Grid, Typography, InputLabel, OutlinedInput, FormControl } from '@mui/material'
import React, { useState } from 'react'

const SoldierProfile = ({ oneSoldier }) => {
  const soldier_id = oneSoldier.id;
  const [message, setFanMessage] = useState('');

  const loopPlatoon = oneSoldier?.soldier_profile.platoon.map((platoon) => {
      return (
        <Typography key={platoon.id} variant="body2" component="h2">
          {platoon.name}
        </Typography>
      )
  })

  const loopMilitarySpec = oneSoldier?.soldier_profile.military_spec.map((specialization) => {
      return (
        <Typography key={specialization.id} variant="body2" component="h2">
          {specialization.title}
        </Typography>
      )
  })

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/fan_messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        soldier_id,
        message,
      }),
    })
    setFanMessage('')
  }
    
  return (
    <>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Box sx={{xs: {ml: 5}, ml: 5, display: "flex", justifyContent: "center" }}>
              <Card sx={{ maxWidth: 345}}>
                  <CardMedia
                    component="img"
                    height="230"
                    image={oneSoldier?.soldier_profile.image_url}
                    alt={oneSoldier?.soldier_profile.name}
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
                {oneSoldier?.name}
              </Typography>
            </Box>
            <br />
            <Box sx={{ textAlign: "left", ml: 5}}>
              <Typography variant="h5" component="h2">
                Platoon
              </Typography>
              {loopPlatoon}
            </Box>
            <br />
            <Box sx={{ textAlign: "left", ml: 5}}>
              <Typography variant="h5" component="h2">
                Military Specialization
              </Typography>
              {loopMilitarySpec}
            </Box> 
            <br />
            <Box sx={{ textAlign: "left", ml: 5}}>
              <Typography variant="h5" component="h2">
                Age
              </Typography>
              <Typography variant="body2" component="h2">
                {oneSoldier?.age}
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
                  {oneSoldier?.soldier_profile.bio}
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
                Gender
              </Typography>
              <Typography variant="body2" component="h2">
                {oneSoldier?.soldier_profile.gender}
              </Typography>
            </Box>         
          </Grid>
        <Grid item xs={6} md={6}>
          <Box sx={{ textAlign: "left", ml: 5}}>
              <Typography variant="h5" component="h2">
                Favourite Foot
              </Typography>
              <Typography variant="body2" component="h2">
                {oneSoldier?.soldier_profile.favourite_foot}
              </Typography>
            </Box>
        </Grid>
        <Grid item xs={6} md={6}>
          <Box sx={{ textAlign: "left", ml: 5}}>
              <Typography variant="h5" component="h2">
                Interests
              </Typography>
              <Typography variant="body2" component="h2">
                {oneSoldier?.soldier_profile.interests}
              </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
            <Box sx={{textAlign: "center", fontFamily: "nunito", border: 1, mr: 4, ml: 4}}>
                <Typography sx={{fontWeight: "ligher"}}>
                  Write {oneSoldier?.name} A Message
                </Typography>
                <form onSubmit={handleSubmit}>
                  <FormControl sx={{ m: 1, width: "70%" }}>
                    <InputLabel htmlFor="message">Message</InputLabel>
                    <OutlinedInput
                      id="message"
                      multiline
                      rows={4}
                      type="text"
                      value={message}
                      onChange={(e) => setFanMessage(e.target.value)}
                      label="Message"
                    />
                  </FormControl>
                  <FormControl>
                    <button style={{
                      fontSize: 14,
                      backgroundColor: "#4e60ff",
                      width: 200,
                      height: 40,
                      color: "#fff",
                      borderRadius: 10,
                      cursor: "pointer",
                      border: "none"
                    }}
                    >
                      Send Message
                    </button>
                  </FormControl>
                </form>
                <br />
            </Box>
        </Grid>
    </Grid>
    </>
  )
}

export default SoldierProfile
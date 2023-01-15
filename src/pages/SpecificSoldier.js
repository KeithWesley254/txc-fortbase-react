import React, { useEffect, useState } from 'react';
import SoldierProfile from '../components/SoldierProfile';
import { Box, Grid, CardMedia, Card, LinearProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const SpecificSoldier = () => {
  const [oneSoldier, setOneSoldier] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    fetch(`/api/soldiers/${params.id}`)
    .then(r => {
      if (r.ok) {
        r.json().then((data) => {
          setOneSoldier(data)
          setIsLoading(false)
        });
      }
    });
  }, [params])

  if(isLoading === true) return <LinearProgress style={{backgroundColor: "#4e60ff"}} />

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6} sx={{textAlign: "center"}}>
            <br />
            <Box>
              <Typography sx={{fontFamily: "nunito", fontWeight: "bold", fontSize: 40}}>
                Soldier
              </Typography>
            </Box>
            <br />
            <SoldierProfile oneSoldier={oneSoldier}/>
          </Grid>
          <br />
          <Grid item xs={12} md={6} sx={{textAlign: "center"}}>
            <br />
            <Grid container spacing={2} columns={6}>
              <Grid item xs={6} md={6}>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                  <Card sx={{ maxWidth: "70%" }}>
                    <CardMedia
                      component="img"
                      height="450"
                      image={oneSoldier?.soldier_profile.image_url_2}
                      alt={oneSoldier?.name}
                    />
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={6} md={6}>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                  <Card sx={{ maxWidth: "70%" }}>
                    <CardMedia
                      component="img"
                      height="450"
                      image={oneSoldier?.soldier_profile.image_url_3}
                      alt={oneSoldier?.name}
                    />
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
      </Box>
    </>
  )
}

export default SpecificSoldier
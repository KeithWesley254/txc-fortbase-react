import { Grid, Box, Card, CardMedia, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AboutUsForm from '../components/AboutUsForm';
import OurImage from '../our_image.jpg';

const AboutUs = () => {
  const [communityData, setCommunityData] = useState([]);
  const [aboutUsData, setAboutUsData] = useState([]);
  const [randomIndexCommunity, setRandomIndex] = useState();
  const [randomIndexAbout, setRandomIndexAbout] = useState();

  useEffect(() => {
    changeCommunityImage()
  }, []);

  useEffect(() => {
    changeAboutImage()
  }, []);

  useEffect(() => {
    fetch(`/api/community_impacts`)
    .then(r => r.json())
    .then(data => setCommunityData(data))
  }, []);

  useEffect(() => {
    fetch(`/api/about_us`)
    .then(r => r.json())
    .then(data => setAboutUsData(data))
  }, []);

  function changeAboutImage(){
    const randomNumber = Math.floor(Math.random() * aboutUsData.length);
    setRandomIndexAbout(randomNumber)
  }

  function changeCommunityImage(){
    const randomNumber = Math.floor(Math.random() * communityData.length);
    setRandomIndex(randomNumber)
  }

  return (
    <>
      <Box>
      <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center", fontSize: 30, fontFamily: "nunito", fontWeight: "bolder"
              }}>
                <p>
                  About Us
                </p>
            </div>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <Box sx={{ml: 4, mr: 4}}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardMedia
                  component="img"
                  height="350"
                  image= {aboutUsData[randomIndexAbout]?.image_url}
                  alt= {aboutUsData[randomIndexAbout]?.title}
                  loading="lazy"
                  />
                </Card>
              </div>
            </Box> 
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <Box sx={{ml: 4, mr: 4}}>
              <div>
                <Box>
                  <Typography>
                    {aboutUsData[randomIndexAbout]?.description}
                  </Typography>
                </Box>
                <br />  
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={changeAboutImage} variant="contained">See More</Button>
                </Box>
              </div>
            </Box> 
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center", fontSize: 30, fontFamily: "nunito", fontWeight: "bolder"
              }}>
                <p>
                  Community Impact
                </p>
            </div>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <Box sx={{ml: 4, mr: 4}}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardMedia
                  component="img"
                  height="350"
                  image= {communityData[randomIndexCommunity]?.image_url}
                  alt= {communityData[randomIndexCommunity]?.title}
                  loading="lazy"
                  />
                </Card>
              </div>
            </Box> 
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <Box sx={{ml: 4, mr: 4}}>
              <div>
                <Box>
                  <Typography>
                    {communityData[randomIndexCommunity]?.description}
                  </Typography>
                </Box>
                <br />  
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={changeCommunityImage} variant="contained">See More</Button>
                </Box>  
              </div>
            </Box> 
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
              <AboutUsForm />
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <Box sx={{ml: 4, mr: 4}}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Card sx={{ maxWidth: 600 }}>
                    <CardMedia
                    component="img"
                    height="450"
                    image= {OurImage}
                    alt= "our_image"
                    loading="lazy"
                    />
                  </Card>
                </div>
            </Box> 
          </Grid>
        </Grid>
        <br />
      </Box>
    </>
  )
}

export default AboutUs
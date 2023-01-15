import { Grid, Box, CardActionArea, CardMedia, Typography, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Carousel from "react-material-ui-carousel";
import Platoons from '../components/Platoons';

const Hero = () => {
  const [techStories, setTechStories] = useState([]);
  const [communityImpact, setCommunityImpact] = useState([]);
  const [randomIndexCommunity, setRandomIndex] = useState();
  const [platoons, setPlatoons] = useState([])

  useEffect(() => {
    fetch(`/api/technologies`)
    .then(r => r.json())
    .then(data => setTechStories(data))
  }, [])

  useEffect(() => {
    fetch(`/api/community_impacts`)
    .then(r => r.json())
    .then(data => setCommunityImpact(data))
  }, [])

  useEffect(() => {
    fetch(`/api/platoons`)
    .then(r => r.json())
    .then(data => setPlatoons(data))
  }, [])

  const navigate = useNavigate();

  const my_cards = techStories.map((story) => {
    return(
      <Box key={story.id} sx={{mr: 1, ml: 1}}>
        <Card sx={{ width: 200, height: 150, display: "inline-flex", justifyContent: "center" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={story?.image_url}
              alt={story?.title}
              onClick={() => {
                navigate('/technologies')
              }}
            />
          </CardActionArea>
        </Card>
      </Box>
    )
  }) 

  const communitySlides = communityImpact.map((slide) => {
    return (
        <Box key={slide.id} sx={{p: 2}}>
          <Card sx={{ maxWidth: "100%" }}>
            <CardMedia
              component="img"
              height="450"
              image={slide?.image_url}
              alt={slide?.title}
            />
          </Card>
        </Box>
    )
  })

  return (
    <>
      <main>
        <Box>
          <br />
          <Grid container spacing={2} columns={12} sx={{textAlign: "center", pl:4, pr:4, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 14 }}>
            <Grid item xs={12} md={12} >
            <div className='heroScroll' style={{ position: "relative", width: "100%", overflowX: "auto",}}>
              <Box sx={{ borderRadius: 5, display: "inline-flex", flexDirection: 'row'  }}>
                {my_cards}
              </Box>
            </div>
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid container spacing={2} columns={12} >
            <Grid item xs={12} md={6}>
              <Grid container spacing={2} columns={12} sx={{textAlign: "center", pl:4, pr: 4, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 14 }}>
                <Grid item xs={12} md={12}>
                  <Carousel
                    autoPlay={true}
                    interval={6000}
                    animation="slide"
                    duration={2000}
                    indicators={false}
                    swipe={true}
                  >    
                    {communitySlides}
                  </Carousel>
                </Grid>
              </Grid>  
            </Grid>
            <Grid item xs={12} md={6} sx={{pr: 4}}>
              <div>
                <Box sx={{mr: 2, ml: 2, textAlign: "center"}}>
                  <Typography>
                    What is Lorem Ipsum?
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    <br />
                    Why do we use it?
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                  </Typography>
                </Box>  
              </div>
            </Grid>
          </Grid>

          <Platoons platoons={platoons}/>

        </Box>
        <br />
      </main>
    </>
  )
}

export default Hero
import { Box, Card, CardMedia, Grid, CardActionArea, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'

const Technologies = () => {

  const [techStories, setTechStories] = useState([]);

  useEffect(() => {
    fetch(`/api/technologies`)
    .then(r => r.json())
    .then(data => setTechStories(data))
  }, [])

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  const my_cards = techStories.map((story) => {
    return(
      <Box key={story.id} sx={{display: "inline-flex", justifyContent: "center"}}>
        <Card sx={{ width: 200, height: 150, mr: 1, ml: 1, display: "inline-flex", justifyContent: "center" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={story?.image_url}
              alt={story?.title}
            />
          </CardActionArea>
        </Card>
      </Box>
    )
    })  

  return (
    <>
      <Box>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={12}>
            <Box sx={{ mr: 4, ml: 4, fontSize: 60, fontFamily: "nunito", fontWeight: "bolder" }}>
              <p>
                TXC Technologies
                <br />
                And Researches
              </p>
            </Box>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12} sx={{textAlign: "center", pl:4, pr:4, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 14 }}>
          <Grid item xs={12} md={12} >
            <div className='heroScroll' style={{ position: "relative", width: "100%", overflowX: "auto",}}>
              <Box sx={{ borderRadius: 20, display: "inline-flex", flexDirection: 'row'  }}>
                {my_cards}
              </Box>
            </div>
            <br />
          </Grid>
        </Grid>
        <br />
        {techStories.map((techStory) => {
          return(
              <Box key={techStory.id}>
                <Grid container spacing={2} columns={12} >
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={2} columns={12} sx={{textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 14 }}>
                      <Grid item xs={12} md={12}>
                        <Box>
                          <Card sx={{ maxWidth: "100%", mr: 4, ml: 4 }}>
                            <CardMedia
                              component="img"
                              height="480"
                              image={techStory?.image_url}
                              alt={techStory?.title}
                            />
                          </Card>
                        </Box>
                      </Grid>
                    </Grid>  
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <div id={techStory?.id}>
                      <Box sx={{mr: 4, ml: 4, textAlign: "center"}}>
                        <Typography>
                          {techStory?.description}
                        </Typography>
                        <div style={{position: "absolute", right: 70}}>
                          <Button sx={{color: "#4E60FF", fontWeight: "bold"}} 
                          onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}>
                            Go Top
                          </Button>
                        </div>
                      </Box>  
                    </div>
                    <br />
                  </Grid>
                </Grid>
                <br />
              </Box>   
          )
        })}
      </Box>
    </>
  )
}

export default Technologies
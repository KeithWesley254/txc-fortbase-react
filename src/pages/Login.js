import React, { useEffect, useState } from 'react'
import {  CardActionArea, Grid, Box, Button, Card, CardContent, Typography, CardMedia } from '@mui/material';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import Carousel from "react-material-ui-carousel";

const Login = () => {

  const [showLogin, setShowLogin] = useState(true);
  const [loginSlides, setLoginSlides] = useState([]);

  useEffect(() => {
    fetch("/api/login_page_slides")
    .then(r => r.json())
    .then(data => {
        setLoginSlides(data)
    })
  }, []);

  const myCards = loginSlides.map((slide) => {
    return (
      <Box key={slide.id}>
        <Card sx={{ mr: 3, ml: 3, alignItems: "center", textAlign: "center", borderRadius: 5}}>
          <CardActionArea>
            <CardMedia 
            component="img"
            height="400"
            image={slide?.image_url}
            alt={slide?.title}
            sx={{borderRadius: 10, p: 3}}
            />
            <CardContent>
              <Typography sx={{textAlign: "start"}} gutterBottom variant="h5" component="div">
                {slide?.title}
              </Typography>
              <Typography sx={{textAlign: "start"}} variant="body2" color="#545563">
                {slide?.summary}
              </Typography>
              </CardContent>
          </CardActionArea>
        </Card>
      </Box>
      )
    })

  return (
    <>
      <main>
        <Box >
          <Grid container spacing={2} columns={12}>
            <Grid item xs={12} md={6}>

              <div className='logoLogin'>
                <p style={{fontWeight: "bolder", fontSize: 14}}>
                  TXC
                  <br />
                  <span style={{ color: "#4e60ff" }}>FortBase</span>
                </p>
              </div>

              {showLogin ? (
                <>
                <div className='loginForm'>
                  <LoginForm />
                </div>
                <div className='loginForm'>
                  <p>
                    Don't have an account? &nbsp;
                    <Button sx={{bgcolor: "transparent", color: "#4e60ff", fontFamily: "Nunito", fontWeight: "bold", fontSize: 14, textTransform: "none" }} onClick={() => setShowLogin(false)}>
                      Sign Up
                    </Button>
                  </p>
                </div>
                </>
              ): (
                <>
                <div className='loginForm'>
                  <SignUpForm />
                </div>
               
                <div className='loginForm'>
                  <p>
                    Already have an account? &nbsp;
                    <Button sx={{bgcolor: "transparent", color: "#4e60ff", fontFamily: "Nunito", fontWeight: "bold", fontSize: 14, textTransform: "none" }} onClick={() => setShowLogin(true)}>
                      Log In
                    </Button>
                  </p>
                </div>
                </>
              )}

            </Grid>
            <Grid item xs={12} md={6}>
              <>
              <Box sx={{bgcolor: "#4e60ff", display: {xs: 'none', md: 'block'}, height: "100vh", pt: 10 }}>
                <Carousel
                        autoPlay={true}
                        interval={6000}
                        animation="fade"
                        duration={1000}
                        swipe={true}
                        indicators={true}
                        activeIndicatorIconButtonProps={{
                          style: {
                              color: '#fff'
                          }
                        }}
                        indicatorContainerProps={{
                          style: {
                            zIndex: 1,
                            marginTop: 20,
                            position: "relative",
                          }
                        }}
                      >
                        {myCards}
                    </Carousel>
                  <div style={{ flexWrap: "wrap", fontSize: 25, color: "#fff", textAlign: "center"}}>
                      <p>
                        Come join the TXC FortBase fanbase and connect with the Heroes that Defend our Beautiful Nation
                      </p>
                  </div>
              </Box>
              </>
            </Grid>
          </Grid>
        </Box>
      </main>
    </>
  )
}

export default Login
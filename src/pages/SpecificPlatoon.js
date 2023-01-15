import { Grid, LinearProgress, Box, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const SpecificPlatoon = () => {

  const [platoon, setPlatoon] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    fetch(`/api/platoons/${params.id}`)
    .then(r => {
      if (r.ok) {
        r.json().then((data) => {
          setPlatoon(data)
          setIsLoading(false)
        });
      }
    });
  }, [params])

  if(isLoading === true) return <LinearProgress style={{backgroundColor: "#4e60ff"}} />

  const loopSoldiers = platoon?.soldiers.map((soldier) => {
    return (
        <Box key={soldier.id}>
        <Link style={{textDecoration: "none"}} to={`/soldiers/${soldier.id}`}>
            <Card sx={{ width: 150, height: 200, border: 1, p: 2 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="60"
                    image={soldier?.image_url}
                    alt={soldier?.name}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="body2" component="div">
                        Full Name
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {soldier?.name}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
            <br />
        </Box>
    )
  })

  return (
    <>
      <Box>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={4} md={4}>
            <Grid container spacing={2} columns={4}>
              <Grid item xs={4} md={4}>
                <Box>
                  <Typography sx={{fontFamily: "nunito", textAlign: "center", fontWeight: "bold", fontSize: 40}}>
                    Platoon
                  </Typography>
                </Box>
              </Grid>
              <Box sx={{ border: 1, textAlign: "center", ml: 2, width: "100%"}}>
                <Grid item xs={4} md={4}>
                  <Box>
                    <Typography sx={{ fontWeight: "bold" }} variant="h5" component="h2">
                      Full Name
                    </Typography>
                    <Typography variant="body2" component="h2">
                      {platoon?.name}
                    </Typography>
                  </Box>
                  <br />
                  <Box >
                    <Typography sx={{ fontWeight: "bold" }} variant="h5" component="h2">
                      Sphere of Operations
                    </Typography>
                    <Typography variant="body2" component="h2">
                      {platoon?.sphere_assigned}
                    </Typography>
                  </Box>
                  <br />
                  <Box>
                    <Typography sx={{ fontWeight: "bold" }} variant="h5" component="h2">
                      Skill Level
                    </Typography>
                    <Typography variant="body2" component="h2">
                      {platoon?.skill_lvl}
                    </Typography>
                  </Box>                    
                </Grid>
                <br />
                <Grid container spacing={2} columns={4}>
                <Grid item xs={4} md={4}>
                  <Box >
                    <Typography sx={{ fontWeight: "bold" }} variant="h5" component="h2">
                      Ranking
                    </Typography>
                    <Typography variant="body2" component="h2">
                      {platoon?.ranking}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              </Box>
            </Grid>
            <br />
          </Grid>
          <Grid item xs={8} md={8}>
            <Grid container spacing={1} columns={8}>
              <Box className='heroScroll' sx={{ borderRadius: 20, maxHeight: 800, gap: 2, justifyContent: "center", flexWrap: "wrap", display: "inline-flex", flexDirection: 'row', overflowY: "auto"  }}>
                {loopSoldiers}
              </Box>
            </Grid>
          </Grid>   
        </Grid>
        <br />
      </Box>
    </>
  )
}

export default SpecificPlatoon
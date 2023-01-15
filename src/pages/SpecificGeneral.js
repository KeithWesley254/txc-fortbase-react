import React, { useEffect, useState } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, LinearProgress, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import GeneralProfile from '../components/GeneralProfile';

const SpecificGeneral = () => {
  const [oneGeneral, setOneGeneral] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    fetch(`/api/major_generals/${params.id}`)
    .then(r => {
      if (r.ok) {
        r.json().then((data) => {
          setOneGeneral(data)
          setIsLoading(false)
        });
      }
    });
  }, [params])

  if(isLoading === true) return <LinearProgress style={{backgroundColor: "#4e60ff"}} />

  const loopSoldiers = oneGeneral?.soldiers.map((soldier) => {
    return (
        <Link key={soldier.id} style={{textDecoration: "none"}} to={`/soldiers/${soldier.id}`}>
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
    )
  })

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6} sx={{textAlign: "center"}}>
            <Box>
              <Typography sx={{fontFamily: "nunito", fontWeight: "bold", fontSize: 40}}>
                Major General
              </Typography>
            </Box>
            <br />
            <GeneralProfile oneGeneral={oneGeneral}/>
          </Grid>
          <br />
          <Grid item xs={12} md={6} sx={{textAlign: "center"}}>
            <br />
            <Box>
              <Typography sx={{fontFamily: "nunito", fontWeight: "bold", fontSize: 20}}>
                <i>List of Assigned soldiers</i>
              </Typography>
            </Box>
            <br />
            <Box className='heroScroll' sx={{ mr: 2, ml: 2, maxHeight: 800, gap: 2, justifyContent: "center", flexWrap: "wrap", display: "inline-flex", flexDirection: 'row', overflowY: "auto"  }}>
                {loopSoldiers}
                <br />
            </Box>
          </Grid>
        </Grid>
        <br />
      </Box>
    </>
  )
}

export default SpecificGeneral;
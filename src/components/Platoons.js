import { Box, Card, CardContent, Grid, Pagination, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Platoons = ({ platoons }) => {
    const [searchPlatoon, setSearchPlatoon] = useState("");
    const [platoonsPage, setPlatoonsPage] = useState(1);

    function handleSearchPlatoon(){
        return platoons.filter((platoon) => 
            platoon.name.toLowerCase().includes(searchPlatoon)
        )
    }

    const myPlatoonsCards =  
    handleSearchPlatoon()
    .slice((platoonsPage - 1) * 10, (platoonsPage - 1) * 10 + 10)
    .map((platoon) => {
    return(
        <Box key={platoon.id} sx={{mr:2, ml: 2}}>
        <Link style={{textDecoration: "none"}} to={`/platoons/${platoon.id}`}>
            <Card sx={{ width: 200, height: 260, border: 1, p: 2 }}>
                <CardContent sx={{textAlign: "center", fontFamily: "nunito" }}>
                    <Typography sx={{fontSize: 14, fontWeight: "bold"}} component="div">
                        Full Name
                    </Typography>
                    <Typography sx={{fontSize: 12}} >
                        {platoon?.name}
                    </Typography>
                    <Typography sx={{fontSize: 14, fontWeight: "bold"}} component="div">
                    Sphere of Operations
                    </Typography>
                    <Typography sx={{fontSize: 12}}>
                        {platoon?.sphere_assigned}
                    </Typography>
                    <Typography sx={{fontSize: 14, fontWeight: "bold"}} component="div">
                        Skill Level
                    </Typography>
                    <Typography sx={{fontSize: 12}}>
                        {platoon?.skill_lvl}
                    </Typography>
                    <Typography sx={{fontSize: 14, fontWeight: "bold"}} component="div">
                        Ranking
                    </Typography>
                    <Typography sx={{fontSize: 12,}}>
                        {platoon?.ranking}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
        </Box>
    )
    }) 

  return (
    <>
        <Grid container spacing={2} columns={12}>
            <Grid item xs={12} md={12}>
                <br />
                <div style={{ textAlign: "center", fontSize: 30, fontFamily: "nunito", fontWeight: "bolder"}}>
                    <p>
                        TXC FortBase Platoons
                    </p>
                </div>
            </Grid>
            <Grid item xs={12} md={12}>
                <br />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                <TextField 
                label="Go back to the first page for a full search..."
                variant='outlined'
                style={{ marginBottom: 20, width: "70%", borderRadius: 20 }}
                onChange={(e) => setSearchPlatoon(e.target.value.toLocaleLowerCase())}
                />
                </Box>
            </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12} sx={{textAlign: "center", pl:4, pr:4, justifyContent: "center", alignItems: "center", fontSize: 14 }}>
          <Grid item xs={12} md={12} >
            <div className='heroScroll' style={{ position: "relative", width: "100%", overflowX: "auto" }}>
              <Box sx={{ display: "inline-flex", flexDirection: 'row'  }}>
                {myPlatoonsCards}
              </Box>
            </div>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={12}>
            <Box>
              <Pagination 
              style={{
                  padding: 20,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
              }}
              count={(handleSearchPlatoon().length/10).toFixed(0)}
              onChange={(_, value) => {
                  setPlatoonsPage(value);
              }}
              />
            </Box>
          </Grid>
        </Grid>
    </>
  )
}

export default Platoons
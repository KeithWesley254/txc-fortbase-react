import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Pagination, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Soldiers = () => {
  const [searchGeneral, setSearchGenerals] = useState("");
  const [searchSoldiers, setSearchSoldiers] = useState("");
  const [allGenerals, setAllGenerals] =useState([]);
  const [allSoldiers, setAllSoldiers] = useState([]);
  const [soldiersPage, setSoldierPage] = useState(1);
  const [generalsPage, setGeneralsPage] = useState(1);

  function handleSearchGenerals(){
    return allGenerals.filter((general) => 
        general.name.toLowerCase().includes(searchGeneral)
    )
  }

  function handleSearchSoldiers(){
    return allSoldiers.filter((soldier) => 
        soldier.name.toLowerCase().includes(searchSoldiers)
    )
  }

  useEffect(() => {
    fetch(`/api/major_generals`)
    .then(r => r.json())
    .then(data => setAllGenerals(data))
  }, [])

  useEffect(() => {
    fetch(`/api/soldiers`)
    .then(r => r.json())
    .then(data => setAllSoldiers(data))
  }, [])

  const myGeneralsCards =  
  handleSearchGenerals()
  .slice((generalsPage - 1) * 10, (generalsPage - 1) * 10 + 10)
  .map((general) => {
    return(
      <Box key={general.id} sx={{mr:2, ml: 2}}>
        <Link style={{textDecoration: "none"}} to={`/generals/${general.id}`}>
          <Card sx={{ width: 200, height: 260, border: 1, p: 2 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={general?.image_url}
                alt={general?.name}
              />
              <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                  Full Name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {general?.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Box>
    )
  }) 

  const mySoldiersCards =  
  handleSearchSoldiers()
  .slice((soldiersPage - 1) * 10, (soldiersPage - 1) * 10 + 10)
  .map((soldier) => {
    return(
      <Box key={soldier.id} sx={{mr:2, ml: 2}}>
        <Link style={{textDecoration: "none"}} to={`/soldiers/${soldier.id}`}>
          <Card sx={{ width: 200, height: 260, border: 1, p: 2 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
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
          &nbsp;
          &nbsp;
        </Link>
      </Box>
    )
  }) 
    
  return (
    <>
      <Box>
        <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
            <Box sx={{ fontSize: 60, fontWeight: "bolder", fontFamily: "nunito", pl: 5}}>
              <p>
                TXC FortBase
                <br />
                The Home of All TXC Heroes
              </p>
              <p style={{fontSize: 30, fontWeight: "bold"}}>
                Generals
              </p>
            </Box>           
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={12}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <TextField 
                label="Go back to the first page for a full search..."
                variant='outlined'
                style={{ marginBottom: 20, width: "70%", borderRadius: 20 }}
                onChange={(e) => setSearchGenerals(e.target.value.toLocaleLowerCase())}
                />
              </Box>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12} sx={{textAlign: "center", pl:4, pr:4, justifyContent: "center", alignItems: "center", fontSize: 14 }}>
          <Grid item xs={12} md={12} >
            <div className='heroScroll' style={{ position: "relative", width: "100%", overflowX: "auto",}}>
              <Box sx={{ borderRadius: 20, display: "inline-flex", flexDirection: 'row'  }}>
                {myGeneralsCards}
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
              count={(handleSearchGenerals().length/10).toFixed(0)}
              onChange={(_, value) => {
                  setGeneralsPage(value);
              }}
              />
            </Box>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={12}>
              <Box sx={{pl: 5}}>
                <p style={{fontSize: 30, fontWeight: "bold", fontFamily: "nunito"}}>
                  Soldiers
                </p>
              </Box>           
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2} columns={12}>
            <Grid item xs={12} md={12}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <TextField 
                  label="Go back to the first page for a full search..."
                  variant='outlined'
                  style={{ marginBottom: 20, width: "70%", borderRadius: 20 }}
                  onChange={(e) => setSearchSoldiers(e.target.value.toLocaleLowerCase())}
                  />
                </Box>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2} columns={12} sx={{textAlign: "center", pl:4, pr:4, justifyContent: "center", alignItems: "center", fontSize: 14 }}>
            <Grid item xs={12} md={12} >
              <div className='heroScroll' style={{ position: "relative", width: "100%", overflowX: "auto",}}>
                <Box sx={{ borderRadius: 20, display: "inline-flex", flexDirection: 'row'  }}>
                  {mySoldiersCards}
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
              count={(handleSearchSoldiers().length/10).toFixed(0)}
              onChange={(_, value) => {
                  setSoldierPage(value);
              }}
              />
            </Box>
          </Grid>
        </Grid>
        <br />
      </Box>
    </>
  )
}

export default Soldiers
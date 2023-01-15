import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Pagination, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MemorialImage from '../memorial.jpeg';

const Memorial = () => {
  const [search, setSearch] = useState("");
  const [allLegends, setAllLegends] = useState([]);
  const [page, setPage] = useState(1);

  function handleSearch(){
    return allLegends.filter((legend) => 
        legend.name.toLowerCase().includes(search)
    )
  }

  useEffect(() => {
    fetch(`/api/memorials`)
    .then(r => r.json())
    .then(data => setAllLegends(data))
  }, [])

  const my_cards =  
  handleSearch()
  .slice((page - 1) * 10, (page - 1) * 10 + 48)
  .map((legend) => {
    return(
      <Box key={legend.id}>
        <Card sx={{ width: 300, height: 380, border: 3, p: 2 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={legend?.image_url}
              alt={legend?.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Full Name
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {legend?.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Army Rank
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {legend?.title}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Short Description
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {legend?.summary}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        &nbsp;
        &nbsp;
      </Box>
    )
    }) 

  return (
    <>
      <Box>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <Box sx={{ fontSize: 60, fontWeight: "bolder", fontFamily: "nunito", pl: 5}}>
                  <p>
                    TXC FortBase
                    <br />
                    Heroes Live On
                  </p>
                  <p style={{fontSize: 30, fontWeight: "bold"}}>
                    Legends
                  </p>
            </Box>           
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ml: 4, mr: 4}}>
                <div style={{ paddingTop: 30, display: "flex", justifyContent: "center" }}>
                    <Card sx={{ maxWidth: 300 }}>
                      <CardMedia
                      component="img"
                      height="200"
                      image= {MemorialImage}
                      alt= "memorial"
                      loading="lazy"
                      />
                    </Card>
                </div>
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
              onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
              />
            </Box>
            <Box>
              <Pagination 
              style={{
                  padding: 20,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
              }}
              count={(handleSearch().length/10).toFixed(0)}
              onChange={(_, value) => {
                  setPage(value);
              }}
              />
            </Box>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={12}>
            <Box sx={{ justifyContent: "center" }}>
              <div style={{ position: "relative", width: "100%"}}>
                <Box sx={{ mr: 2, ml: 2, borderRadius: 20, gap: 1, justifyContent: "center", flexWrap: "wrap", display: "inline-flex", flexDirection: 'row'  }}>
                  {my_cards}
                </Box>
              </div>
            </Box>
            <br />
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
              count={(handleSearch().length/10).toFixed(0)}
              onChange={(_, value) => {
                  setPage(value);
                  window.scroll(0, 0);
              }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Memorial
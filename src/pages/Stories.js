import { Box, Card, CardMedia, Grid, Typography, CardActionArea, FormControl, InputLabel, OutlinedInput, Avatar, Button } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { UserState } from '../UserContext';

const Stories = () => {
  const { user, userProfile } = UserState();
  const user_id = user.id;
  const full_name = userProfile?.full_name;
  const image_upload = userProfile?.image_upload;
  const [user_comment, setUserComment] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [showMore1, setShowMore1] = useState(false);
  const [comments, setComments] = useState([]);
  const [randomIndex, setRandomIndex] = useState();
  const [randomIndex2, setRandomIndex2] = useState();
  const [technologies, setTechnologies] = useState([]);
  const [technologies2, setTechnologies2] = useState([]);
  
  
  useEffect(() => {
    fetch(`/api/user_comments`)
    .then(r => r.json())
    .then(data => setComments(data))
  }, []);

  useEffect(() => {
    fetch(`/api/technologies`)
    .then(r => r.json())
    .then(data => {
      setTechnologies(data)
      setTechnologies2(data)
    })
  }, []);

  useEffect(() => {
    changeTechnology()
  }, []);

  useEffect(() => {
    changeTechnology2()
  }, []);

  function changeTechnology(){
    const randomNumber = Math.floor(Math.random() * technologies.length);
    setRandomIndex(randomNumber)
  }

  function changeTechnology2(){
    const randomNumber = Math.floor(Math.random() * technologies2.length);
    setRandomIndex2(randomNumber)
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/user_comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name,
        image_upload,
        user_comment,
        user_id
      }),
    }).then((r) => r.json()).then( data => {
      setComments([...comments, data])
    })
    setUserComment('')
  }

  function deleteComment(id){
    fetch(`/api/user_comments/${id}`,{
        method: "DELETE",
    })
    .then(r => r.json())
    .then(() => {
      const goThru = comments.filter((comment) => comment.id !== id)
          setComments(goThru)
      })
  }

  const allUserComments = comments?.map((comment) => {
    return (
      <Box key={comment.id}>
      <Grid container spacing={2} columns={6}>
          <Grid item xs={6} md={6}>
            <Box sx={{ pt: 10}}>
              <Grid container spacing={2} columns={6}>
                <Grid item xs={2} md={2}>
                  <Box sx={{display: "flex", justifyContent: "center"}}>
                      <Avatar alt={comment?.full_name} src={comment?.image_upload} />
                  </Box>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Box sx={{ml: 4, mr: 4 }}>
                    <Typography>
                      {comment?.user_comment}
                    </Typography>
                    { user.id === comment.user_id ?
                      (
                        <>
                        <Box sx={{ textAlign: "center", display: "flex", justifyContent: "end", mr: 2}}>
                          <FormControl>
                            <button style={{
                              fontSize: 14,
                              backgroundColor: "#ff0101",
                              width: 100,
                              height: 40,
                              color: "#fff",
                              borderRadius: 10,
                              cursor: "pointer",
                              border: "none"
                            }}
                            onClick={() => {
                              deleteComment(comment.id)
                            }}
                            >
                              DELETE
                            </button>
                          </FormControl>
                        </Box>
                        </>
                      ) : (
                        <>
                          <Box>
                            <p>- <i>{comment.full_name}</i></p>
                          </Box>
                        </>
                      )}
                  </Box>
                </Grid>
              </Grid>
            </Box>      
          </Grid>
        </Grid>
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
                TXC Activities
                <br />
                And Fan Messages
              </p>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} columns={6}>
              <Grid item xs={6} md={3}>
                <Box sx={{textAlign: "center"}}>
                  <Typography  sx={{fontSize: 25, fontFamily: "nunito", fontWeight: "bold"}}>
                      TXC Activities
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <br />
              <Grid container spacing={2} columns={6}>
                <Grid item xs={6} md={3}>
                  <Box sx={{ borderRadius: 20, display: "flex", justifyContent: "center"  }}>
                  <Card sx={{ width: 200, height: 150 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={technologies[randomIndex]?.image_url}
                        alt={technologies[randomIndex]?.title}
                      />
                    </CardActionArea>
                  </Card>
                  </Box>
                  <br />
                  <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={changeTechnology} variant="contained">Change Story</Button>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{mr: 4, ml: 4}}>
                    <Typography>
                      {showMore ? technologies[randomIndex]?.description : technologies[randomIndex]?.description.substring(0, 350)}
                    </Typography>
                    <Button
                    variant='contained'
                    onClick = {() => setShowMore(!showMore)}
                    >
                      {showMore ? 'Show less' : 'Show More'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={2} columns={6}>
                <Grid item xs={6} md={3}>
                  <Box sx={{ borderRadius: 20, display: "flex", justifyContent: "center"  }}>
                  <Card sx={{ width: 200, height: 150 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={technologies2[randomIndex2]?.image_url}
                        alt={technologies2[randomIndex2]?.title}
                      />
                    </CardActionArea>
                  </Card>
                  </Box>
                  <br />
                  <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={changeTechnology2} variant="contained">Change Story</Button>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{mr: 4, ml: 4}}>
                    <Typography>
                      {showMore1 ? technologies2[randomIndex2]?.description : technologies2[randomIndex2]?.description.substring(0, 350)}
                    </Typography>
                    <Button 
                    variant='contained'
                    onClick = {() => setShowMore1(!showMore1)}
                    >
                      {showMore1 ? 'Show less' : 'Show More'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} columns={6}>
              <Grid item xs={6} md={6}>
                <Box sx={{textAlign: "center"}}>
                  <Typography  sx={{fontSize: 25, fontFamily: "nunito", fontWeight: "bold"}}>
                      Fan Messages
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2} columns={6}>
              <Grid item xs={6} md={6}>
                <Box sx={{textAlign: "center", fontFamily: "nunito", border: 1, mr: 4, ml: 4}}>
                  <Typography sx={{fontWeight: "ligher"}}>
                    Write A Comment
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <FormControl sx={{ m: 1, width: "70%" }}>
                      <InputLabel htmlFor="Comment">Comment</InputLabel>
                      <OutlinedInput
                        id="user_comment"
                        multiline
                        rows={4}
                        type="text"
                        value={user_comment}
                        onChange={(e) => setUserComment(e.target.value)}
                        label="Comment"
                      />
                    </FormControl>
                    <FormControl>
                      <button style={{
                        fontSize: 14,
                        backgroundColor: "#4e60ff",
                        width: 200,
                        height: 40,
                        color: "#fff",
                        borderRadius: 10,
                        cursor: "pointer",
                        border: "none"
                      }}
                      onClick={() => {window.scrollTo({top: 1400, left: 0, behavior: 'smooth'});}}
                      >
                        Post
                      </button>
                    </FormControl>
                  </form>
                  <br />
                </Box>
                <br />
                <div style={{textAlign: "center", fontFamily: "nunito", fontWeight: "bold"}}>
                  <p><i>Scroll Down</i></p>
                </div>
                <br />
              </Grid>
              <div className='heroScroll' style={{ overflowY: "auto", maxHeight: 1500}}>
                {allUserComments}
              </div>
            </Grid>
            <br />
          </Grid>
        </Grid>
        <br />
        
      </Box>
    </>
  )
}

export default Stories
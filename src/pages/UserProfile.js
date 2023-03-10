import React, { useState } from 'react';
import {Grid, Box, CardMedia, FormControl, RadioGroup, FormControlLabel, Radio, Typography, InputLabel, OutlinedInput } from '@mui/material';
import Card from '@mui/material/Card';
import { UserState } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, userProfile, setUserProfile, logOut } = UserState();

  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name,
    gender: userProfile?.gender,
    age: userProfile?.age,
    bio: userProfile?.bio,
    interests: userProfile?.interests,
    image_upload: userProfile?.image_upload,
    favourite_military_branch: userProfile?.favourite_military_branch
  });

  const navigate = useNavigate();

  function handleUpdateUser() {
    const token = JSON.parse(localStorage.getItem("token"));

    const data = new FormData();

    Object.keys(formData).forEach(key => {
      data.append(key, formData[key])
    });

    fetch(`https://fortbase-api.onrender.com/api/one_user_profiles/${user.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "PATCH",
    body: data
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        setUserProfile(data)
        navigate('/')
        window.location.reload();
      });
    }})
  }

  function handleLogoutClick() {
    logOut();
  }

  function deleteProfile(id){
    const token = JSON.parse(localStorage.getItem("token"));

    fetch(`https://fortbase-api.onrender.com/api/users/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    })
  }

  function handleChange(e){
    setFormData({
        ...formData, [e.target.name]: e.target.value,
    });
  }

  const radios = ["male", "female", "other"]

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6} sx={{textAlign: "center"}}>

            {/* DETAILS SECTION */}

            <br />
          <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <Box sx={{xs: {ml: 5}, ml: 5, display: "flex", justifyContent: "center" }}>
                  <Card sx={{ maxWidth: 345}}>
                      <CardMedia
                        component="img"
                        height="230"
                        image={userProfile?.image_upload}
                        alt={userProfile?.full_name}
                        sx={{width: "auto"}}
                      />
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={6} md={6}>
                <Box sx={{ textAlign: "left", ml: 5}}>
                  <Typography variant="h5" component="h2">
                    Full Name
                  </Typography>
                  <Typography variant="body2" component="h2">
                    {userProfile?.full_name}
                  </Typography>
                </Box>
                <br />
                <Box sx={{ textAlign: "left", ml: 5}}>
                  <Typography variant="h5" component="h2">
                    Email Address
                  </Typography>
                  <Typography variant="body2" component="h2">
                    {user?.email}
                  </Typography>
                </Box>
               <br />
                <Box sx={{ textAlign: "left", ml: 5}}>
                  <Typography variant="h5" component="h2">
                    Gender
                  </Typography>
                  <Typography variant="body2" component="h2">
                    {userProfile?.gender}
                  </Typography>
                </Box> 
                <br />
                <Box sx={{ textAlign: "left", ml: 5}}>
                  <Typography variant="h5" component="h2">
                    Age
                  </Typography>
                  <Typography variant="body2" component="h2">
                    {userProfile?.age}
                  </Typography>
                </Box>                             
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Box sx={{ textAlign: "left", ml: 5}}>
                  <Typography variant="h5" component="h2">
                      Bio
                    </Typography>
                    <Typography variant="body2" component="h2">
                      {userProfile?.bio}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
              <Box sx={{ textAlign: "left", ml: 5}}>
                  <Typography variant="h5" component="h2">
                    Favourite Military Branch
                  </Typography>
                  <Typography variant="body2" component="h2">
                    {userProfile?.favourite_military_branch}
                  </Typography>
                </Box>         
              </Grid>
              <Grid item xs={6} md={6}>
              <Box sx={{ textAlign: "left", ml: 5}}>
                  <Typography variant="h5" component="h2">
                    Interests
                  </Typography>
                  <Typography variant="body2" component="h2">
                    {userProfile?.interests}
                  </Typography>
                </Box>      
              </Grid>
            </Grid>
          </Grid>
          <br />

          {/* POSTING SECTION */}

          <Grid item xs={12} md={6} >
            <br />
            <Box sx={{border: '1px solid black', mx: 2}}>
              <br />
            <Box sx={{ textAlign: "center"}}>
              <Grid container spacing={2} columns={6}>
                <Grid item xs={6} md={3}>
                  <br />
                  <Box sx={{xs: {ml: 5}, display: "flex", justifyContent: "center"}}>
                  <Card sx={{ maxWidth: 345}}>
                    <CardMedia
                      component="img"
                      height="230"
                      image={userProfile?.image_upload}
                      alt={userProfile?.full_name}
                      sx={{width: "auto"}}
                    />
                  </Card>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <br />
                  <Box 
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { width: '25ch' },
                    mr: 2, ml: 2
                  }}
                  noValidate
                  autoComplete="off"
                  >
                    <FormControl sx={{ mb: 2, width: "70%" }}>
                      <InputLabel>Full Name</InputLabel>
                      <OutlinedInput
                        name='full_name'
                        defaultValue={userProfile?.full_name}
                        onChange={handleChange}
                        label="Full Name"
                      />
                    </FormControl>
                    <FormControl sx={{ width: "70%" }}>
                      <InputLabel>Age</InputLabel>
                      <OutlinedInput
                        name='age'
                        defaultValue={userProfile?.age}
                        onChange={handleChange}
                        label="Age"
                      />
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <Box sx={{mr: 2, ml: 2}}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Bio</InputLabel>
                  <OutlinedInput
                    name='bio'
                    defaultValue={userProfile?.bio}
                    onChange={handleChange}
                    multiline
                    rows={5}
                    label="Bio"
                  />
                  </FormControl>
                </Box>        
              </Grid>
              <Grid item xs={6} md={6}>
                <Box sx={{ textAlign: "center"}}>

                <FormControl fullWidth sx={{ mb: 1}}>
                    <RadioGroup
                      name="gender"
                      defaultValue={userProfile?.gender}
                      onChange={(e) => { 
                        setFormData({...formData, gender: e.target.value})
                      }}
                    size="small"
                    >
                      {radios.map((radio) => {
                        return (
                          <FormControlLabel key={radio} value={radio} control={<Radio />} label={(radio).charAt(0).toUpperCase() + radio.slice(1)} />
                        )
                      })}
                      
                    </RadioGroup>
                  </FormControl>

                </Box>        
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <Box sx={{mr: 2, ml: 2}}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel>Interests</InputLabel>
                    <OutlinedInput
                      name='interests'
                      defaultValue={userProfile?.interests}
                      onChange={handleChange}
                      label="Interests"
                    />
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={6} md={6}>
                <Box sx={{ textAlign: "center", mr: 2, ml: 2}}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel>Image Upload</InputLabel>
                    <OutlinedInput
                      name='image_upload'
                      defaultValue={userProfile?.image_upload}
                      onChange={handleChange}
                      label="Image Upload"
                    />
                  </FormControl>
                </Box>        
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <Box sx={{mr: 2, ml: 2}}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel>Favourite Military Branch</InputLabel>
                    <OutlinedInput
                      name='favourite_military_branch'
                      defaultValue={userProfile?.favourite_military_branch}
                      onChange={handleChange}
                      label="Favourite Military Branch"
                    />
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={6} md={6}>
                <Box>
                  <Typography color="red">
                    WARNING!
                  </Typography>
                  <Typography color="red">
                    Deleting your Profile will delete your Account from our database!
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <Box sx={{mr: 2, ml: 2, textAlign: "center"}}>
                <FormControl>
                  <button style={{
                    fontSize: 14,
                    width: 100,
                    backgroundColor: "#4e60ff",
                    height: 40,
                    color: "#fff",
                    borderRadius: 10,
                    border: "none"
                  }}
                  onClick={() => {
                    handleUpdateUser();
                  }}
                  >
                    UPDATE
                  </button>
                </FormControl>
                </Box>
              </Grid>
              <Grid item xs={6} md={6}>
                <Box sx={{ mr: 2, ml: 2, textAlign: "center"}}>
                  <FormControl>
                    <button style={{
                      fontSize: 14,
                      backgroundColor: "#ff0101",
                      height: 40,
                      width: 100,
                      border: "none",
                      borderRadius: 10,
                      color: "#fff",
                    }}
                    onClick={() => {
                      deleteProfile(user.id)
                      handleLogoutClick()         
                    }}
                    >
                      DELETE
                    </button>
                  </FormControl>
                </Box>        
              </Grid>
            </Grid>
            <br />
            </Box>
          </Grid>
        </Grid>
        <br />
      </Box>
    </>
  )
}

export default UserProfile;
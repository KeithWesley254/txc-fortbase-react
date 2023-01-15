import React from 'react'
import { Container } from "@mui/system";
import { Box, Grid, Link, Typography } from '@mui/material';
import image from '../logo.jpg';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Box 
        px={{ xs: 3, sm:10}} 
        py={{ xs: 2, sm:6}} 
        bgcolor="text.secondary" 
        color="#fff"
        >
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Navigate</Box>
                        &nbsp;
                        <Box>
                            <Link onClick={() => navigate(`/soldiers`)} style={{cursor: 'pointer'}} color="inherit" underline='none'>Soldiers</Link>
                        </Box>
                        &nbsp;
                        <Box>
                            <Link onClick={() => navigate(`/stories`)} style={{cursor: 'pointer'}} color="inherit" underline='none'>Stories</Link>
                        </Box>
                        &nbsp;
                        <Box>
                            <Link onClick={() => navigate(`/technologies`)} style={{cursor: 'pointer'}} color="inherit" underline='none'>Technology</Link>
                        </Box>
                        &nbsp;
                        <Box>
                            <Link onClick={() => navigate(`/memorial`)} style={{cursor: 'pointer'}} color="inherit" underline='none'>Memorial</Link>
                        </Box>
                        &nbsp;
                        <Box>
                            <Link onClick={() => navigate(`/about-us`)} style={{cursor: 'pointer'}} color="inherit" underline='none'>About Us</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Socials</Box>
                        &nbsp;
                        <Box>
                            <Link href='https://www.instagram.com/keith_wesley_/' target="_blank" color="inherit" underline='none'><i className="fa-brands fa-instagram"></i> Instagram</Link>
                        </Box>
                        &nbsp;
                        <Box>
                            <Link href='https://www.youtube.com/channel/UCZ-MKtsBjTD4glktrbEYFXw' target="_blank" color="inherit" underline='none'><i className="fa-brands fa-youtube"></i> Youtube</Link>
                        </Box>
                        &nbsp;
                        <Box>
                            <Link href='https://twitter.com/Keith_wesley_' color="inherit" target="_blank" underline='none'><i className="fa-brands fa-twitter"></i> Twitter</Link>
                        </Box>
                        &nbsp;
                        <Box>
                            <Link href='https://www.linkedin.com/in/keith-wesley-707802215/' color="inherit" target="_blank" underline='none'><i className="fa-brands fa-linkedin"></i> LinkedIn</Link>
                        </Box>
                        &nbsp;
                        <Box>
                            <Link href='https://github.com/KeithWesley254' color="inherit" target="_blank" underline='none'><i className="fa-brands fa-github"></i> Github</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box>
                        <Typography
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'nunito',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#fff',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        }}
                        onClick={() => navigate(`/homepage`)}
                        >
                        <img src={image} alt="logo" style={{maxHeight: "40px", maxWidth: "60px", cursor: "pointer"}}/>
                        &nbsp;
                        &nbsp;
                            TXC FortBase
                        </Typography>
                        </Box>
                        <br />
                        <Box>
                            <Typography>
                                TXC FortBase is a fandom page for people who want to connect
                                with the heroes of the nation. You can get information about the
                                latest technologies in the TXC military and public researches.
                                Come and Connect
                            </Typography>
                            &nbsp;
                            <Typography>
                            © 2022 TXC FortBase. All Rights Reserved.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </div>
  )
}

export default Footer;
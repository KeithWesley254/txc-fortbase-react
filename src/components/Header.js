import * as React from 'react';
import {AppBar, Box, Toolbar, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../UserContext';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, userProfile, logOut } = UserState();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleLogoutClick() {
    logOut();
  }
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: "#fff"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <div className='headerLogo' onClick={() => navigate('/homepage')}>
                <p style={{fontWeight: "bolder", fontSize: 14, color: 'black', cursor: "pointer"}}>
                  TXC
                  <br />
                  <span style={{ color: "#4e60ff", cursor: "pointer" }}>FortBase</span>
                </p>
            </div>

          <Box sx={{ flexGrow: 1, alignItems: "center", display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{color: 'black'}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem onClick={() => {
                  handleCloseNavMenu()
                  navigate('/soldiers')
                  }}>
                  <Typography textAlign="center">Soldiers</Typography>
                </MenuItem>
                <MenuItem  onClick={() => {
                  handleCloseNavMenu()
                  navigate('/stories')
                  }}>
                  <Typography textAlign="center">Stories</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  handleCloseNavMenu()
                  navigate('/technologies')
                  }}>
                  <Typography textAlign="center">Technology</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  handleCloseNavMenu()
                  navigate('/memorial')
                  }}>
                  <Typography textAlign="center">Memorial</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  handleCloseNavMenu()
                  navigate('/about-us')
                  }}>
                  <Typography textAlign="center">About Us</Typography>
                </MenuItem>
                
            </Menu>
          </Box>
          <MilitaryTechIcon sx={{ display: { xs: 'flex', md: 'none' }, color: "#4e60ff", mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/homepage"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'nunito',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
              flexWrap: "wrap"
            }}
          >
            TXC 
            <br />
            <span style={{ color: "#4e60ff" }}>FortBase</span>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: "center" } }}>
            
              <Button
                onClick={() => {
                  handleCloseNavMenu()
                  navigate('/soldiers')
                  }}
                sx={{ my: 2, textTransform: "none", display: 'block', fontSize: 14, fontWeight: "bolder", color: 'black' }}
              >
                Soldiers
              </Button>
              &nbsp;
              &nbsp;
              &nbsp;
              <Button
                onClick={() => {
                  handleCloseNavMenu()
                  navigate('/stories')
                  }}
                sx={{ my: 2, textTransform: "none", display: 'block', fontSize: 14, fontWeight: "bolder", color: 'black' }}
              >
                Stories
              </Button>
              &nbsp;
              &nbsp;
              &nbsp;
              <Button
                onClick={() => {
                  handleCloseNavMenu()
                  navigate('/technologies')
                  }}
                sx={{ my: 2, textTransform: "none", display: 'block', fontSize: 14, fontWeight: "bolder", color: 'black' }}
              >
                Technology
              </Button>
              &nbsp;
              &nbsp;
              &nbsp;
              <Button
                onClick={() => {
                  handleCloseNavMenu()
                  navigate('/memorial')
                  }}
                sx={{ my: 2, textTransform: "none", display: 'block', fontSize: 14, fontWeight: "bolder", color: 'black' }}
              >
                Memorial
              </Button>
              &nbsp;
              &nbsp;
              &nbsp;
              <Button
                onClick={() => {
                  handleCloseNavMenu()
                  navigate('/about-us')
                  }}
                sx={{ my: 2, textTransform: "none", display: 'block', fontSize: 14, fontWeight: "bolder", color: 'black' }}
              >
                About Us
              </Button>
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: {md: 15}}}>
                <Avatar alt={userProfile?.full_name} src={userProfile?.image_upload} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={() => navigate(`/user-profiles/${user?.id}`)}>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick = {handleLogoutClick}>Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;

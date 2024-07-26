import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, useMediaQuery, Avatar, IconButton } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import LeftSiderUp from '../LeftSideHomeComp/LeftSiderUp'; // Import the LeftSiderUp component
import MenuIcon from '@mui/icons-material/Menu';

const TITLE = 'Authenticator';

const useStyle = {
  backgroundColor: '#09090b',
  boxShadow: 'none',
};

const NavBar = () => {
  const isMobile = useMediaQuery('(max-width:640px)');
  const [userInitial, setUserInitial] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
      try {
        const decodedToken = jwtDecode(storedUser);
        if (decodedToken && decodedToken.name) {
          setUserInitial(decodedToken.name.charAt(0).toUpperCase());
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky' sx={useStyle}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant='h5'
            sx={{ letterSpacing: '2px' }}
            className='select-none'
          >
            {TITLE}
          </Typography>
          <Box className='flex space-x-1'>
            {userInitial && (
              <Avatar className='cursor-pointer'>
                {userInitial}
              </Avatar>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {isMobile && (
        <LeftSiderUp 
          open={drawerOpen} 
          onClose={handleDrawerToggle}
        />
      )}
    </Box>
  );
};

export default NavBar;
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { GoogleLogin } from 'react-google-login';


const NavBar = () => {
  const clientId = '68533054164-cqvp64evr49fig4rlj05sdrqso1h9jec.apps.googleusercontent.com';

  const onSuccess = (response) => {
    console.log('Login Success: currentUser:', response.profileObj);
  };

  const onFailure = (response) => {
    console.log('Login Failed:', response);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          POKEMON FIGHT   
        </Typography>
        <Button color="inherit" component={Link} to="/">Ranking</Button>
        <Button color="inherit" component={Link} to="/search">Search Pokemon</Button>
        <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          style={{ marginLeft: 'auto' }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
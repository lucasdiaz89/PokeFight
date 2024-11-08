import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          POKEMON FIGHT   
        </Typography>
        <Button color="inherit" component={Link} to="/">Ranking</Button>
        <Button color="inherit" component={Link} to="/search">Search Pokemon</Button>
        <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
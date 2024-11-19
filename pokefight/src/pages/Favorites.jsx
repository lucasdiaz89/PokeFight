import React from 'react';
import { useSelector } from 'react-redux';
import { Grid2 } from '@mui/material';
import RenderPokemonCard from '../components/RenderPokemonCard'; 

const Favorites = () => {
  const favorites = useSelector(state => state.favorites.favorites);

  return (
    <Grid2 container spacing={2} marginTop={2}>
      {favorites.map((pokemon, index) => (
        <Grid2 item key={pokemon.id} xs={12} sm={6} md={4}>
          <RenderPokemonCard pokemon={pokemon} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default Favorites;
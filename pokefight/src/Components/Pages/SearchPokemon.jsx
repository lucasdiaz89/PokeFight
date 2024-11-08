import React, { useState } from 'react';
import { Box, Grid2, TextField, Button, CircularProgress } from '@mui/material';
import usePokemonData from '../../CustomHook/usePokemonData';
import RenderPokemonCard from '../RenderPokemonCard';




const SearchPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(true);
  
  const { data: pokemonData, loading, error } = usePokemonData(query, triggerSearch);

  const handleInputChange = (event) => {
    setInputValue(event.target.value); 
  };

  const handleSearch = () => {
    setQuery(inputValue);  
    setTriggerSearch(false);
    if (inputValue === '') {
      setQuery(null);
      setTriggerSearch(true);
    }
  };


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Grid2 container spacing={2} justifyContent="center">
        <Grid2 item xs={12} sm={8} md={6}>
        <TextField
            fullWidth
            label="Search Pokémon"
            variant="outlined"
            value={inputValue} 
            onChange={handleInputChange}  
            placeholder="Enter name or ID"
          />
        </Grid2>
        <Grid2 item>
          <Button variant="contained" onClick={handleSearch}>Buscar</Button>
        </Grid2>
      </Grid2>
      {Array.isArray(pokemonData) ? (
        <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
          {pokemonData.map((pokemon, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={index}>
              <RenderPokemonCard pokemon={pokemon} />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Grid2 container spacing={2} marginTop={2} justifyContent="center">
          <Grid2 item xs={12} sm={6} md={4}>
            {pokemonData && <RenderPokemonCard pokemon={pokemonData} />}
          </Grid2>
        </Grid2>
      )}
    </Box>
  );
};

export default SearchPage;
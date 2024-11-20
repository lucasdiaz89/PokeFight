import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Grid2 } from '@mui/material';
import usePokemonData from '../customshook/usePokemonData';
import usePokemonSearch from '../customshook/usePokemonSearch';
import RenderPokemonCard from '../components/RenderPokemonCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
const SearchPokemon= () => {
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState('');
    const random = Math.floor(Math.random() * 131);
    const [currentPage, setCurrentPage] = useState(random);
    const [isLoading, setIsLoading] = useState(true);

    const shouldUseSearch = query !== '';

    const { data: pokemonData, loading, error } = usePokemonData(currentPage * 10);

    const { data: pokemonDataSearch, loading: loadingSearch, error: errorSearch } = usePokemonSearch(query, !shouldUseSearch);

    useEffect(() => {
        if (!loading && !loadingSearch) {
            setIsLoading(false);
        }
    }, [loading, loadingSearch]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearch = () => {
        setQuery(inputValue);
    };

    const handleNext = () => {
        if (currentPage < 130) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (error || errorSearch) {
        return <Error />;
    }

    if (isLoading) {
        return <Loading />;
    }

    const dataToShow = shouldUseSearch ? pokemonDataSearch : pokemonData;

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
            {Array.isArray(dataToShow) ? (
                <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
                    {dataToShow.map((pokemon, index) => (
                        <Grid2 item xs={12} sm={6} md={4} key={index}>
                            <RenderPokemonCard pokemon={pokemon} />
                        </Grid2>
                    ))}
                </Grid2>
            ) : (
                <Grid2 container spacing={2} marginTop={2} justifyContent="center">
                    <Grid2 item xs={12} sm={6} md={4}>
                        {dataToShow && <RenderPokemonCard pokemon={dataToShow} />}
                    </Grid2>
                </Grid2>
            )}
            <Button onClick={handlePrev} disabled={currentPage === 0 || shouldUseSearch}>Previous</Button>
            <Button onClick={handleNext} disabled={currentPage === 130 || shouldUseSearch}>Next</Button>
        </Box>
    );
};

export default SearchPokemon;
import React from 'react';
import { Box, Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import PokemonImage from "./PokemonImage";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import { addToFavorites, removeFromFavorites } from '../redux/actions/favoriteActions';
import { isFavorite } from '../redux/selectors/favoriteSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { setRanking } from '../redux/actions/rankingActions';
import { useNavigate } from 'react-router-dom';


const RenderPokemonCard = ({ pokemon }) => {
  const ranking = useSelector(state => state.ranking.ranking);

  const dispatch = useDispatch();
  const isPokemonFavorite = useSelector(state => isFavorite(state, pokemon.id));
  const navigate = useNavigate();

  const handleClickFavorite = () => {
    if (isPokemonFavorite) {
      dispatch(removeFromFavorites(pokemon));
    } else {
      dispatch(addToFavorites(pokemon));
    }
  };

  const handleBattle = () => {
    const index = ranking.findIndex(p => p.id === pokemon.id);

    if (index === -1) {
      const additionalPokemons =[{
        id: pokemon.id,
        name: pokemon.name,
        type: pokemon.types[0].type.name,
        points: 0,
        image: pokemon.sprites.other.dream_world.front_default
      }];
      dispatch(setRanking([...ranking, ...additionalPokemons]));
      
      
      const opponent = ranking[ranking.length-1];
      navigate(`/battle/${pokemon.id}/${opponent.id}`);
    } else if (index === 0) {
      alert("THIS POKEMON CAN´T FIGHT");
    } else {
      const opponent = ranking[index - 1];
      navigate(`/battle/${pokemon.id}/${opponent.id}`);
    }
  };

  if (!pokemon || !pokemon.sprites || !pokemon.sprites.other || !pokemon.sprites.other.dream_world) {
    return <Typography>Don´t search information</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 360, marginTop:2 }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 250
      }}>
        <PokemonImage url={pokemon.sprites.other.dream_world.front_default} size="large" />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name.toUpperCase()} - {pokemon.types[0].type.name.toUpperCase()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleClickFavorite}>
          {isPokemonFavorite ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
        </Button>
        <Button onClick={handleBattle}><SportsKabaddiIcon /></Button>
      </CardActions>
    </Card>
  );
};

export default RenderPokemonCard;
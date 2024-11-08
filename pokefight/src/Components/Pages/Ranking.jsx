import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRanking, battlePokemons } from '../../Redux/actions/rankingActions';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import usePokemonData from '../../CustomHook/usePokemonData';
import PokemonImage from '../PokemonImage';
import { useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
const Ranking = () => {

  const dispatch = useDispatch();
  const ranking = useSelector(state => state.ranking.ranking);
  const navigate = useNavigate();
  const renderPosition = (position) => {    
    switch (position) {
      case 0:
        return (          
            <EmojiEventsIcon fontSize="large" sx={{ color:'#ffd700' }} />
        );
      case 1:
        return (
          <EmojiEventsIcon fontSize="large" sx={{ color:'#c4c4c4' }} />
        );
      case 2:
        return (
          <EmojiEventsIcon fontSize="large" sx={{ color:'#ce8946' }} /> 
        );
      default:
        return "";
    }
  };
  const { data: randomPokemonData, loading, error } = usePokemonData(null, true);

  useEffect(() => {
    if (!loading && !error && randomPokemonData && ranking.length < 10) {
      const needed = 10 - ranking.length;
      const additionalPokemons = randomPokemonData.slice(0, needed).map(pokemon => ({
        id: pokemon.id,
        name: pokemon.name,
        type: pokemon.types[0].type.name,
        points: 0,
        image: pokemon.sprites.other.dream_world.front_default
      }));
      dispatch(setRanking([...ranking, ...additionalPokemons]));
    }
  }, [dispatch, ranking, randomPokemonData, loading, error]);

  const handleBattle = (currentId, previousId) => {
    dispatch(battlePokemons(currentId, previousId));
    navigate(`/battle/${currentId}/${previousId}`);
  };


  if (loading) return <div>Loading ranking...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>RANK</TableCell>
          <TableCell>NAME</TableCell>
          <TableCell>PICTURE</TableCell>
          <TableCell>TYPE</TableCell>
          <TableCell>POINTS</TableCell>
          <TableCell>ACTIONS</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {ranking.map((pokemon, index) => (
          <TableRow key={pokemon.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{pokemon.name.toUpperCase()}</TableCell>
            <TableCell><PokemonImage url={pokemon.image} /></TableCell>
            <TableCell>{pokemon.type.toUpperCase()}</TableCell>
            <TableCell>{pokemon.points}</TableCell>
            <TableCell>
              {index !== 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBattle(pokemon.id, ranking[index - 1].id)}
                >
                  Battle
                </Button>
              )}
            </TableCell>
            <TableCell>{renderPosition(index)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Ranking;
import React, { useEffect, useState } from 'react';
import {  Button, Grid2, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateRanking } from '../redux/actions/rankingActions';
import { useParams } from 'react-router-dom';
import usePokemonData from '../customshook/usePokemonSearch';
import RenderPokemonCard from '../components/RenderPokemonCard';
import '../styles/Battle.css';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Battle = () => {
  const { pokemon1, pokemon2 } = useParams();
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); 
  const { data: pokemonData1, loading: loading1, error: error1 } = usePokemonData(pokemon1, false);
  const { data: pokemonData2, loading: loading2, error: error2 } = usePokemonData(pokemon2, false);

  const handleFight = async () => {
    if (!pokemonData1 || !pokemonData2) return;

    const battleResults = generateResults();
    setResults(battleResults);

    const wins = { pokemon1: 0, pokemon2: 0 };
    battleResults.forEach(result => {
      const [score1, score2] = result.split('-').map(Number);
      if (score1 > score2) {
        wins.pokemon1++;
      } else {
        wins.pokemon2++;
      }
    });

    const winner = wins.pokemon1 > wins.pokemon2 ? pokemonData1 : pokemonData2;
    alert(`THE WINNER IS: ${winner.name.toUpperCase()}`);

    dispatch(updateRanking({ ...winner, points: winner.points + 1 }));
  };

  const generateResults = () => {
    const results = [];
    for (let i = 0; i < 3; i++) {
      const score1 = Math.floor(Math.random() * 7);
      let score2;
      if (score1 === 6) {
        score2 = Math.floor(Math.random() * 5);
      } else if (score1 === 5) {
        score2 = 7;
      } else {
        score2 = 6;
      }
      results.push(`${score1}-${score2}`);
    }
    return results;
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 500); 

    return () => clearTimeout(timeoutId); 
  }, [loading1,loading2]);
  
  if (isLoading) return <div><Loading/></div>;
  if (error1 || error2 || !pokemonData1 || !pokemonData2) return <Error />;;
  

  return (
    <div>
      <div className="Battle-bodyCars">
        <Grid2 container spacing={0.5}>
          <Grid2 item xs={6}>
            <RenderPokemonCard pokemon={pokemonData1} />
          </Grid2>
          <Grid2 item xs={6}>
            <RenderPokemonCard pokemon={pokemonData2} />
          </Grid2>
        </Grid2>
      </div>

      <div className='Battle-bodybox'>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {results.map((result, index) => (
            <Box key={index} sx={{ display: 'flex', width: '30%' }}>
              <Box sx={{ height: 100, bgcolor: 'primary.main', flex: 1, margin: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {result}
              </Box>
            </Box>
          ))}
        </Box>
      </div>
      <div className='Battle-bodyBtn'>
        <Button variant="contained" onClick={handleFight} sx={{ mt: 2 }}>
          FIGHT
        </Button>
      </div>


    </div>
  );
};

export default Battle;
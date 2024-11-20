import { useState, useEffect } from 'react';
import axios from 'axios';

const usePokemonData = (offset, limit = 10) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon?';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}offset=${offset}&limit=${limit}`);
        const pokemonUrls = response.data.results.map(result => result.url);
        const pokemonData = await Promise.all(pokemonUrls.map(url => axios.get(url)));
        setData(pokemonData.map(res => res.data));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (offset >= 0) {
      fetchData();
    }
  }, [offset, limit]);
  return { data, loading, error };
};

export default usePokemonData;
import { useState, useEffect } from 'react';
import axios from 'axios';

const usePokemonData = (idOrName, isRandomList = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url1 = "https://pokeapi.co/api/v2/pokemon/";
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response; 
        if (isRandomList) {
          const randomIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * 1024) + 1);
          
          const promises = randomIds.map(id => axios.get(`${url1}${id}`));
          const results = await Promise.all(promises);
          setData(results.map(res => res.data));
        } else {
          response = await axios.get(`${url1}${idOrName}`);
        
          setData(response.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (url1) {
      fetchData();
    }
  }, [url1, idOrName, isRandomList]); 

  return { data, loading, error };
};

export default usePokemonData;
export const setRanking = (ranking) => ({
    type: 'SET_RANKING',
    payload: ranking
  });
  export const updateRanking = (winner, loser) => ({
    type: 'UPDATE_RANKING',
    payload: { winner, loser }
  });
  export const battlePokemons = (currentPokemon, previousPokemon) => ({
    type: 'BATTLE_POKEMONS',
    payload: { currentPokemon, previousPokemon }
  });
  export function addPokemonToRanking(pokemon) {
    return {
      type: 'ADD_POKEMON_TO_RANKING',
      payload: pokemon
    };
  }
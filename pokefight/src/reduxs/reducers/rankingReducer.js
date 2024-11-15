const initialState = {
  ranking: [],
  battleInfo: null
};

const rankingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RANKING':
      
      return {
        ...state,
        ranking: action.payload.sort((a, b) => b.points - a.points)
      };

    case 'UPDATE_RANKING':
      const { winner } = action.payload;
      const rankingIndex = state.ranking.findIndex(p => p.id === winner.id);

      let newRanking = [...state.ranking];

      if (rankingIndex !== -1) {
        newRanking[rankingIndex] = {
          ...newRanking[rankingIndex],
          points: newRanking[rankingIndex].points + 1
        };
      } else {
        newRanking.push({ ...winner, points: 1 });
      }

      newRanking.sort((a, b) => b.points - a.points);

      return {
        ...state,
        ranking: newRanking
      };

    case 'BATTLE_POKEMONS':
      const { currentPokemon, previousPokemon } = action.payload;
      let updatedRanking = [...state.ranking];

      const addOrUpdatePokemon = (pokemon) => {
        if (!pokemon || !pokemon.id) {
          return;
        }
        const index = updatedRanking.findIndex(p => p.id === pokemon.id);
        if (index === -1) {
          updatedRanking.push({ ...pokemon, points: 0 });
        }
      };

      addOrUpdatePokemon(currentPokemon);
      addOrUpdatePokemon(previousPokemon);

      updatedRanking.sort((a, b) => b.points - a.points);

      return {
        ...state,
        ranking: updatedRanking
      };

    default:
      return state;
  }
};

export default rankingReducer;
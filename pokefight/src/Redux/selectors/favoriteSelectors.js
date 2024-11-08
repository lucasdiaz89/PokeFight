
export const isFavorite = (state, pokemonId) => {
    return state.favorites.favorites.some(pokemon => pokemon.id === pokemonId);
};

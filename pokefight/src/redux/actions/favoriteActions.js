export const addToFavorites = (pokemon) => ({
    type: 'ADD_TO_FAVORITES',
    payload: pokemon
  });
  
  export const removeFromFavorites = (pokemon) => ({
    type: 'REMOVE_FROM_FAVORITES',
    payload: pokemon
  });

export const addToFavorites = (recipe) => {
    return {
      type: 'ADD_TO_FAVORITES',
      payload: recipe,
    };
  };
  
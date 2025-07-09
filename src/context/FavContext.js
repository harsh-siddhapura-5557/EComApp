import React, { createContext, useReducer } from 'react';

const FavCtx = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return state.find(p => p.id === action.payload.id)
        ? state
        : [...state, action.payload];
    case 'REMOVE':
      return state.filter(p => p.id !== action.payload);
    default:
      return state;
  }
};

export const FavProvider = ({ children }) => {
  const [favourites, dispatch] = useReducer(reducer, []);
  return (
    <FavCtx.Provider value={{ favourites, dispatch }}>
      {children}
    </FavCtx.Provider>
  );
};

export default FavCtx;

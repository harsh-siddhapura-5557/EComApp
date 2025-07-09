import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartCtx = createContext();

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD': {
      const next = { ...state };
      if (next[payload.id]) next[payload.id].quantity += 1;
      else next[payload.id] = { ...payload, quantity: 1 };
      return next;
    }

    case 'INC': {
      const next = { ...state };
      if (next[payload]) next[payload].quantity += 1;
      return next;
    }
    case 'DEC': {
      const next = { ...state };
      if (next[payload] && next[payload].quantity > 1) {
        next[payload].quantity -= 1;
      }
      return next;
    }

    case 'DEL': {
      const next = { ...state };
      delete next[payload];
      return next;
    }
    case 'SET':
      return payload;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('cart');
      if (saved) dispatch({ type: 'SET', payload: JSON.parse(saved) });
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartCtx.Provider value={{ cart, dispatch }}>{children}</CartCtx.Provider>
  );
};

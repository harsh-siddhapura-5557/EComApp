import React from 'react';
import HomeStack from './src/navigation';
import { CartProvider } from './src/context/CartContext';
import { FavProvider } from './src/context/FavContext';

export default () => (
    <CartProvider>
    <FavProvider>
    <HomeStack />
    </FavProvider>
    </CartProvider>
);
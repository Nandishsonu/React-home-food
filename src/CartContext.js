import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(Array(10).fill(0)); // 10 items

  const increaseQty = idx => {
    setCart(prev => prev.map((q, i) => i === idx ? q + 1 : q));
  };
  const decreaseQty = idx => {
    setCart(prev => prev.map((q, i) => i === idx && q > 0 ? q - 1 : q));
  };
  const resetCart = () => setCart(Array(10).fill(0));

  return (
    <CartContext.Provider value={{ cart, setCart, increaseQty, decreaseQty, resetCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 
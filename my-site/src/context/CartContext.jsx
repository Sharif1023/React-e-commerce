import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const exists = cartItems.find(item => item.id === product.id);
    if (exists) {
      setCartItems(cartItems.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, qty) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

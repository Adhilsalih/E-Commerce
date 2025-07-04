// src/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Cart Context
export const CartContext = createContext();

// Create the Cart Provider component
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available, otherwise an empty array
  const [cart, setCart] = useState(() => {
    try {
      const localCart = localStorage.getItem('cart');
      return localCart ? JSON.parse(localCart) : [];
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  // --- ADD THESE FUNCTIONS HERE ---
  const addToCart = (item) => {
    setCart((prevCart) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem._id === item._id);

      if (existingItemIndex > -1) {
        // If it exists, increment the quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        // If it doesn't exist, add it with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      return newCart.filter(item => item.quantity > 0); // Remove if quantity drops to 0
    });
  };

  const clearCart = () => {
    setCart([]);
  };
  // --- END OF FUNCTIONS TO ADD ---

  // Calculate total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart, // Now addToCart is defined!
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};